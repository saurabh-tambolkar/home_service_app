import React,{useState,useEffect} from 'react';
import { View, Text , StyleSheet,FlatList,Image, TouchableOpacity} from 'react-native';
import Colors from '../../../assets/utils/Colors';
import GlobalApi from '../../../assets/utils/GlobalApi';
import Heading from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {

    const [category,setCategory] = useState();

    useEffect(()=>{
        getCategories()
    },[])    

    let getCategories=()=>{
        GlobalApi.getCategory().then((resp)=>{
            // console.log(resp)
            setCategory(resp.categories);
        })
    }

    const navigation = useNavigation()

  return (
    <View style={{margin:8}}>
      <Heading text={"Categories"} isViewAll={true}/>
      <FlatList data={category} 
      numColumns={4}
        renderItem={({item,index})=>index <=3 && (
            <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-list',{category:item.name})}>
                <View style={styles.iconContainer}>
              <Image source={{uri:item.icon.url}} style={styles.categoryImg}/>
              <Text style={{fontSize:13,marginTop:5}}>{item.name}</Text>
                </View>
            </TouchableOpacity>
  )}
        />
    </View>
  );
}

let styles = StyleSheet.create({
    container:{
        flex:1,
    },
    iconContainer:{
        alignItems:"center",
        justifyContent:"center",
        borderRadius:99,
        borderWidth:1,
        borderColor:"#fff",
        shadowColor:"#fff",
        elevation:60,
        padding:2,
        margin:10
    },
    categoryImg:{
      height:40,
      borderRadius:10,
      width:40,
      margin:5,
      objectFit:"contain"
    }
  })

export default Categories;
