import { Link, Stack } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';

export default function NotFoundScreen() {
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Not found' }} />
      <Text variant="h3">This screen doesn&apos;t exist.</Text>
      <Link href="/" asChild>
        <Button variant="link">
          <Text>Go to home</Text>
        </Button>
      </Link>
    </Screen>
  );
}
