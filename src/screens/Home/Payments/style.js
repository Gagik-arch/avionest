import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
        alignItems: 'flex-start'
    },
    card_number: {
        color: Colors.blue
    },
    container_list: {
        justifyContent: 'space-between',
        ...padding(15, 17, 15, 60),
        backgroundColor:"#fff"
    },
    block_list: {
        flexDirection: 'row',
        columnGap: 40,
    },
    swipeable_btn: {
        justifyContent: 'center',
        height: '100%',
        ...padding(0, 8)
    },
    swipe_container: {
        flexDirection: "row",
        // columnGap: 16,
    },
});

export default s;
