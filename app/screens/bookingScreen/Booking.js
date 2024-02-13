import { useUser } from '@clerk/clerk-expo';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,TouchableOpacity ,ActivityIndicator} from 'react-native';
import GlobalApi from '../../../assets/utils/GlobalApi';
import BusinessListItem from '../businessLIstByCatScreen/BusinessListItem';
import Colors from '../../../assets/utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Booking = () => {

  const {user} = useUser();

  const navigation = useNavigation();

  const [bookings,setBookings] = useState([]);
  const [loading,setLoading] = useState(false)

  const [activity,setActivity] = useState(true)

  useEffect(()=>{
    getUserBookings();
  },[])

  const getUserBookings=async()=>{
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then((resp)=>{
      // console.log(resp.bookings);
      setBookings(resp.bookings);
      setLoading(false)
      setActivity(false)
    })
  }

  return (  
      <View style={{padding:10,paddingTop:30}}>
      <TouchableOpacity style={{flexDirection:"row",gap:10,alignItems:"center"}}  onPress={()=>navigation.goBack()}>
       <AntDesign name="arrowleft" size={30} color={Colors.BLACK} />
      <Text style={{fontSize:24,fontWeight:700}}>My booking</Text>
      </TouchableOpacity>
      {
        bookings.length == 0 ?
        <View style={{height:"90%",alignItems:"center",justifyContent:"center"}}>
          <Text style={{fontSize:16}}>
            No bookings yet!
          </Text>
        </View>
        :
        <View>
          <FlatList data={bookings}
          onRefresh={()=>getUserBookings()}
          refreshing={loading}
            renderItem={({item})=>{
              return (
                <BusinessListItem business={item.businessList} status={item.bookingStatus} date={item.date} time={item.time}/>
              )
            }}
          />
          <Text style={{fontSize:11,color:Colors.GRAY,textAlign:"center",padding:30}}>Try sliding from top to update the bookings.</Text>
        </View>
      }
      
    </View>
  );
}

export default Booking;
