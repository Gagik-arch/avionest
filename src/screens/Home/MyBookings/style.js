import {StyleSheet} from "react-native";
import {Colors, padding, margin} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(24),
        rowGap: 16
    },
    top: {
        backgroundColor: Colors.darkBlue,
        ...margin(8, 0, 0, 0),
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...padding(18, 24)
    },
    list_container: {
        columnGap: 14,
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        ...padding(16, 0),
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor: 'white',
        rowGap:16,
    },
    list_top: {
        flexDirection: "row",
        ...padding(0,16),
        columnGap:16

    },
    list_bottom: {
        ...padding(10,16,0,16),
        borderTopWidth:1,
        borderColor:'#EFEFF4',
    },
});

export default s;
