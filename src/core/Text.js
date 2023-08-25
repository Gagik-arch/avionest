import React, { useContext } from "react";
import * as RN from "react-native";
import { fonts, ThemeContext } from "../resources";
import { themes } from "../resources";
import { useColorScheme } from "react-native";

const Text = ({ children = "", style = {}, size = "14_400", ...props }) => {
  const scheme = useContext(ThemeContext);
  size = size.toLowerCase();

  return (
    <RN.Text style={[fonts[size], {
      fontFamily: "Roboto",
      color: themes[scheme].primaryTextColor,
    }, style]}
             {...props}>
      {children}
    </RN.Text>
  );
};

export default Text;
