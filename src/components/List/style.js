import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../resources";

const s = StyleSheet.create({
  list_container:{
    flexDirection:'row',
    justifyContent:'flex-start',
    columnGap:12,
    borderColor:'rgba(233, 233, 233, 1)',
    ...padding(12,0)
  },
  list_row:{
    flexDirection:'row',
    alignItems:'center',
    columnGap:16,
  },
});

export default s;
