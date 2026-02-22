import { AuthProvider, useAuth } from "@/auth/AuthContext";
import SafeScreen from "@/components/SafeScreen";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";


function AuthGate(){
  const {isAuthenticated, isLoading} = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if(isLoading) return

    const inAuthGroup = segments[0] === '(auth)';

    if(!isAuthenticated && !inAuthGroup){
      router.replace('/login')
    }

    if(isAuthenticated && inAuthGroup){
      router.replace('/')
    }


  }, [isAuthenticated, isLoading, segments])

  if (isLoading) {
    return null; // or a splash/loading screen
  }

  return(
    <SafeScreen>
      <Stack screenOptions={{headerShown:false}}/>
      <StatusBar style="dark"/>
    </SafeScreen>
    
  )
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}
