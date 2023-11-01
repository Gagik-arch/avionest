import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
    },
    header: {
        backgroundColor: Colors.darkBlue,
    },
    breadcrumbs: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 7,
        ...padding(16, 20)
    },
    list_container: {
        ...padding(19),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        justifyContent:"space-between",
    },
    name:{
        color:Colors.darkBlue,
    },
    runway_container:{
        position:'relative'
    },
    runway_add_btn:{
        position:'absolute',
        bottom:10,
        right:0,
    },
});

export default s;
