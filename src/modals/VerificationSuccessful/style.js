import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16, 50),
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        lineHeight: 18,
        marginBottom: 14,
        textAlign: 'center'
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        ...margin(30,0,53,0)
    }
});

export default s;
