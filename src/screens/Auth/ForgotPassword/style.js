import {StyleSheet} from 'react-native';
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
  container:{
    ...padding(16,52)
  },
  frame:{
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    ...margin(16,0)
  },
});

export default s;
