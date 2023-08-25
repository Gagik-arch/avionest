import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth:1,
        borderColor:'rgba(178, 178, 178, 1)'
    },
    list_btn: {
        ...padding(0, 12),
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line_container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1,
        ...padding(8),
        alignItems: 'center',
    },
    border: {
        borderBottomWidth: 1,
        borderColor:'rgba(0, 0, 0, 0.2)'
    },
});

export default s;
