import React, {forwardRef} from "react";
import {ActivityIndicator, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {Text} from "./index";
import {Colors, padding, fonts, ThemeContext} from "../resources";
import LinearGradientBG from "./LinearGradientBG";
import {themes} from "../resources";

const Button = forwardRef(({
                               label,
                               style,
                               labelStyle = {},
                               labelSize = undefined,
                               variant = "",
                               isLoading = false,
                               children,
                               disabled = false,
                               onPress = () => {
                               },
                               onDisabled = () => {
                               },
                               ...args
                           }, ref) => {
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
            backgroundColor: Colors.darkBlue,
            borderColor: Colors.darkBlue,
            borderRadius: 50,
            ...padding(18, 36),
        },
        container_primary_disabled: {
            backgroundColor: '#DADADA',
            borderColor: '#DADADA',
            borderRadius: 50,
            ...padding(18, 36),
        },
        container_secondary: {
            ...padding(18, 36),
            backgroundColor: 'rgba(255, 255, 255, 0.50)',
            borderColor: 'rgba(255, 255, 255, 0.50)',
            borderRadius: 50,
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
            borderColor: Colors.darkGray,
            borderRadius: 4,
        },
        container_underlined: {
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: Colors.darkBlue,
            ...padding(18, 0),
        },
        container_underlined_disabled: {
            backgroundColor: "white",
            borderColor: Colors.darkGray,
            ...padding(18, 0),
        },
        container_link: {
            borderWidth: 0,
            borderRadius: 0,
            ...padding(0),
            borderBottomWidth: 1,
            borderColor: Colors.darkBlue
        },
        label_: {
            color: Colors.black,
        },
        label_link: {
            color: Colors.darkBlue,
            ...fonts["16_400"],
        },
        label_primary: {
            color: 'white',
            ...fonts["16_400"],

        },
        label_primary_disabled: {
            color: "white",
            ...fonts["16_400"],
        },
        label_secondary: {
            color: 'white',
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
        label_underlined: {
            color: Colors.darkGray,
        },
        label_underlined_disabled: {
            color: Colors.lightGray,
        },
        label_gradient: {
            color: "white",
        },
    });

    if (variant === "gradient") {
        return (
            <LinearGradientBG
                degree={80}
                from={{offset: "0%", color: "rgba(71, 67, 255, 1)"}}
                to={{offset: "100%", color: "rgba(215,39,72,0.75)"}}
                styles={{borderRadius: 10}}>
                <TouchableOpacity ref={ref}
                                  style={[
                                      {
                                          ...s.container,
                                      },
                                      s["container_" + variant],
                                      style,
                                  ]}
                                  onPress={() => {
                                      if (disabled) {
                                          onDisabled()
                                      } else {
                                          onPress()
                                      }
                                  }}
                                  {...args}>
                    {children || (
                        <Text
                            size={labelSize }
                            style={{
                                ...s["label_" + variant],
                                ...labelStyle,
                            }}>
                            {label}
                        </Text>
                    )}
                    {isLoading && <ActivityIndicator/>}
                </TouchableOpacity>
            </LinearGradientBG>
        );
    }

    return (
        <TouchableOpacity ref={ref}
                          style={[
                              s.container,
                              s["container_" + variant + (disabled ? "_disabled" : "")],
                              style,
                          ]}
                          onPress={() => {
                              if (disabled) {
                                  onDisabled()
                              } else {
                                  onPress()
                              }
                          }}
                          {...args}>
            {children || (
                <Text size={labelSize }
                      style={[
                          s["label_" + variant + (disabled ? "_disabled" : "")],
                          labelStyle,
                      ]}>
                    {label}
                </Text>
            )}
            {isLoading && <ActivityIndicator color={'# '} style={{marginLeft: 10}}/>}
        </TouchableOpacity>
    );


});


export default Button;
