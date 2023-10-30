import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        height:'100%'
    },
    arrow:{
        width:'100%',
        height:16,
        backgroundColor:'red',
    },
});

export default s;
