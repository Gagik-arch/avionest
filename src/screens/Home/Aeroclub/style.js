import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
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
        borderColor: 'rgba(0, 0, 0, 0.15)'
    },
    name:{
        color:Colors.darkBlue
    }
});

export default s;
