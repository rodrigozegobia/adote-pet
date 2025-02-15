import { Image, View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {db} from '../../config/FireBaseConfig'
import { FlatList } from 'react-native';

export default function Slider() {

    const [sliderList,setSLiderList]=useState([]);
    useEffect(()=>{
        	GetSliders();
    },[])

    const GetSliders=async()=>{
      setSLiderList([]);
        const snapshot=await getDocs(collection(db,'Sliders'));
        snapshot.forEach((doc)=>{
            console.log(doc.data());
            setSLiderList(sliderList=>[...sliderList,doc.data()])
        })
    }

  return (
    <View style={{
      marginTop:15
    }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        renderItem={({item,index})=>(
            <View>
                <Image source={{uri:item?.imageUrl}}
                    style={styles?.sliderImage}
                />
            </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    sliderImage:{
        width:Dimensions.get('screen').width*0.9,
        height:180,
        borderRadius:15,
        marginRight:15
    }
})