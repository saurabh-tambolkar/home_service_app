import React from 'react';
import { View, Text ,StyleSheet } from 'react-native';
import Colors from '../../assets/utils/Colors';

// const Heading = ({text,isViewAll}) => {
const Heading = (props) => {
  return (
    <View  style={styles.container}>
      <Text style={styles.heading}>{props.text}</Text>
      {
        props.isViewAll && <Text style={styles.viewAll}>View all</Text>
      }
    </View>
  );
}

let styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading:{
        fontSize:16,
        color:Colors.BLACK,
        fontWeight:"bold"
    },
    viewAll:{
        fontSize:12,
        color:Colors.BLACK,
        fontWeight:"bold"
    }
})

export default Heading;
