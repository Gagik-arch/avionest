import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TabButton, Icon, Text } from "./index";
import { padding, Colors, ThemeContext } from "../resources";

const NavigationHeader = ({
                            backHandler,
                            buttons = null,
                            style = {},
                            title,
                            ...props
                          }) => {

  return (
    <View style={[s.container, style]}>
      <View style={{ flex: 1 ,height:'100%',alignItems:"flex-start"}}>
        {backHandler}
      </View>

      <View style={s.title_container}>
        {title || (
          <Text style={s.title} size={"17_500"} numberOfLines={1}>
            {props.route.name}
          </Text>
        )}
      </View>

      <View style={s.buttons}>
        {buttons}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    position: "relative",
    ...padding(16),
  },
  title_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: -1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "black",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  back_btn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
export default NavigationHeader;
