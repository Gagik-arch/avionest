import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../resources";

const s = StyleSheet.create({
  list_container:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:'rgba(233, 233, 233, 1)',
    ...padding(18)
  },
  list_row:{
    flexDirection:'row',
    alignItems:'center',
    columnGap:16,
  },
});

export default s;
