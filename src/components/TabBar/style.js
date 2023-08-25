import { StyleSheet, Platform } from "react-native";
import {  padding } from "../../resources";

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...padding(6, 0),
    borderTopWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "rgba(0,0,0,.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0,
    shadowRadius: 8.30,
    elevation: 13,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    ...padding(10,0)
  },
});

export default s;
