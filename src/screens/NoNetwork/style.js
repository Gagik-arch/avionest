import {StyleSheet} from 'react-native';
import {  padding } from "../../resources";

const s = StyleSheet.create({
  container:{
    ...padding(16)
  },
  block:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  }
});

export default s;
