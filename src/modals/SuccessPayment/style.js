import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    block: {
        rowGap: 16
    },
    text: {
        lineHeight: 18,
        marginBottom: 14,
        textAlign: 'center'
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    }
});

export default s;
