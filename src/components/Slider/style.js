import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../resources";

const s = StyleSheet.create({
    pager_view_container:{
        position: 'relative'
    },
    pager_view: {
        flex: 1,
        height: 220,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    slider_markers: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 4,
        width: '100%',
        ...padding(0, 9),
        columnGap: 4,
    },
    marker: {
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
        height: 4,
        flex: 1,
        borderRadius: 4
    },
});

export default s;
