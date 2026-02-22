/*
 This file handles the storage and management of the token and 
 user data using expo-secure-store
*/

import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export async function setAuth(token, user){
    await SecureStore.setItemAsync(TOKEN_KEY, token)
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user))
}

export async function getAuth(){
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    const user = await SecureStore.getItemAsync(USER_KEY)

    return {
        token,
        user : user ? JSON.parse(user) : null
    }
}

export async function clearAuth(){
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    await SecureStore.deleteItemAsync(USER_KEY)
}