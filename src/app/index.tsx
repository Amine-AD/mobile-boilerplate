import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';
import { showPaywall } from '@/lib/purchases';
import { useIsPro } from '@/stores/pro-store';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isPro = useIsPro();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/settings" asChild>
              <Pressable accessibilityLabel={t('settings.title')} hitSlop={12}>
                <Ionicons name="settings-outline" size={22} color={colors.foreground} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Text variant="h3">{t('home.subtitle')}</Text>
      <Text variant="muted">{isPro ? t('home.proActive') : t('home.freePlan')}</Text>
      {!isPro ? (
        <Button size="lg" onPress={showPaywall}>
          <Text>{t('common.upgrade')}</Text>
        </Button>
      ) : null}
    </Screen>
  );
}
