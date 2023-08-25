import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
  container: {
    ...padding(16),
  },
  forgot_password_container: {
    alignItems: "flex-start",
    ...margin(10, 0, 60, 0),
  },
  forgot_password_btn: {
    fontSize: 12,
    color: Colors.black,
  },
  input_label: {
    ...margin(0, 0, 8, 0),
  },
  divider_container: {
    flexDirection: "row",
    alignItems: "center",
    ...margin(28, 0),
  },
  footer_container: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
    justifyContent: "center",
    ...margin(10, 0),
  },
  top_container: {
    ...margin(40, 20,0 , 20),
    alignItems: "center",
  },
  top_text:{
    marginTop:20
  },
  form:{
    rowGap:16,
    marginTop:16,
    alignItems:"flex-start"
  },
  services_btn_container:{
    rowGap:16,
    marginBottom:16,
    ...margin(16, 0),
  },
  signin_btn:{
    ...padding(8),
    columnGap:8
  }
});

export default s;
