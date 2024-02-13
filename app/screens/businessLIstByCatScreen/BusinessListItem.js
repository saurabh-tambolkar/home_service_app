import React from 'react';
import { View, Text,Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../../assets/utils/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';


const getStatusStyle = (status) => {
  switch (status) {
    case 'Booked':
      return styles.bookedStatus;
    case 'InProgress':
      return styles.inProgressStatus;
    case 'Cancelled':
      return styles.cancelledStatus;
    case 'Completed':
      return styles.completedStatus;
    default:
      return styles.defaultText;
  }
};


const BusinessListItem = ({business,status,date,time}) => {


  let statusStyleBadge = getStatusStyle(status)
    
    const navigation = useNavigation();

  let navigatePush = ()=>{
    if(status){
      navigation.push('booking');
    }
    else{
      navigation.push("business-details",{business:business})
    }
  }  

  return (
    // <TouchableOpacity  style={styles.listItem} onPress={()=>navigation.push("business-details",{business:business})}>
    <TouchableOpacity  style={styles.listItem} onPress={navigatePush}>
      <Image style={styles.Busimg} source={{uri:business.images[0].url}}/>
      <View style={styles.subcontainer}>
        <Text style={{fontSize:16,color:Colors.BLACK,fontWeight:"bold"}}>{business.name}</Text>
        <Text style={{fontSize:13,fontWeight:700,color:Colors.GRAY}}>{business.contactPerson}</Text>
          {
            status ?
            <Text style={statusStyleBadge}>{status}</Text>
            :
          <Text style={{fontSize:11,color:Colors.GRAY}}>{business.email}</Text>
          }
          {
            status?
            <View style={{flexDirection:'row',gap:10}}>
              <Entypo name="calendar" size={20} color="black" />
              <Text>{date} : {time} </Text>
            </View>
            :
            <Text style={{fontSize:11,alignItems:"center",color:Colors.GRAY}}><MaterialIcons name="location-on" size={15} color="black" />{business.address}</Text>

          }
      </View>
     
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
    listItem:{
        padding:15,
        backgroundColor:Colors.PEACH,
        borderRadius:25,
        marginTop:20,
        display:'flex',
        flexDirection:"row",
        gap:10,
        alignItems:"center"
    },
    subcontainer:{
        display:"flex",
        gap:8,
        marginRight:10
    },
    Busimg:{
        width:100,
        height:100,
        borderRadius:15
    },
    bookedStatus:{
      fontSize:10,
      padding:3,
      backgroundColor:"#b65fcf",
      color:Colors.WHITE,
      borderRadius:10,
      alignSelf:"flex-start",
      paddingHorizontal:10
    },
    inProgressStatus:{
      fontSize:10,
      padding:3,
      backgroundColor:"#ff8c00",
      color:Colors.WHITE,
      borderRadius:10,
      alignSelf:"flex-start",
      paddingHorizontal:10
    },
    cancelledStatus:{
      fontSize:10,
      padding:3,
      backgroundColor:"#cf142b",
      color:Colors.WHITE,
      borderRadius:10,
      alignSelf:"flex-start",
      paddingHorizontal:10
    },
    completedStatus:{
      fontSize:10,
      padding:3,
      backgroundColor:"#4bb543",
      color:Colors.WHITE,
      borderRadius:10,
      alignSelf:"flex-start",
      paddingHorizontal:10
    },
})

export default BusinessListItem;
