import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    btn:{
        borderColor: '#EBEBEB',
        justifyContent: "space-between",
    },
    modal_container: {
        flex: 1,
        height: '100%',
    },
    input_container: {
        borderColor: '#EBEBEB',
        borderWidth:1,
        borderRadius:4,
        justifyContent: "space-between",
        flex: 1,
        ...padding(0,12)
    },
    placeholder: {
        color: '#787777'
    },
    top_container: {
        flexDirection: 'row',
        ...padding(6, 12),
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:'rgba(135,135,135,.5)'
    },
    close_btn:{
        ...padding(0,12)
    },
    block:{
        flex:1
    },
    list:{
        ...padding(18,0),
        borderColor:'rgba(0,0,0,0.2)',
        flexDirection:"row",
        justifyContent:'space-between'
    },
});

export default s;
