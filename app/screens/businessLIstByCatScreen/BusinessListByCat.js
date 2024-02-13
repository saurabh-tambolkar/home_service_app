import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GlobalApi from '../../../assets/utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import Colors from '../../../assets/utils/Colors';

const BusinessListByCat = () => {

  const [list,setList] = useState();
  const [loading,setLoading] = useState(true)

  const param = useRoute().params;

  const navigation = useNavigation()

  useEffect(()=>{
    getBusinessByCat();
  },[])

  const getBusinessByCat=()=>{
    GlobalApi.getBusinessListByCategory(param.category).then((resp)=>{
      // console.log(resp);
      setList(resp.businessLists)
      setLoading(false)
    })
  }

  return (
    <View style={{padding:10,paddingTop:30}}>
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center',gap:20}} onPress={()=>navigation.goBack()}>
      <AntDesign name="arrowleft" size={30} color="black" />
      <Text style={{fontWeight:"bold",fontSize:20}}>{param.category}</Text>
      </TouchableOpacity>
      {
        // console.log(list.length)
        loading ? <ActivityIndicator color={Colors.BLACK} size="large" animating={true}/> :
        (list?.length > 0 ? <FlatList data={list} renderItem={({item})=>{
          return(
            <BusinessListItem business={item}/>
          )
        }}/> : <Text style={{fontSize:30}}>No business found</Text>)
      }
    </View>
  );
}

export default BusinessListByCat;
