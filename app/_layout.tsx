import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Navbar from '@/components/tractit/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
// import { useAccount } from "../types/utils/ethers";
import WalletConnectProvider from '@walletconnect/react-native';

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)', // Ensure that reloading on `/modal` keeps a back button present.
};

SplashScreen.preventAutoHideAsync();

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || 'http://192.168.217.92:3000/graphql',
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error('Error loading fonts:', error);
    }
  }, [error]);

  useEffect(() => {
    async function hideSplashScreen() {
      if (loaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const { account, balance, isOwner } = useAccount();
  return (
    <SafeAreaView style={{ flex: 1, }} edges={['left', 'right', 'bottom']}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Navbar />
      <ApolloProvider client={apolloClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="product" />
          <Stack.Screen name="productItems" />
          <Stack.Screen name="productItemTimeline" />
        </Stack>
      </ApolloProvider>
    </ThemeProvider>
    </SafeAreaView>
  );
}
