import React, {useCallback, useEffect, useMemo, useState} from 'react'
import s from './style'
import {Animated, Easing, Platform, TextInput, View} from "react-native";
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
    const [focused, setFocused] = useState(true);
    const opacity = useState(new Animated.Value(0))[0];

    useEffect(() => {
        _setValue(value)
    }, [value])

    useEffect(() => {
        if (focused) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true,
                        easing: Easing.ease,
                    }),
                ]),
            ).start();
        } else {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true,
                        easing: Easing.ease,
                    }),
                ]),
            ).stop();
        }
    });

    const onTextChange = text => {
        text = text.toLowerCase().replace(/[^0-9]/g, '');
        _setValue(text);
        onChange?.({name, value: text})
        if (text.length === 16) {
            onFinish?.({name, value: text});
        }
    };

    const isNotValid = useMemo(() => _value && !regexp.test(_value), [_value])

    const renderValue = useCallback(() => {
        if (!_value.length) return ''

        let clearText = _value.replaceAll(' ', '')
        let clearTextArray = clearText.split('')

        for (let i = 5; i < 19; i += 5) {
            if (clearTextArray.join('').length > i - 1) {
                clearTextArray.splice(i - 1, 0, ' ');
            }
        }
        return clearTextArray.join('');
    }, [_value])

    return (
        <View>
            <View style={[s.container, {borderColor: isNotValid ? Colors.red : Colors.darkBlue}]}>
                <TextInput value={renderValue()}
                           onChangeText={onTextChange}
                           keyboardType={'numeric'}
                           placeholder={placeholder}
                           placeholderTextColor={'#787777'}
                           style={{color: isNotValid ? Colors.red : '#787777'}}
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(false)}
                           maxLength={19}
                           selectTextOnFocus={false}
                           autoCompleteType={'off'}
                           autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
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
