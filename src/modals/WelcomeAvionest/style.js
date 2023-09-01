import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    block: {
        ...padding(50),
    },
    text:{
        color:Colors.darkBlue,
        lineHeight:18,
        marginBottom:77,
    }
});

export default s;
