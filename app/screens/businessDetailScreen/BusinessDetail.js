import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect,useState } from 'react';
import { View, Text, TouchableOpacity, FlatList,ActivityIndicator,Image,StyleSheet,ScrollView, Modal, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GlobalApi from '../../../assets/utils/GlobalApi';
import Colors from '../../../assets/utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import Heading from '../../components/Heading';
import BookingModal from './BookingModal';

const BusinessDetail = () => {

    const [isRead,setIsRead] = useState(false)
    const [showModal,setShowModal] = useState(false)

  let params = useRoute().params;
//   console.log(params)
 
  const navigation = useNavigation()

  let businessEmail = "saurabhtambolkar22@gmail.com";

  let messageBtnClick=()=>{
    Linking.openURL(`mailto:${businessEmail}?subject=Looking for your Service&body=hii there`)
  }


  return (
   <View>
     <ScrollView style={{height:"92%"}}>
        <TouchableOpacity style={styles.backBtn}  onPress={()=>navigation.goBack()}>
       <AntDesign name="arrowleft" size={30} color={Colors.BLACK} />
      </TouchableOpacity>
        <Image style={styles.detailedImg} width={300} height={300} source={{uri:params.business.images[0].url}}/>
        <View style={styles.infoContainer}>
            <Text style={{fontSize:23,fontWeight:"bold"}}>{params.business.name}</Text>
            <Text style={{fontSize:10,fontWeight:500,padding:3,backgroundColor:"#b65fcf",color:Colors.WHITE,borderRadius:10,alignSelf:"flex-start",paddingHorizontal:10}}>{params.business.category.name}</Text>
            <Text style={{fontSize:16,fontWeight:600,color:Colors.GRAY}}>{params.business.contactPerson}</Text>
            <Text style={{fontSize:14,fontWeight:500,color:Colors.GRAY,alignItems:"center"}}><MaterialIcons name="location-on" size={18} color={Colors.GRAY} />{params.business.address}</Text>
        </View>
        <View style={{margin:10,borderWidth:0.5,borderColor:Colors.GRAY}}></View>
        <View  style={{margin:10}}>
            <Heading text={"About"}/>
            {
                isRead ?
                <Text  style={{fontSize:14,margin:10,color:Colors.GRAY}}>{params.business.about}</Text>
                :
                <Text numberOfLines={4} style={{fontSize:14,margin:10,color:Colors.GRAY}}>{params.business.about}</Text>
            }
            <TouchableOpacity onPress={()=> setIsRead(!isRead)} >
                {
                    isRead ?
                    <Text style={{fontSize:12,alignSelf:"flex-end",fontWeight:"bold",marginRight:10,marginTop:-10,color:Colors.BLACK}}>Read less</Text>
                    :
                    <Text style={{fontSize:12,alignSelf:"flex-end",fontWeight:"bold",marginRight:10,marginTop:-10,color:Colors.BLACK}}>Read More</Text>
                }
            </TouchableOpacity>
        </View>
        <View style={{margin:10,borderWidth:0.5,borderColor:Colors.GRAY}}></View>
        <View style={{margin:10}}>
            <Heading text={"Photos"}/>
            <FlatList data={params.business.images}
            numColumns={2}
                renderItem={({item})=>{
                    // {console.log(item)}
                    return(
                        <Image source={{uri:item.url}} style={{width:"100%",flex:1,borderRadius:15,margin:10,height:150}}/>
                    )
                }}
            />
        </View>
    </ScrollView>

    <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.msgBtn} onPress={messageBtnClick}>
            <Text style={{fontSize:18,fontWeight:"bold",color:Colors.BLACK}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn} onPress={()=>setShowModal(true)}>
            <Text style={{fontSize:18,fontWeight:"bold",color:Colors.BLACK}}>Book now!</Text>
        </TouchableOpacity>
    </View>
    <Modal animationType='slide' visible={showModal}>
    <BookingModal category={params.business.name} businessId={params.business.id} hideModal={() => setShowModal(false)} />
</Modal>

   </View>
  );
}

let styles = StyleSheet.create({
    backBtn:{
         margin:20,
         position:"absolute",
         zIndex:2,
    },
    detailedImg:{
        width:'100%',
    },
    infoContainer:{
        padding:20,
        gap:8
    },
    btnContainer:{
        display:"flex",
        flexDirection:"row",
        gap:10,
        padding:3,
        margin:15,
        marginTop:0,
        justifyContent:"center",
        alignItems:"center"
    },
    msgBtn:{
        flex:1,
        borderWidth:1,
        padding:15,
        borderRadius:99,
        alignItems:"center",
        backgroundColor:Colors.PEACH
    },
    bookBtn:{
        flex:1,
        borderWidth:1,
        padding:15,
        borderRadius:99,
        alignItems:"center",
        backgroundColor:Colors.PEACH
    }
})

export default BusinessDetail;
