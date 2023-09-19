import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../resources";

const s = StyleSheet.create({
  background: {
    // borderWidth: 1,
    // borderColor:`rgba(0,0,0,.08)`
  },
  container: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input_container:{
    borderColor:'#EBEBEB',
...padding(4,4)
  }
});

export default s;
