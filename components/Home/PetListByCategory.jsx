import { FlatList, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from '@firebase/firestore'
import {db} from './../../config/FireBaseConfig'
import PetListItem from './PetListItem'

export default function PetListByCategory() {

  const [petList,setPetList]=useState([]);
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    GetPetList('Cats')
  },[])
  /** Uso para pegar a Lista dos pets pela seleção de categoria
  *
  * @param {*}category
  */ 
  const GetPetList=async(category)=>{
    setLoader(true)
      setPetList([]);
      const q=query(collection(db,'Pets'),where('category','==',category));
      const querySnapshot=await getDocs(q);

      querySnapshot.forEach(doc=>{
        setPetList(petList=>[...petList,doc.data()])
      })
      setLoader(false);
  }

  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
      <FlatList
        data={petList}
        style={{marginTop:10}}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>GetPetList('Cats')}
        renderItem={({item,index})=>(
          <PetListItem pet={item}/>
        )}
      />
    </View>
  )
}