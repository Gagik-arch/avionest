import {StyleSheet} from "react-native";
import {Colors, margin, padding} from "../../../resources";

const s = StyleSheet.create({
    container: {
        ...padding(24)
    },
    header: {
        backgroundColor: Colors.darkBlue,
    },
    payment_method: {

    },
    cost_container: {
        alignItems: "flex-end",
        ...padding(24),
    },
});

export default s;
