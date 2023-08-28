import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        // ...padding(16),
    },
    pagerView: {
        flex: 1,
    },
    bg: {
        justifyContent: 'flex-end',
        rowGap: 38,
        alignItems: 'center',
        ...padding(0,16),
    },
    dots: {
        flexDirection: 'row',
        columnGap: 10,
        ...padding(35, 0),
        justifyContent: 'center'
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5
    }
});

export default s;
