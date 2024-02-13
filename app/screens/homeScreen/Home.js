import React from 'react';
import { View, Text ,ScrollView} from 'react-native';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import BusinessList from './BusinessList';

const Home = () => {
  return (
    <ScrollView style={{backgroundColor:"#fff",flex:1}}>
      <Header/>
      <View style={{padding:10}}>
        <Slider/>
        <Categories/>
        <BusinessList/>
      </View>
    </ScrollView>
  );
}

export default Home;
