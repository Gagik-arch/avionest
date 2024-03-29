import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(70, 52),
    },
    grid: {
        flexDirection: "row",
        marginBottom: 40
    },
    column: {
        flex: 1,
        rowGap: 9
    },
    row:{
        flexDirection:'row',
        columnGap:27
    },
    scan_btn:{
        flexDirection:'row',
        justifyContent:'flex-start',
        ...margin(13,0,50,0)
    }
});

export default s;
