import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import { MaterialIcons } from '@expo/vector-icons';
import Colors from './../../constants/Colors'
import { Link } from 'expo-router'


export default function Home() {
  return (
    <View style={{
      padding:20,marginTop:20
    }}>
      {/* Header */}
        <Header/>
      {/* Slider */}
        <Slider/>
      {/* Category */}
        <PetListByCategory/>
      {/* Lista of pets */}

      {/* Add new pet option */}
      <Link href={'/add-new-pet'}
      style={styles.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color="black"/>
        <Text style={{
          fontFamily:'outfit-medium',
          color:Colors.PRIMARY,
          fontSize:18
        }}>Adicionar Pet</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    padding:20,
    marginTop:20,
    textAlign:'center',
    backgroundColor:Colors.LIGHT_PRIMARY,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:15,
    borderStyle:'dashed',
    justifyContent:'center'
  }  
})