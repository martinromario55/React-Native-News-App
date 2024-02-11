import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppNavigation from './src/navigation'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

const queryClient = new QueryClient()
export default function App() {
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
