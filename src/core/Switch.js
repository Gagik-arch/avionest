import React, {useEffect, useLayoutEffect, useState} from "react";
import {
    TouchableOpacity,
    View,
    StyleSheet,
    UIManager,
    LayoutAnimation,
    Platform,
} from "react-native";
import {Colors, padding} from "../resources";

// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }
const Switch = ({
                    onChange,
                    value = false,
                    name,
                    switchActiveStyle = {},
                    switchStyle = {},
                    style = {},
                    activeStyle = {},
                    containerStyle = {},
                    children
                }) => {
    const [active, setActive] = useState(value);

    useLayoutEffect(() => {
        setActive(value)
    }, [value])

    return (
        <TouchableOpacity activeOpacity={1}
                          onPress={() => {
                              setActive(!active);
                              LayoutAnimation.configureNext({
                                  ...LayoutAnimation.Presets.linear,
                                  duration: 90,
                                  springDamping: 0,
                              });
                              onChange?.({
                                  value: !active,
                                  name,
                              });
                          }}
                          style={[{flexDirection: 'row', alignItems: 'center'}, containerStyle]}>
            {typeof children === 'function' ? children({
                value: active,
                name,
            }) : children}
            <View
                style={[
                    s.container,
                    {justifyContent: active ? "flex-end" : "flex-start"},
                    style,
                    active ? (activeStyle || s.container_active) : null,
                ]}>
                <View style={[s.switch, active ? (switchActiveStyle || s.switch_active) : switchStyle]}/>
            </View>
        </TouchableOpacity>
    );
};

const s = StyleSheet.create({
    container: {
        width: 22,
        height: 12,
        borderWidth: 1,
        borderColor: '#034168',
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        overflow: "hidden",
        ...padding(1),
    },
    switch: {
        width: 8,
        height: 8,
        borderRadius: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#034168',
    },
    container_active: {
        // backgroundColor: 'rgba(105, 197, 105, 1)',
        // borderColor: 'rgba(105, 197, 105, 1)',
    },

    switch_active: {
        backgroundColor: "#034168",
    },
});
export default Switch;
