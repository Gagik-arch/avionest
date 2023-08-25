import { StyleSheet } from 'react-native';
import { padding, Colors, margin } from '../resources';
import { fonts } from "../resources";

 const global = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    width: '100%',
    ...margin(16, 0),
  },
  app_title:{
    color:Colors.green,
    ...fonts['24_400'],
  },
  app_subtitle:{
    color:Colors.green,
    ...fonts['16_400'],
  }
});

export default global
