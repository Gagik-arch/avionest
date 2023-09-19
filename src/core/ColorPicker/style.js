import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../resources";

const s = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        borderBottomWidth:1,
        borderColor:Colors.darkBlue,
        ...padding(16,0)
    },
    block:{
        height:'100%',
        ...padding(16)
    },
    top:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
});

export default s;
