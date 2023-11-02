import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    background: {
        // borderWidth: 1,
        // borderColor:`rgba(0,0,0,.08)`
    },
    container: {
        flex: 1,
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn: {
        borderColor: '#EBEBEB',
        justifyContent: "space-between",
    },
});

export default s;
