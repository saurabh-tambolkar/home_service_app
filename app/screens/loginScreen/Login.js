import React from 'react';
import { View, Text,StatusBar,StyleSheet,Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Colors from '../../../assets/utils/Colors';
import loginImage from '../../../assets/Images/login.png'
import { AntDesign } from '@expo/vector-icons';

import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
    
  return (
    <View style={{alignItems:"center"}}>
      <Image source={loginImage} style={styles.loginImg} />
      <View style={styles.subContainer}>
            <Text style={{fontSize:18,color:Colors.BLACK,textAlign:"center",fontWeight:"bold"}}>Let's find Proffessional cleaning and repairing services</Text>
            <Text style={{fontSize:14,color:Colors.BLACK,textAlign:"center",marginTop:25}}>Best app to find everyday services near you !</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{fontSize:16,textAlign:'center',color:Colors.WHITE}} >
            Let's get started <AntDesign name="arrowright" size={20} color={Colors.WHITE} />
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
    loginImg:{
        width:230,
        height:450,
        marginTop:70,
        borderWidth:4,
        borderColor:'black',
        borderRadius:15
    },
    subContainer:{
        width:"100%",
        height:"80%",
        backgroundColor:Colors.PEACH,
        marginTop:-20,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        padding:20
    },
    button:{
        backgroundColor:Colors.BLACK,
        padding:20,
        borderRadius:99,
        marginTop:10,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Login;

