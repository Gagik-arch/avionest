import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(90, 52),
    },
    error: {
        color: Colors.red,
        ...margin(4, 0,0,0),
        // position: 'absolute',
        // top: '100%',
    },
});

export default s;
