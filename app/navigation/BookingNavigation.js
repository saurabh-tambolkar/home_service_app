import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Booking from '../screens/bookingScreen/Booking';
import BusinessDetail from '../screens/businessDetailScreen/BusinessDetail';

let Stack  = createStackNavigator()

const BookingNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='booking' component={Booking}/>
        <Stack.Screen name='business-details' component={BusinessDetail}/>
    </Stack.Navigator>
  );
}

export default BookingNavigation;
