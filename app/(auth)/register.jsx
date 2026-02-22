import { setAuth } from '@/auth/AuthContext'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles'
import { registerRequest } from '../../services/api'

const RegisterScreen = () => {
  const [email, setEmail] = useState('johndoe@email.com')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister(){
    
    setIsLoading(false)
    setError('')
    try{

      // validate user input
      if(!email || !name || !password || !confirmPassword){
        setError('All fields are required')
        return
      }

      console.log(name, email, password, confirmPassword)

      // send registration request to api
      const {token, user} = await registerRequest(name, email, password, confirmPassword)

      // save authentication data to device
      setAuth(token, user)

      // set authentication data on app
      setToken(token)
      setUser(user)
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
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subTitle}>Please enter your details</Text>
        </View>

        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

        <TextInput 
          placeholder='Name'
          placeholderTextColor={"#252525"}
          value={name}
          style={styles.textInput}
          onChangeText={setName}
        />

        <TextInput 
          placeholder='Email'
          placeholderTextColor={"#252525"}
          value={email}
          style={styles.textInput}
          onChangeText={setEmail}
        />

        <TextInput 
          placeholder='Password'
          placeholderTextColor={"#252525"}
          secureTextEntry={true}
          value={password}
          style={styles.textInput}
          onChangeText={setPassword}
        />

        <TextInput 
          placeholder='Confirm Password'
          placeholderTextColor={"#252525"}
          secureTextEntry={true}
          value={confirmPassword}
          style={styles.textInput}
          onChangeText={setConfirmPassword}
        />

        {
          isLoading ? (
            <ActivityIndicator size={24} color={"#252525"} />
          ):(
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={{color:"#fff",textAlign:"center",fontSize:16,fontWeight:600}}>Continue</Text>
            </TouchableOpacity>
          )

        }

        

        <View style={{marginTop:12,flexDirection:"row", justifyContent:"center", gap:3,alignItems:"center"}}>
          <Text style={{fontSize:14, fontWeight:300, color:"#252525"}}>Already have an account?</Text>
          <Link style={{ fontSize:14, fontWeight:500, color:"#252525"}} href="/login">Login here</Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}



export default RegisterScreen