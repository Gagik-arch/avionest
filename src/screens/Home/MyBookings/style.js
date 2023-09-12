import {StyleSheet} from "react-native";
import {Colors, padding, margin} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(24),
    },
    header_container: {
        backgroundColor: Colors.darkBlue
    },
    top: {
        backgroundColor: Colors.darkBlue,
        ...margin(8, 0, 0, 0),
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...padding(10, 24)
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 14,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        ...padding(10,0),

    },
});

export default s;
