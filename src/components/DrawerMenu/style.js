import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
        alignItems: 'flex-start'
    },
    tab: {
        columnGap:8,
        ...padding(14,0)
    },
    tab_container:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'rgba(201, 201, 201, 0.50)'
    }
});

export default s;
