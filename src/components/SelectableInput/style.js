import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {

    },
    modal_container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent:"flex-end",

    },
    top_container:{
        flexDirection:"row",
        justifyContent:"flex-end",
        ...padding(16)
    },
    block:{
        // flex:0.5,
        flex:1,
        backgroundColor:'white',
        // borderTopRightRadius:20,
        // borderTopLeftRadius:20,
    },
    list:{
        ...padding(16,0),
        borderColor:'rgba(0,0,0,0.2)'
    },
});

export default s;
