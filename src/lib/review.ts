import * as StoreReview from 'expo-store-review';
import { Linking } from 'react-native';

import { AppConfig } from '@/config/app-config';
import { useSettingsStore } from '@/stores/settings-store';

/**
 * Call after something good happens (task finished, goal reached).
 * After N happy moments it asks once for a store review — the best-timed ask gets the best ratings.
 */
export async function recordHappyMoment() {
  const { addHappyMoment, hasRequestedReview, markReviewRequested } = useSettingsStore.getState();
  const count = addHappyMoment();
  if (hasRequestedReview || count < AppConfig.reviewPromptAfterHappyMoments) return;
  if (await StoreReview.isAvailableAsync()) {
    markReviewRequested();
    await StoreReview.requestReview();
  }
}

/** For a "Rate the app" button in settings: opens the store page. */
export async function openStorePage() {
  const url = StoreReview.storeUrl();
  if (url) await Linking.openURL(url);
  else if (await StoreReview.isAvailableAsync()) await StoreReview.requestReview();
}
