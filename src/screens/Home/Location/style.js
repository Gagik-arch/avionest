import { StyleSheet } from "react-native";
import { Colors, margin, padding } from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(16),
    },
    header:{
        backgroundColor:Colors.darkBlue,
    },
    top:{
        flexDirection:'row',
    },
    top_btn:{
        flex:1,
      ...padding(14,12),
        columnGap:8
    },
    divider:{
width:1,
        backgroundColor:'#D9D9D9'
    }
});

export default s;
