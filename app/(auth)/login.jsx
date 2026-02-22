import { useAuth } from '@/auth/AuthContext'
import { setAuth } from '@/auth/authStorage'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles'
import { loginRequest } from '../../services/api'

const LoginScreen = () => {
  const [email, setEmail] = useState('lloydmensah551@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {setToken, setUser} = useAuth()

  async function handleLogin(){
    setIsLoading(true)
    setError('')
    try{

      // validate user input
      if(!email || !password){
        setError('Email and password are required')
        return
      }

      const {token, user} = await loginRequest(email, password)
      
      setAuth(token, user)

      // set authentication details (token and user)
      setToken(token)
      setUser(user)
      console.log(`Token : ${token}`)

    }catch(err){
      setError(err.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView style={{flex:1}} contentContainerStyle={{flexGrow:1}} enableOnAndroid={true} enableAutomaticScroll={true}>
      <View style={styles.container}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo}/>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subTitle}>Please enter your details</Text>
        </View>
        
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <TextInput 
          placeholder='Email'
          placeholderTextColor={"#252525"}
          value={email}
          style={styles.textInput}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType='email-address'
        />

        <TextInput 
          placeholder='Password'
          placeholderTextColor={"#252525"}
          secureTextEntry={true}
          value={password}
          style={styles.textInput}
          onChangeText={setPassword}
        />

        {
          isLoading ? (
            <ActivityIndicator size={24} color={"#252525"} />
          ):(
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={{color:"#fff",textAlign:"center",fontSize:16,fontWeight:600}}>Login</Text>
            </TouchableOpacity>
          )

        }

        

        <View style={{marginTop:12,flexDirection:"row", justifyContent:"center", gap:3,alignItems:"center"}}>
          <Text style={{fontSize:14, fontWeight:300, color:"#252525"}}>Don't have an account?</Text>
          <Link style={{ fontSize:14, fontWeight:500, color:"#252525"}} href="/register">Register here</Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default LoginScreen