import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useCallback } from 'react';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync()
    return() => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', {scheme: 'myapp'}),
      })

      if(createdSessionId) {

      } else {

      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  })

  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <Image source={require('./../../assets/images/login.png')}
        style={{
          width:'100%',
          height:500
        }}
      />
      <View style={{
        padding:20,
        display:'flex',
        alignItems:'center'
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:30,
          textAlign:'center'
        }}>Pronto para fazer um novo amigo?</Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:18,
          textAlign:'center',
          color:Colors.GRAY
        }}>Adote o pet do seu gosto e faça a vida dele mais feliz</Text>

        <Pressable onPress={onPress}
        style={{
          padding:14,
          marginTop:100,
          backgroundColor:Colors.PRIMARY,
          width:'100%',
          borderRadius:14
        }}>

          <Text style={{
            fontFamily:'outfit-medium',
            fontSize:20,
            textAlign:'center'
          }}>Começar</Text>
        </Pressable>

      </View>
    </View>
  )
}