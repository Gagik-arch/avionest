import {StyleSheet} from "react-native";
import {padding} from "../../resources";

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        columnGap: 6,

    },
    round: {
        borderRadius: 50,
        borderWidth: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...padding(2)
    },
    circle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#034168',
        borderRadius: 50,
    },
});

export default s
