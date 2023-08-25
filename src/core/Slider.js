import React from 'react'
import { View, StyleSheet } from "react-native";
import { Text } from "./index";

const Slider = ({ text, length, backgroundStyle = {}, sliderStyle = {} }) => {

    return <View style={[s.container, backgroundStyle]}>
        <View style={[
            s.slide,
            sliderStyle,
            {
                width: length + '%',
            }
        ]} />
        <Text size={'bold12'} style={s.text}>{text}</Text>
    </View>
}


const s = StyleSheet.create({
    container: {
        position: "relative",
        flexDirection: 'row',
        height: 30,
        borderRadius: 100,
        overflow: "hidden",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    slide: {
        position: "absolute",
        left: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        zIndex: 1,
        borderRadius: 100,
    },
    slide_dark: {
        backgroundColor: "rgba(255, 255, 255, 0.4) ",
    },
    slide_light: {
        backgroundColor: "black",
    },
    text: {
        color: 'white',
        zIndex: 2
    }
})

export default Slider