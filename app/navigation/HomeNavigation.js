import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import Home from '../screens/homeScreen/Home';
import BusinessListByCat from "../screens/businessLIstByCatScreen/BusinessListByCat"
import BusinessDetail from '../screens/businessDetailScreen/BusinessDetail';
import Booking from '../screens/bookingScreen/Booking';

let Stack = createStackNavigator();

const HomeNavigation = () => {

  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='business-list' component={BusinessListByCat}/>
        <Stack.Screen name='business-details' component={BusinessDetail}/>
        <Stack.Screen name='bookings' component={Booking}/>
    </Stack.Navigator>
  );
}

export default HomeNavigation;

