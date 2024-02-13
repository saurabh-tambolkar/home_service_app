import React, { useEffect, useState } from 'react';
import { View, Text ,TouchableOpacity,StyleSheet,FlatList,TextInput,ScrollView, ToastAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/utils/Colors';
import { useNavigation } from '@react-navigation/native';
import CalendarPicker from "react-native-calendar-picker";
import addMonths from 'date-fns/addMonths';
import Heading from '../../components/Heading';
import GlobalApi from '../../../assets/utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';


const BookingModal = ({category,hideModal,businessId}) => {

    let navigation = useNavigation();

    const [timelist,setTimelist] = useState([]);
    const [selectTimeSlot,setSelectTimeSlot] = useState();
    const [selectedDate,setSelectedDate] = useState();
    const [suggestions,setSuggestions] = useState();

    const {user}=useUser();

    useEffect(()=>{
        getTime();
    },[])

    let getTime=()=>{
        const timeList = [];
        for(let i=8;i<=12;i++)
        {
            timeList.push({time: i + ':00 AM'});
            timeList.push({time: i + ':30 AM'});
        }
        for(let i=1;i<=7;i++)
        {
            timeList.push({time: i + ':00 PM'});
            timeList.push({time: i + ':30 PM'});
        }
        setTimelist(timeList);
    }

    const createNewBooking=()=>{
        console.log("Clicked")
        if(!selectedDate || !selectTimeSlot){
            ToastAndroid.show("Please select Date and Time",ToastAndroid.SHORT)
            return ;
        }
        else{
            console.log(businessId)
            const data={
                userName:user?.fullName,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                time:selectTimeSlot,
                date: format(selectedDate, 'dd-MM-yyyy'),
                businessId:businessId
                // note:suggestions,
            }
            GlobalApi.createBooking(data).then((resp)=>{
                // console.log(resp);
                // console.log(data)
                ToastAndroid.show("Appointment booked successfully",ToastAndroid.SHORT)
                hideModal();
            })
            .catch((err)=>console.error("err on booking ",err))
        }
    }


  return (
    <ScrollView style={{padding:20}}>
      <TouchableOpacity style={styles.backBtn}  onPress={()=>hideModal()}>
       <AntDesign name="arrowleft" size={30} color={Colors.BLACK} />
       <Text style={{fontWeight:"bold",fontSize:18}}>Booking for {category}</Text>
      </TouchableOpacity>

      {/* // calender section */}
      <Heading text={'Select date'}/>
      <View style={styles.calendar}>
      <CalendarPicker width={350} onDateChange={setSelectedDate}  minDate={Date.now()} todayTextStyle={{color:Colors.WHITE}} selectedDayTextColor={Colors.WHITE} selectedDayColor={Colors.BLACK}/>
      </View>
      <View style={{marginTop:35}}>
          <Heading text={'Select time slot'}/>
        <FlatList data={timelist} 
        showsHorizontalScrollIndicator={false}
        horizontal={true}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity style={{marginTop:15,margin:5}} onPress={() => setSelectTimeSlot(item.time)} >
                        <Text style={[selectTimeSlot===item.time ? styles.selectedTime : styles.unselectedTime]}>{item.time}</Text>
                    </TouchableOpacity>
                )
            }}
        />
      </View>
      <View style={{marginTop:35}}>
        <Heading text="Any suggestions"/>
        <TextInput style={styles.textarea} numberOfLines={5} onChangeText={(text)=>setSuggestions(text)} placeholder='I want my booking to be . . . . . . . .' />
      </View>
      <TouchableOpacity style={styles.confirmBtn} onPress={createNewBooking}>
        <Text style={{fontSize:16,fontWeight:"bold",color:Colors.WHITE}}>
            Confirm and Book
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    backBtn: {
        marginBottom:35,
        display:"flex",
        flexDirection:"row",
        gap:10,
        alignItems:"center"
    },
    calendar:{
        backgroundColor:Colors.PEACH,
        borderRadius:20,
        marginTop:15
    },
    selectedTime:{
        paddingVertical:5,
        paddingHorizontal:20,
        borderWidth:1,
        borderColor:Colors.GRAY,
        borderRadius:99,
        backgroundColor:Colors.BLACK,
        color:Colors.WHITE
    },
    unselectedTime:{
        paddingVertical:5,
        paddingHorizontal:20,
        borderWidth:1,
        borderColor:Colors.GRAY,
        borderRadius:99,
    },
    textarea:{
        borderWidth:1,
        borderColor:Colors.GRAY,
        borderRadius:15,
        textAlignVertical:"top",
        padding:10,
        marginTop:15
    },
    confirmBtn:{
        alignItems:"center",
        backgroundColor:Colors.BLACK,
        
        padding:20,
        marginTop:30,
        borderRadius:50
    }
})

export default BookingModal;
