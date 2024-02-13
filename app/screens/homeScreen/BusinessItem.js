import React from 'react';
import { View, Text ,FlatList,Image,StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../../assets/utils/Colors';
import { useNavigation } from '@react-navigation/native';

const BusinessItem = ({item}) => {

  const navigation = useNavigation()
  
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-details',{business:item})}>
    <Image source={{uri:item.images[0].url}} style={styles.businessImg}/>
      <Text style={{fontSize:14,fontWeight:"bold"}}>{item.name}</Text>
      <Text style={{fontSize:12,fontWeight:500}}>{item.contactPerson}</Text>
      <Text style={{fontSize:10,fontWeight:500,padding:3,backgroundColor:"#b65fcf",color:Colors.WHITE,borderRadius:10,alignSelf:"flex-start",paddingHorizontal:5}}>{item.category.name}</Text>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:Colors.PEACH,
        borderRadius:20,
        display:"flex",
        gap:3
    },
    businessImg:{
        width:150,
        height:100,
        borderRadius:15
        // objectFit:"contain"
    }
})

export default BusinessItem;
