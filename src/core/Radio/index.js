import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Text from '../Text'
import s from './style'

const Radio = ({
                   checked = false,
                   name,
                   size = 18,
                   label,
                   children,
                   onChange = () => {
                   },
                   containerStyle = {}
               }) => {
    const [_checked, _setChecked] = useState(checked);

    useEffect(() => {
        _setChecked(checked);
    }, [checked]);

    return (
        <TouchableOpacity style={[s.container, containerStyle]}
                          onPress={() => {
                              _setChecked(!_checked);
                              onChange({checked, name, label});
                          }}>
            <View style={[
                {
                    borderColor: _checked ? "#034168" : "#C5C5C5",
                    width: size, height: size,
                    // backgroundColor: _checked ? "#034168" : "transparent",
                },
                s.round,
            ]}>
                {_checked ? <View style={s.circle}/> : null}
            </View>
            {label && <Text>{label}</Text>}
            {children}
        </TouchableOpacity>
    );
};


export default Radio;
