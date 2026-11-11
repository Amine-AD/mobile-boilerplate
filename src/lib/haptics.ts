import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { useSettingsStore } from '@/stores/settings-store';

/** Vibration feedback that respects the user's "Vibration" setting. */
function enabled() {
  return Platform.OS !== 'web' && useSettingsStore.getState().hapticsEnabled;
}

export const haptics = {
  tap: () => enabled() && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  press: () => enabled() && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  success: () => enabled() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () => enabled() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () => enabled() && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  selection: () => enabled() && Haptics.selectionAsync(),
};
