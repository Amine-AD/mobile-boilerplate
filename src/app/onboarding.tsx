import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { track } from '@/lib/analytics';
import { haptics } from '@/lib/haptics';
import { useSettingsStore } from '@/stores/settings-store';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding);

  return (
    <Screen scroll={false} edges={['top', 'bottom']}>
      <View className="flex-1 justify-center gap-2">
        <Text variant="h1" className="text-left">
          {t('onboarding.title')}
        </Text>
        <Text variant="lead">{t('onboarding.subtitle')}</Text>
      </View>
      <Button
        size="lg"
        onPress={() => {
          haptics.success();
          track('onboarding_completed');
          completeOnboarding();
        }}>
        <Text>{t('onboarding.start')}</Text>
      </Button>
    </Screen>
  );
}
