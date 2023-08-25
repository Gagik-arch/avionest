import { StyleSheet, Platform } from "react-native";
import { margin, padding } from "../../resources";

const s = StyleSheet.create({
  container: {

  },
  input_container:{
    backgroundColor:'#7676801F',
    borderWidth:0,
    borderRadius:6,
    ...padding(0,6),
  }
});

export default s;
