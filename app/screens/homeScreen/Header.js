import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text,Image ,StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Colors from  "../../../assets/utils/Colors"
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import HomeNavigation from '../../navigation/HomeNavigation';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

    const {user,isLoading}=useUser();

    const navigation = useNavigation()

  return user &&(
    <View style={styles.header}>
        <View style={styles.mainContainer}>
            <View style={styles.profContainer}>
                <Image source={{uri:user.imageUrl}} style={styles.profImg}/>
            <View>
                <Text style={{fontWeight:"bold",fontSize:26,color:Colors.Black}}>Welcome !</Text>
                <Text style={{fontWeight:300,fontSize:15,color:Colors.Black}}>{user.fullName}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.push('bookings')}>
            <FontAwesome5 name="book-open" size={24} color={Colors.BLACK} />
        </TouchableOpacity>
        </View>
        <View style= {styles.searchBar}>
            <TextInput style={styles.searchText} placeholder='Search'/>
            <Fontisto style={styles.searchBtn} name="search" size={32} color={Colors.WHITE} />
        </View>
    </View>
  );
}

let styles = StyleSheet.create({
    header:{
        flexDirection:'column',
        backgroundColor:Colors.PEACH,
        borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        height:"auto",
    },
    mainContainer:{
        padding:20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    profContainer:{
        flexDirection:"row",
        justifyContent:"left",
        alignItems:"center",
        gap:20
    },
    profImg:{
        width:60,
        height:60,
        borderRadius:99,
    },
    searchBar:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        padding:20,
        gap:10,
        marginBottom:10
    },
    searchText:{
        fontSize:16,
        padding:10,
        color:Colors.BLACK,
        borderWidth:2,
        borderColor:Colors.BLACK,
        borderRadius:15,
        width:250
    },
    searchBtn:{
        backgroundColor:Colors.BLACK,
        width:50,
        height:50,
        padding:10,
        borderRadius:10
    }
})

export default Header;
