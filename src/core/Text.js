import React from "react";
import * as RN from "react-native";
import {fonts} from "../resources";

const Text = ({children = "", style = {}, size = "12_400", ...props}) => {
    size = size.toLowerCase();

    return (
        <RN.Text style={[fonts[size], {
            fontFamily: "Roboto",
            color: '#030303'
        }, style]}
                 {...props}
        >
            {children}
        </RN.Text>
    );
};

export default Text;
