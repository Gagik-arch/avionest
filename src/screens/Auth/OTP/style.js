import {StyleSheet} from 'react-native';
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
  container:{
    ...padding(16)
  },
  bottom:{
    flexDirection:'row',
    columnGap:6,
    justifyContent:'center',
    ...margin(32,0,34,0)
  }
});

export default s;
