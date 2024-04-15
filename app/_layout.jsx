import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  

  return (
    
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
           <Stack.Screen name="signIn" options={{
          title:"Sign in to your account"}}  />
          <Stack.Screen name="signUp" options={{
          title:"Register for an account"}} />
          <Stack.Screen name="(screens)" options={{
          headerShown: false}}  />
        </Stack>
      </SafeAreaProvider>
  );
}

