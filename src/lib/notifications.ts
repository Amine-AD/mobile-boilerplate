import * as Notifications from 'expo-notifications';
import { AndroidImportance } from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * Local notifications (reminders). Remote/push notifications need extra setup:
 * https://docs.expo.dev/push-notifications/push-notifications-setup/
 */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DEFAULT_CHANNEL = 'default';

/** Ask permission only when the user does something that needs it (e.g. turns on a reminder). */
export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL, {
      name: 'Reminders',
      importance: AndroidImportance.DEFAULT,
    });
  }
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

/** Daily reminder at hour:minute (local time). Returns the id, used to cancel it. */
export async function scheduleDailyReminder(title: string, body: string, hour: number, minute: number) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: DEFAULT_CHANNEL,
    },
  });
}

export function cancelReminder(id: string) {
  return Notifications.cancelScheduledNotificationAsync(id);
}
