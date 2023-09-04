import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
        flex:1
    },
    block: {
        ...padding(50),
    },
    text:{
        lineHeight:18,
        marginBottom:14,
        textAlign:'center'
    },
    top:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
});

export default s;
