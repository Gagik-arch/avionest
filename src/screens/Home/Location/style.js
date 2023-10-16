import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
    },
    header: {
        backgroundColor: Colors.darkBlue,
    },
    top: {
        flexDirection: 'row',
    },
    top_btn: {
        flex: 1,
        ...padding(10, 12),
        columnGap: 8,
        alignItems: "center",
    },
    divider: {
        width: 1,
        backgroundColor: '#D9D9D9',
    },
    map: {
        borderWidth: 1,
        flex: 1,
    },
    top_btn_text: {
        marginTop: 6,
        textAlign: 'center',
    },
    callout: {
        minWidth: 280,
        maxWidth:360,
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
