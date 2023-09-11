import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(56),
    },
    log_out_btn: {
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderColor: '#E9E9E9',
        ...padding(18, 0)
    },
});

export default s;
