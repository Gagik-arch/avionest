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
        flexDirection: 'column'
    },
    divider: {
        width: 1,
        backgroundColor: '#D9D9D9'
    },
    map: {
        borderWidth: 1,
        flex: 1
    },
    top_btn_text: {
        marginTop:6,
        textAlign:'center'
    },
});

export default s;
