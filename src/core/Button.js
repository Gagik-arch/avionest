import React, { forwardRef, useContext } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { Text } from "./index";
import { Colors, padding, fonts, ThemeContext } from "../resources";
import LinearGradientBG from "./LinearGradientBG";
import { themes } from "../resources";
let a= 0
const Button = forwardRef(({
                             label,
                             style,
                             textStyle = {},
                             textSize = null,
                             variant = "",
                             isLoading = false,
                             children,
                             disabled = false,
                             ...args
                           }, ref) => {
  const scheme = useContext(ThemeContext);
  variant = variant.toLowerCase();

  const s = StyleSheet.create({
    container: {
      alignItems: "center",
      overflow: "hidden",
      flexDirection: "row",
      justifyContent: "center",
      position: "relative",
      borderWidth: 1,
      boxSizing: "border-box",
      ...padding(12),
      backgroundColor: "transparent",
    },
    container_: {
      ...padding(0),
      borderWidth: 0,
      borderRadius: 0,
    },
    container__disabled: {
      ...padding(0),
      borderWidth: 0,
      borderRadius: 0,
      opacity: 0.5,
    },
    container_primary: {
      backgroundColor: Colors.green,
      borderColor: Colors.green,
      fontWeight: 600,
      borderRadius: 4,
    },
    container_primary_disabled: {
      backgroundColor: Colors.lightGray,
      borderColor: Colors.lightGray,
      fontWeight: 600,
      borderRadius: 4,
    },
    container_secondary: {
      borderColor: Colors.orange,
      borderRadius: 4,
    },
    container_secondary_disabled: {
      borderColor: Colors.lightGray,
    },
    container_outlined: {
      borderColor: Colors.lightGray,
      borderRadius: 4,
    },
    container_outlined_disabled: {
      backgroundColor: "white",
      borderColor: Colors.lightGray,
      borderRadius: 4,
    },
    container_link: {
      borderWidth: 0,
      borderRadius: 0,
      ...padding(0),
    },
    label_: {
      color: Colors.black,
      ...fonts["16_400"],
    },
    label_link: {
      color: Colors.orange,
    },
    label_primary: {
      color: Colors.black,
    },
    label_primary_disabled: {
      color: "white",
    },
    label_secondary: {
      color: themes[scheme].primaryTextColor,
    },
    label_secondary_disabled: {
      color: "gray",
    },
    label_outlined: {
      color: Colors.darkGray,
    },
    label_outlined_disabled: {
      color: Colors.darkGray,
    },
    label_gradient: {
      color: "white",
    },
  });

  if (variant === "gradient") {
    return (
      <LinearGradientBG
        degree={80}
        from={{ offset: "0%", color: "rgba(71, 67, 255, 1)" }}
        to={{ offset: "100%", color: "rgba(215,39,72,0.75)" }}
        styles={{ borderRadius: 10 }}>
        <TouchableOpacity ref={ref}
                          disabled={disabled}
                          style={[
                            {
                              ...s.container,
                            },
                            s["container_" + variant],
                            style,
                          ]}
                          {...args}>
          {children || (
            <Text
              size={textSize || undefined}
              style={{
                ...s["label_" + variant],
                ...textStyle,
              }}>
              {label}
            </Text>
          )}
          {isLoading && <ActivityIndicator />}
        </TouchableOpacity>
      </LinearGradientBG>
    );
  }

  return (
    <TouchableOpacity ref={ref}
                      disabled={disabled}
                      style={[
                        s.container,
                        s["container_" + variant + (disabled ? "_disabled" : "")],
                        style,
                      ]}
                      {...args}>
      {children || (
        <Text
          size={textSize || undefined}
          style={[
            s["label_" + variant],
            s["label_" + variant + (disabled ? "_disabled" : "")],
            textStyle,
          ]}>
          {label}
        </Text>
      )}
      {isLoading && <ActivityIndicator color={'#0ebb3f'}  style={{ marginLeft: 10 }} />}
    </TouchableOpacity>
  );


});


export default Button;
