import Ionicons from '@expo/vector-icons/Ionicons';
import * as Application from 'expo-application';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ListRow, ListSection } from '@/components/ui/list-row';
import { Screen } from '@/components/ui/screen';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { AppConfig } from '@/config/app-config';
import { useTheme } from '@/hooks/use-theme';
import { haptics } from '@/lib/haptics';
import { purchasesEnabled, restorePurchases, showPaywall } from '@/lib/purchases';
import { openStorePage } from '@/lib/review';
import { useIsPro } from '@/stores/pro-store';
import { useSettingsStore, type ThemePreference } from '@/stores/settings-store';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isPro = useIsPro();
  const { themePreference, setThemePreference, hapticsEnabled, setHapticsEnabled } = useSettingsStore();

  const themes: { value: ThemePreference; label: string }[] = [
    { value: 'system', label: t('settings.themeSystem') },
    { value: 'light', label: t('settings.themeLight') },
    { value: 'dark', label: t('settings.themeDark') },
  ];

  const onRestore = async () => {
    const restored = await restorePurchases();
    Alert.alert(restored ? t('settings.restored') : t('settings.nothingToRestore'));
  };

  return (
    <Screen>
      {purchasesEnabled && !isPro ? (
        <ListSection>
          <ListRow title={t('common.upgrade')} icon="star" onPress={showPaywall} />
        </ListSection>
      ) : null}

      <ListSection title={t('settings.appearance')}>
        {themes.map(({ value, label }) => (
          <ListRow
            key={value}
            title={label}
            onPress={() => {
              haptics.selection();
              setThemePreference(value);
            }}
            right={
              themePreference === value ? (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              ) : (
                <></>
              )
            }
          />
        ))}
        <ListRow
          title={t('settings.haptics')}
          right={<Switch checked={hapticsEnabled} onCheckedChange={setHapticsEnabled} />}
        />
      </ListSection>

      {purchasesEnabled ? (
        <ListSection title={t('settings.purchases')}>
          <ListRow title={t('settings.restore')} icon="refresh" onPress={onRestore} />
        </ListSection>
      ) : null}

      <ListSection title={t('settings.support')}>
        <ListRow
          title={t('settings.contact')}
          icon="mail-outline"
          onPress={() => Linking.openURL(`mailto:${AppConfig.supportEmail}?subject=${AppConfig.name}`)}
        />
        <ListRow title={t('settings.rate')} icon="star-outline" onPress={openStorePage} />
        <ListRow
          title={t('settings.privacy')}
          icon="shield-checkmark-outline"
          onPress={() => WebBrowser.openBrowserAsync(AppConfig.privacyPolicyUrl)}
        />
        <ListRow
          title={t('settings.terms')}
          icon="document-text-outline"
          onPress={() => WebBrowser.openBrowserAsync(AppConfig.termsUrl)}
        />
      </ListSection>

      <Text variant="muted" className="text-center">
        {t('settings.version', {
          version: `${Application.nativeApplicationVersion ?? '1.0.0'} (${Application.nativeBuildVersion ?? '1'})`,
        })}
      </Text>
    </Screen>
  );
}
