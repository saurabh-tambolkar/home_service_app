import React, { useEffect ,useState} from 'react';
import { View, Text ,FlatList,Image,StyleSheet} from 'react-native';
import Heading from '../../components/Heading';
import GlobalApi from '../../../assets/utils/GlobalApi';
import BusinessItem from './BusinessItem';

const BusinessList = () => {

    const [list,setList] = useState();

    useEffect(()=>{
        getBussinessList()
    },[])

    const getBussinessList=()=>{
        GlobalApi.getBusinessList().then((resp)=>{
            // console.log(resp.businessLists.name);
            setList(resp.businessLists)
        })
    }

  return (
    <View style={{margin:8}}>
      <Heading text={"Latest Businesses"}/>
      <FlatList data={list} 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>{
          return(
            <View style={{margin:8}}>
              <BusinessItem item={item}/>
            </View>
          )
        }}
        />
    </View>
  );
}



export default BusinessList;
