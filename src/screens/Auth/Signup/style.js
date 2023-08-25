import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
  container: {
    ...padding(16),
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
    ...margin(60, 20, 0, 20),
    alignItems: "center",
  },
  top_text: {
    marginTop: 20,
  },
  form_item: {
    alignItems: "flex-end",
  },
  form: {
    rowGap: 16,
    ...margin(16, 0),
  },
  services_btn_container: {
    rowGap: 16,
    marginBottom: 16,
    ...margin(16, 0),
  },
  row: {
    flexDirection: "row",
  },
  star: {
    color: Colors.red,
  },
});

export default s;
