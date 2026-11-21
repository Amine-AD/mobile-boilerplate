import { styled } from 'nativewind';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

/**
 * SafeAreaView that accepts `className`. Nativewind v5 only adds className to React Native's own
 * components; third-party ones need an explicit `styled` mapping (https://www.nativewind.dev/v5/guides/third-party-components).
 */
export const SafeAreaView = styled(RNSafeAreaView, { className: 'style' });
