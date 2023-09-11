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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#99999926',
    },
    block_list: {
        flexDirection: 'row',
        columnGap: 40,
    },
});

export default s;
