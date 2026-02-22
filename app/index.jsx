import { useAuth } from "@/auth/AuthContext";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {user, logout} = useAuth()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Logged in as : {user?.email}</Text>
      <TouchableOpacity onPress={logout} style={{marginTop:60, backgroundColor:"#000",paddingHorizontal:20,paddingVertical:16,borderRadius:24,textAlign:"center"}}>
        <Text style={{color:"#fff",textAlign:"center"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
