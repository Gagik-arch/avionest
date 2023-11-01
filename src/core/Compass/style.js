import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(8),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderWidth: 2,
        borderColor: 'rgba(135,135,135,.35)'
    },
    arrow: {
        // width: '100%',
        height: 16,
        flexDirection: 'row',
    },
    close_icon:{
        position:"absolute",
        top:20,
        right:16,
        zIndex:9
    }
});

export default s;
