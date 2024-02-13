import React, { useEffect,useState } from 'react';
import { View, Text,StyleSheet,FlatList ,Image} from 'react-native';
import GlobalApi from '../../../assets/utils/GlobalApi';
import Colors from '../../../assets/utils/Colors';
import Heading from '../../components/Heading';

const Slider = () => {

    const [slider,setSlider] = useState();

    useEffect(()=>{
        getSliders();
    },[])

    let getSliders=()=>{
        GlobalApi.getSlider().then(resp=>{
            // console.log("resp",resp);
            setSlider(resp.sliders)
        })
    }

  return (
    <View style={{margin:8}}>
      <Heading text={"Offers for you"} />
      <FlatList data={slider} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>{
          return(
            <View style={{margin:8}}>
              <Image source={{uri:item.image.url}} style={styles.sliderImg}/>
            </View>
          )
        }}
        />
    </View>
  );
}

let styles = StyleSheet.create({
  offerHead:{
    fontSize:16,
    color:Colors.BLACK,
    fontWeight:"bold"
  },
  sliderImg:{
    height:150,
    width:250,
    borderRadius:15,
    objectFit:"contain"
  }
})

export default Slider;
