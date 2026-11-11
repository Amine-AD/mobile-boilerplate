import Ionicons from '@expo/vector-icons/Ionicons';
import { Children, Fragment, type ComponentProps, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

type ListRowProps = {
  title: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
  /** Text or control on the right (e.g. a Switch). */
  right?: ReactNode;
  onPress?: () => void;
  destructive?: boolean;
};

/** A settings-style row. Group rows inside <ListSection>. */
export function ListRow({ title, icon, right, onPress, destructive }: ListRowProps) {
  const { colors } = useTheme();
  const color = destructive ? colors.destructive : colors.foreground;

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      className="min-h-14 flex-row items-center gap-4 px-4 active:bg-accent">
      {icon ? <Ionicons name={icon} size={20} color={color} /> : null}
      <Text className={cn('flex-1', destructive && 'text-destructive')}>{title}</Text>
      {right ??
        (onPress ? <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} /> : null)}
    </Pressable>
  );
}

export function ListSection({ title, children }: { title?: string; children: ReactNode }) {
  const rows = Children.toArray(children);
  return (
    <View className="gap-2">
      {title ? (
        <Text className="px-4 text-xs font-medium uppercase text-muted-foreground">{title}</Text>
      ) : null}
      <View className="overflow-hidden rounded-lg bg-card">
        {rows.map((row, index) => (
          <Fragment key={index}>
            {index > 0 ? <Separator className="ml-4" /> : null}
            {row}
          </Fragment>
        ))}
      </View>
    </View>
  );
}
