import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, type CustomerInfo } from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

import { AppConfig } from '@/config/app-config';
import { env } from '@/lib/env';
import { useProStore } from '@/stores/pro-store';

/**
 * In-app purchases via RevenueCat (Google Play Billing + Apple StoreKit).
 * Needs a development build — it does not work in Expo Go.
 * Set up products, the "pro" entitlement and a paywall in the RevenueCat dashboard.
 */

let configured = false;

const apiKey = Platform.select({
  android: env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
  ios: env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
});

export const purchasesEnabled = Boolean(apiKey) && Platform.OS !== 'web';

function syncPro(info: CustomerInfo) {
  const isPro = Boolean(info.entitlements.active[AppConfig.proEntitlementId]);
  useProStore.getState().setIsPro(isPro);
}

export async function initPurchases() {
  if (!purchasesEnabled || configured || !apiKey) return;
  try {
    if (__DEV__) await Purchases.setLogLevel(LOG_LEVEL.WARN);
    Purchases.configure({ apiKey });
    configured = true;
    Purchases.addCustomerInfoUpdateListener(syncPro);
    syncPro(await Purchases.getCustomerInfo());
  } catch (error) {
    console.warn('[purchases] init failed', error);
  }
}

/** Shows the paywall designed in the RevenueCat dashboard. Returns true if the user is now Pro. */
export async function showPaywall(): Promise<boolean> {
  if (!configured) {
    console.warn('[purchases] Not configured — add RevenueCat keys to .env and use a dev build.');
    return false;
  }
  const result = await RevenueCatUI.presentPaywallIfNeeded({
    requiredEntitlementIdentifier: AppConfig.proEntitlementId,
  });
  return result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED;
}

export async function restorePurchases(): Promise<boolean> {
  if (!configured) return false;
  const info = await Purchases.restorePurchases();
  syncPro(info);
  return Boolean(info.entitlements.active[AppConfig.proEntitlementId]);
}
