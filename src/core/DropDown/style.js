import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    btn_: {
        justifyContent: "space-between",
    },
    btn_underlined: {
        borderBottomWidth: 1,
        borderColor: '#034168',
        ...padding(18,0)
    },
    btn_text: {
        color: "rgba(136, 136, 136, 1)",
        flex:1,

    },
    container:{
        justifyContent:'flex-end',
        flex:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    top:{
        flexDirection:'row',
        justifyContent:"space-between",
        ...padding(16)
    },
    block: {
        flex:0.5,
        backgroundColor:"white",
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    scroll:{
        ...padding(0,16,16,16)
    },
    item:{
        ...padding(6),
    },
    error: {
        color: Colors.red,
        ...margin(4, 0,0,0),
    },
});

export  default s
