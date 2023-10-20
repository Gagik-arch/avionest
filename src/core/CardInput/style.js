import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
    },
    value_container: {
        position: "absolute",
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flexDirection:'row'
    },

    error: {
        color: Colors.red,
        ...margin(5, 0),
    },
    cursor: {
        height: 2,
        backgroundColor: '#69C569',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
});

export default s;
