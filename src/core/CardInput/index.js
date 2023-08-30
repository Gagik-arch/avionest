import React, {useCallback, useEffect, useState} from 'react'
import s from './style'
import {Platform, TextInput, View, Text} from "react-native";

const CardInput = ({
                       value = '',
                       placeholder = '',
                       onChange,
                       onFinish,
                       name
                   }) => {
    const [_value, _setValue] = useState(value)

    useEffect(() => {
        _setValue(value)
    }, [value])

    const onTextChange = text => {
        text = text.toLowerCase().replace(/[^0-9]/g, '');
        _setValue(text);
        onChange?.()
        if (text.length === 16) {
            onFinish?.({name, value: text});
        }
    };

    const renderValue = useCallback(() => {
        let result = []

        for (let i = 0; i < 4 * 4; i += 4) {
            result.push(_value.padEnd(16, '*').slice(i, i + 4))
        }
        return result.join(' ');
    }, [_value])

    return (
        <View style={s.container}>
            <View style={s.value_container}>
                <Text style={s.value}>{_value ? renderValue() : placeholder}</Text>
            </View>
            <TextInput value={_value}
                       onChangeText={onTextChange}
                       keyboardType={'numeric'}
                       placeholder={''}
                       style={[s.input]}
                       maxLength={16}
                       placeholderTextColor={'transparent'}
                       caretHidden
                       selectTextOnFocus={false}
                       autoCompleteType={'off'}
                       autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                       selectionColor={'transparent'}
                       underlineColorAndroid={'transparent'}
                       autoCapitalize="none"
                       autoCorrect={false}
            />
        </View>
    )
}

export default CardInput
