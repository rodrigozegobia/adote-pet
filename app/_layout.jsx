import { tokenCache } from '@/cache'
import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')
  })

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" 
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen name="login/index"
        options={{
          headerShown:false
        }}
        />
      </Stack>
    </ClerkProvider>
  );
}
