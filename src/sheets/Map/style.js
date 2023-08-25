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
  description: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    color: Colors.gray,
    ...padding(10, 12),
    ...margin(16, 0),
    borderRadius: 4,
  },
  group_container: {
    ...margin(26, 0),
  },
  list_container: {
    borderWidth: 1,
    borderColor: "rgba(178, 178, 178, 1)",
    borderRadius: 4,
    ...padding(10),
    flexDirection:'row',
    columnGap:16,
    alignItems:'center'
  },
  image: {
    width: 30,
    height: 30,
    borderRadius:20,
    borderWidth: 1,
  },
});

export default s;
