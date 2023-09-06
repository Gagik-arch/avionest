import React, {useCallback, useEffect, useMemo, useState} from 'react'
import s from './style'
import {Platform, TextInput, View} from "react-native";
import {Colors} from "../../resources";
import Text from '../Text'

const regexp = new RegExp(
    "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$"
)
const CardInput = ({
                       value = '',
                       placeholder = '',
                       onChange,
                       onFinish,
                       name,
                       requiredMessage,
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

    const isNotValid = useMemo(() => _value && !regexp.test(_value), [_value])

    const renderValue = useCallback(() => {
        let result = []

        for (let i = 0; i < 4 * 4; i += 4) {
            result.push(_value.padEnd(16, '*').slice(i, i + 4))
        }
        return result.join(' ');
    }, [_value])

    return (
        <View>
            <View style={[s.container, {borderColor: isNotValid ? Colors.red : Colors.darkBlue}]}>
                <View style={s.value_container}>
                    <Text size={'14_400'}
                        style={{color: isNotValid ? Colors.red : '#787777'}}>
                        {_value ? renderValue() : placeholder}
                    </Text>
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
            {isNotValid ? <Text size={"14_400"}
                                style={s.error}
                >Please enter a valid card number.
                </Text> :
                requiredMessage && <Text size={"14_400"}
                                         style={[s.error, {position: 'absolute', top: '100%'}]}>
                    {requiredMessage}
                </Text>}
        </View>
    )
}

export default CardInput
