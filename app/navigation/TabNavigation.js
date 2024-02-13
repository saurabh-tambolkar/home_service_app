import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text } from 'react-native';
import Home from '../screens/homeScreen/Home';
import { Entypo } from '@expo/vector-icons';
import Profile from '../screens/profileScreen/Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Booking from '../screens/bookingScreen/Booking';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/utils/Colors';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';

let Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ 
        headerShown: false ,
        tabBarActiveTintColor:Colors.BLACK,
        tabBarInactiveTintColor:Colors.GRAY,
        tabBarStyle:{
            backgroundColor:Colors.PEACH,
            paddingTop:5
        }
    }}>
        <Tab.Screen name="Homesdsd" component={HomeNavigation}
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color:color,fontSize:13}}>Home</Text>
                ),
                tabBarIcon:({color,size})=>(
                    <Entypo name="home" size={24} color={color} />
                )
            }}
        />
        <Tab.Screen name="Booking" component={BookingNavigation}
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color:color,fontSize:13}}>Bookings</Text>
                ),
                tabBarIcon:({color,size})=>(
                    <FontAwesome5 name="book-open" size={24} color={color} />
                )
            }}
        />
        <Tab.Screen name="Profile" component={Profile}
            options={{
                tabBarLabel:({color})=>(
                    <Text style={{color:color,fontSize:13}}>Profile</Text>
                ),
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account" size={24} color={color} />
                )
            }}
        />
    </Tab.Navigator>
  );
}

export default TabNavigation;
