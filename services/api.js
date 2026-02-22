
import { API_URL } from "../constants/api";

export async function loginRequest(email, password){
    console.log(API_URL)
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"email":email, "password":password})
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Login failed');
    }

    return data
}

export async function registerRequest(name, email, password, password_confirmation){
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password, password_confirmation})
    })

    const data = await response.json()


    if(!response.ok){
        throw new Error(data.message || 'Registration failed');
    }

    return data
}