import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppNavigation from './src/navigation'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'
import { useFonts, Font } from 'expo-font'

const queryClient = new QueryClient()
export default function App() {
  // load and register the fonts
  async function loadFonts() {
    await Font.loadAsync({
      SpaceGroteskSemiBold: require('./src/fonts/SpaceGrotesk-SemiBold.ttf'),
      SpaceGroteskBold: require('./src/fonts/SpaceGrotesk-Bold.ttf'),
      SpaceGroteskMedium: require('./src/fonts/SpaceGrotesk-Medium.ttf')
    })
    loadFonts()
  }

  // const [fontsLoaded, fontError] = useFonts({
  //   SpaceGroteskSemiBold: require('./src/fonts/SpaceGrotesk-SemiBold.ttf'),
  //   SpaceGroteskBold: require('./src/fonts/SpaceGrotesk-Bold.ttf'),
  //   SpaceGroteskMedium: require('./src/fonts/SpaceGrotesk-Medium.ttf')
  // })

  return (
    <QueryClientProvider
      client={queryClient}
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}
    >
      <AppNavigation />
    </QueryClientProvider>
  )
}
