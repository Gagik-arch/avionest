import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(90,52),
    },

    column:{
        flex:1,
        rowGap:9
    },
});

export default s;
