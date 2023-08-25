import {StyleSheet} from 'react-native';
import { Colors, margin, padding } from "../../resources";

const s = StyleSheet.create({
  container:{
    ...padding(100,16),
    backgroundColor:Colors.green,
    height:'100%',
    alignItems:'center',
  },
  block:{
    backgroundColor:"white",
    borderRadius:100,
    width:130,
    height:130,
    ...margin(0,0,20,0)
  }
});

export default s;
