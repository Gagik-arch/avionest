import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    callout: {
        minWidth: 200,
        borderRadius:10,
    },
    callout_footer: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: '#00000040',
    },
    callout_footer_btn: {
        flex: 1,
        ...padding(8)
    },
    callout_footer_btn_text: {
        color: Colors.darkBlue,
    },
});

export default s;
