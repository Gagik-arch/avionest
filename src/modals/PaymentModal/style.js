import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    block: {
        // ...padding(50),
        borderRadius: 27,
        backgroundColor: 'white',
        borderWidth: 1,
    },
    title: {
        textAlign: 'center',
        marginBottom: 25,
        ...padding(24, 54, 0, 54)
    },
    btn_container: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#00000040'
    },
    btn: {
        flex: 1,
        ...padding(14, 0)
    },
    divider: {
        width: 1,
        backgroundColor: '#00000040'
    },
    subtitle: {
        ...padding(12, 54, 24, 54)
    },
    btn_text: {
        color: Colors.darkBlue
    },
});

export default s;
