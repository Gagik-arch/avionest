import {StyleSheet} from 'react-native';
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
  container:{
    ...padding(16)
  },
  footer:{
    flexDirection:'row',
    textAlign:'center',
    justifyContent:'center',
    ...padding(20,0)
  },
  terms_contigtion_btn:{
    color:Colors.blue,
    fontSize:12,
    ...margin(0,0,0,8)
  },
  frame:{
    justifyContent:'center',
    alignItems:'center',
  },
});

export default s;
