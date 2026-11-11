import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';

type ScreenProps = {
  children: ReactNode;
  /** Wrap content in a ScrollView (default true). */
  scroll?: boolean;
  /** Safe-area edges to pad. Screens under a header usually only need the bottom. */
  edges?: Edge[];
  className?: string;
};

/** Standard screen container: background, safe area, padding, max width on tablets. */
export function Screen({ children, scroll = true, edges = ['bottom'], className }: ScreenProps) {
  const content = (
    <View className={cn('w-full max-w-3xl flex-1 gap-4 self-center p-4', className)}>{children}</View>
  );

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      {scroll ? (
        <ScrollView contentContainerClassName="grow" keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
