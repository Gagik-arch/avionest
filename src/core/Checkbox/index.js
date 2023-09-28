import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Text from '../Text'
import Check from './check.svg'

const Checkbox = ({
                      checked = false,
                      name,
                      size = 22,
                      label,
                      children,
                      onChange = () => {
                      },
                      containerStyle = {},
                      labelStyle = {}
                  }) => {
    const [_checked, _setChecked] = useState(checked);

    useEffect(() => {
        _setChecked(checked);
    }, [checked]);

    return (
        <TouchableOpacity style={[s.container, containerStyle]}
                          onPress={() => {
                              _setChecked(!_checked);
                              onChange({value: !_checked, name});
                          }}>
            <View style={[
                {
                    borderColor: _checked ? "#034168" : "#C5C5C5",
                    width: size, height: size,
                    backgroundColor: _checked ? "#034168" : "transparent",
                },
                s.box,
            ]}>
                {_checked ? <Check stroke={'white'} width={size - 4}/> : null}
            </View>
            {label && <Text style={labelStyle}>{label}</Text>}
            {children}
        </TouchableOpacity>
    );
};

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        columnGap: 6
    },
    box: {
        borderRadius: 2,
        borderWidth: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});


export default Checkbox;
