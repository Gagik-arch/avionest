import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    bg: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'transparent',
        ...padding(0,0,95,0),
        rowGap: 16,
    },
    block:{
        rowGap:20
    }
});

export default s;
