import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { AppProvider } from '../src/context/AppContext';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    'Proxima-Nova-Regular': require('../assets/fonts/Proxima-Nova-Regular.otf'),
    'Proxima-Nova-Bold': require('../assets/fonts/Proxima-Nova-Bold.otf'),
    'Proxima-Nova-Semibold': require('../assets/fonts/Proxima-Nova-Semibold.otf'),
    'Proxima-Nova-Black': require('../assets/fonts/Proxima-Nova-Black.otf'),
    'Proxima-Nova-Thin': require('../assets/fonts/Proxima-Nova-Thin.otf'),
    'Proxima-Nova-Extrabold': require('../assets/fonts/Proxima-Nova-Extrabold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading fonts: {fontError.message}</Text>
      </View>
    );
  }

  return (
    <AppProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Matches' }} />
          <Stack.Screen 
            name="chat" 
            options={({ route }) => ({
              title: route.params?.name || 'Chat',
            })}
          />
          <Stack.Screen 
            name="admin" 
            options={{
              headerShown: true,
              title: "Admin Panel"
            }}
          />
        </Stack>
      </View>
    </AppProvider>
  );
}