import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container:{flex:1, justifyContent:"center", alignItems:"center", padding:24},

    logo:{width:60, height:60},

    welcomeTextContainer: {marginVertical:32, alignItems:"center"},

    title:{marginBottom:8,fontSize:32,fontWeight:600,color:"#252525"},

    subTitle:{
        fontSize:14,
        fontWeight:300,
        color:"#252525"
    },

    textInput:{
        backgroundColor:"#e5e7eb",
        width:"100%",
        paddingVertical:16,
        paddingHorizontal:16,
        borderRadius:4, 
        marginBottom:12
    },

    button:{backgroundColor:"#000",width:"100%",paddingVertical:16,borderRadius:24,textAlign:"center"}
})