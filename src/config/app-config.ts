/**
 * Per-app settings. Change these when you start a new app from the boilerplate.
 * Secrets and keys do NOT go here — they go in `.env` (see `.env.example`).
 */
export const AppConfig = {
  /** Shown in settings, emails, store links. */
  name: 'Boilerplate',
  supportEmail: 'support@example.com',
  privacyPolicyUrl: 'https://example.com/privacy',
  termsUrl: 'https://example.com/terms',

  /** RevenueCat entitlement that unlocks paid features. */
  proEntitlementId: 'pro',

  /** Ask for an App Store / Play Store review after this many "happy moments". */
  reviewPromptAfterHappyMoments: 5,
} as const;
