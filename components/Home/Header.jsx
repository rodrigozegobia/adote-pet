import { Image, View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function Header() {
  const { user, isLoaded } = useUser();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      setUserName(user.fullName || 'Usuário');
      setUserImage(user.imageUrl || '');
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    // Exibir indicador de carregamento enquanto os dados carregam
    return (
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 18
          }}>
          Bem-vindo
        </Text>
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 25
          }}>
          {userName}
        </Text>
      </View>
      <Image
        source={{ uri: userImage }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 99
        }}
      />
    </View>
  );
}
