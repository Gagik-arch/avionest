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
        justifyContent: 'center'
    },
    input: {
        color: 'transparent',
        fontSize: 0,
    },
    error: {
        color: Colors.red,
        ...margin(5, 0),
    },
});

export default s;
