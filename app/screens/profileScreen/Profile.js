import React from 'react';
import { View, Text ,StyleSheet,Image,FlatList,TouchableOpacity} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../../assets/utils/Colors';
import { Entypo } from '@expo/vector-icons';

const Profile = () => {

  let profileMenu = [
    {
      id:1,
      name:"Home",
      icon:'home'
    },
    {
      id:2,
      name:"Bookings",
      icon:'bookmark'
    },
    {
      id:3,
      name:"Contact Us",
      icon:'old-phone'
    },
    {
      id:4,
      name:"Logout",
      icon:'log-out'
    },
  ]

  let {user} = useUser();

  return (
    <View style={styles.container}>
      <Text style={{fontSize:24,fontWeight:700}}>My Profile</Text>
      <View style={{display:'flex',justifyContent:'center',alignItems:"center",padding:30}}>
        <Image source={{uri:user.imageUrl}} style={styles.profImg}/>
        <Text style={{marginTop:25,fontSize:18,fontWeight:700}}> {user.fullName}</Text>
        <Text style={{marginTop:15,fontSize:15,fontWeight:700}}> {user.primaryEmailAddress.emailAddress}</Text>
      </View>
      <View style={{marginTop:25,padding:20}}>
        <FlatList data={profileMenu} renderItem={({item})=>{
          return(
            <TouchableOpacity key={item.id} style={{flexDirection:'row',alignItems:"center",gap:15,margin:20}}>
              <Entypo name={item.icon} size={24} color={Colors.BLACK} />
              <Text style={{fontSize:20,fontWeight:600,color:Colors.BLACK}}>{item.name}</Text>
            </TouchableOpacity>
          )
        }}/>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container:{
    paddingTop:30,
    padding:10,
    backgroundColor:Colors.PEACH,
    height:"100%"
  },
  profImg:{
    width:200,
    height:200,
    borderRadius:99,
},
})

export default Profile;
