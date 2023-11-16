import React, {useEffect, useRef, useState} from "react";
import {TextInput, StyleSheet, View, Animated} from "react-native";
import {Icon, Text, Button} from "./index";
import {Colors, padding, margin} from "../resources";

const doneTypingInterval = 240; //time in ms (260 seconds)

const regex = {
    //min 8 character, 1 number, 1 UPPERCASE, 1 lowercase, 1 special character
    password: {
        validation: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"),
        // validation: new RegExp("^(?=.*[a-z])"),
        errorMessage: "Password must be at least 8 characters long, contains 1 UPPERCASE 1 lowercase 1 special charecter.",
    }, // @, 0 UPPERCASE, only com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)
    email: {
        validation: new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])(?:[A-z])?\\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|mail|ru)\\b"),
        errorMessage: "Invalid email.",
    }, // @, 0 UPPERCASE, only com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)
    phone: {
        validation: new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])(?:[A-z])?\\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|mail|ru)\\b"),
        errorMessage: "Invalid email.",
    }, // @, 0 UPPERCASE, only com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)
    CVV: {
        validation: new RegExp("^[0-9]{3,4}$"),
        errorMessage: "Invalid CVV",
    },
    postalCode: {
        validation: new RegExp("^[0-9]{4,5}?$"), // USPOSTAL CODE
        errorMessage: "Invalid postal code.",
    },
    cardExpiryDate: {
        validation: new RegExp('^\([0-9]{2})\/\([0-9]{2})$'),
        errorMessage: "Invalid expiry date!",
    },
};

const passwordRegexp = {
    upperCase: new RegExp("^(?=.*[A-Z])"),
    specialChar: new RegExp("(?=.*[@$!%*?&])"),
    lowerCase: new RegExp("^(?=.*[a-z])"),
    number: new RegExp("(?=.*\\d)"),
};

const validateField = (fieldName, text) => text?.length ? regex[fieldName].validation.test(text) : true;

const Input = React.forwardRef(({
                                    value,
                                    placeholder,
                                    keyboardType,
                                    containerStyles,
                                    inputStyles,
                                    renderButtons = () => {
                                    },
                                    validationKey,
                                    name,
                                    errorMassage = null,
                                    onChange,
                                    onFinish,
                                    frontIcon = null,
                                    placeholderColor = "#787777",
                                    maxLength,
                                    autoCapitalize = "none",
                                    autoCorrect = true,
                                    returnKeyType,
                                    onSubmitEditing,
                                    focus = false,
                                    disabled = false,
                                    blockStyles = {},
                                    onBlur,
                                    onFocus,
                                    enableIconDivider = false,
                                    numberOfLines = 1,
                                    requiredMessage,
                                    autoFocus = false,
                                    ...props
                                }, ref) => {
    const [visibility, setVisibility] = useState(validationKey === "password");
    const [defaultValue, setDefaultValue] = useState(value);
    const [isValid, setIsValid] = useState(true);
    let typingTimer = useRef();

    useEffect(() => {
        setDefaultValue(value);
    }, [value]);

    // useEffect(() => {
    //   if (validationKey) {
    //      const _isValid = validateField(validationKey, defaultValue);
    //      console.log(_isValid,defaultValue);
    //      setIsValid(_isValid);
    //      onChange && onChange({
    //        text: defaultValue, isValid: _isValid, name,
    //      });
    //   }
    //    onChange && onChange({ text: defaultValue, name });
    //    setIsValid(true);
    // }, []);

    const onTextChange = text => {
        if (keyboardType === "numeric") {
            const numText = text.toLowerCase().replace(/[^0-9]/g, "");
            text = validationKey === "phone" ? `1 (${numText.slice(1, 4)}) ${numText.slice(4)}` : numText;
        }
        if (validationKey === 'cardExpiryDate') {
            text = text.length === 2 ? text + '/' : text
        }
        setDefaultValue(text);

        if (validationKey) {
            // [--- handled when user finished typing >>>

            const _isValid = validateField(validationKey, text);
            setIsValid(_isValid);

            if (onFinish) {
                clearTimeout(typingTimer.current);
                return (typingTimer.current = setTimeout(() => {
                    onFinish({value: text, isValid: _isValid, name});
                }, doneTypingInterval));
            }
            return onChange && onChange({value: text, name, isValid: _isValid});
        }
        // [--- handled when user finished typing >>>
        if (onFinish) {
            clearTimeout(typingTimer.current);
            return (typingTimer.current = setTimeout(() => {
                onFinish({value: text, name});
            }, doneTypingInterval));
        }
        return onChange && onChange({value: text, name});
    };

    const defaultFlow = (<DefaultFlow
        defaultValue={defaultValue}
        setDefaultValue={setDefaultValue}
        validationKey={validationKey}
        isValid={isValid}
        containerStyles={containerStyles}
        onTextChange={onTextChange}
        ref={ref}
        keyboardType={keyboardType}
        visibility={visibility}
        placeholder={placeholder}
        inputStyles={inputStyles}
        setVisibility={setVisibility}
        renderButtons={renderButtons}
        frontIcon={frontIcon}
        placeholderColor={placeholderColor}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        focus={focus}
        disabled={disabled}
        onBlur={onBlur}
        onFocus={onFocus}
        enableIconDivider={enableIconDivider}
        props={props}
        numberOfLines={numberOfLines}
        name={name}
        requiredMessage={requiredMessage}
        autoFocus={autoFocus}
    />);

    return (
        <View style={[{position: 'relative'}, blockStyles]}>
            {defaultFlow}
            {(validationKey && !isValid) ?
                (<Text size={"14_400"} style={s.error}>
                    {errorMassage || regex[validationKey]?.errorMessage}
                </Text>) :
                (requiredMessage && <Text size={"12_500"}
                                          style={[s.error,]}
                    >
                        {requiredMessage}
                    </Text>
                )
            }
            {/*{renderCheck({ isValid, validationKey, errorMassage, defaultValue })}*/}
        </View>
    )
});

const DefaultFlow = React.forwardRef(({
                                          defaultValue,
                                          setDefaultValue,
                                          validationKey,
                                          isValid,
                                          containerStyles,
                                          onTextChange,
                                          keyboardType,
                                          visibility,
                                          placeholder,
                                          inputStyles,
                                          setVisibility,
                                          renderButtons,
                                          frontIcon,
                                          placeholderColor,
                                          maxLength,
                                          autoCapitalize,
                                          autoCorrect,
                                          returnKeyType,
                                          onSubmitEditing,
                                          focus,
                                          disabled = false,
                                          validationRef,
                                          onBlur, onFocus,
                                          enableIconDivider,
                                          numberOfLines,
                                          name,
                                          requiredMessage,
                                          autoFocus,
                                          props,
                                      }, ref) => {


    return (
        <Animated.View
            style={[s.container, {
                borderColor: validationKey ?
                    (
                        defaultValue ? (isValid ? "#034168" : Colors.red) :
                            (requiredMessage ? Colors.red : "#034168")
                    ) :
                    "#034168",
                backgroundColor: disabled ? `rgba(0, 0, 0, 0.1)` : "transparent",
            }, containerStyles]}
        >
            {frontIcon && enableIconDivider ? <View
                style={{
                    paddingRight: 10,
                    borderRightWidth: 1,
                    borderColor: "#fff",
                    marginRight: 10,
                }}>{frontIcon}</View> : frontIcon}
            {/*<View style={{ flex: 1 }}>*/}
            <TextInput
                ref={ref}
                value={defaultValue}
                onChangeText={(e) => {
                    onTextChange(e);
                }}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={visibility}
                style={[s.input, inputStyles, {
                    color: validationKey && !isValid ? Colors.red : "rgba(136, 136, 136, 1)",
                    textAlignVertical: numberOfLines > 1 ? "top" : "center",
                }]}
                placeholderTextColor={placeholderColor}
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                focus={focus}
                editable={!disabled}
                onBlur={e => onBlur && onBlur({e, name})}
                onFocus={e => onFocus && onFocus({e, name})}
                multiline={numberOfLines > 1}
                numberOfLines={numberOfLines}
                {...props}
            />
            {/*</View>*/}
            {renderButtons && renderButtons({value: defaultValue, setValue: setDefaultValue})}
            {validationKey === "password" ? (<Button onPress={() => setVisibility(!visibility)}>
                <Icon
                    type={visibility ? "EyeOff" : "Eye"
                    }
                    size={20}
                    color={defaultValue ? '#787777' : '#787777'}
                />
            </Button>) : null}
        </Animated.View>);
});
const renderCheck = ({isValid, validationKey, errorMassage, defaultValue}) => {
    return !isValid && (validationKey === "password" ? (
            <View style={s.check_container}>
                <View style={[s.row]}>
                    {/*<Icon type={"CircleCheck"} style={{marginRight: 8}}/>*/}
                    <Text style={{color: "#B9B9B9"}}>At leaset 6 Characters</Text>
                </View>
                <View style={[s.row]}>
                    {Object.values(passwordRegexp).map((item, index) => item.test(defaultValue)).sort((a, b) => b - 1).map((item, index) => {
                        return <View style={[s.cell, {backgroundColor: item ? "#6F4FF8" : "#322581"}]} key={index}/>;
                    })}
                    <Text style={{marginLeft: 6, color: "#B9B9B9"}}>Strong</Text>
                </View>
            </View>) : <Text size={"12_400"} style={s.error}>
            {errorMassage || regex[validationKey]?.errorMessage}
        </Text>
    );
};

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        boxSizing: "border-box",
        borderRadius: 0,
        width: "100%",
        ...padding(10, 0),
        //
    },
    input: {
        fontSize: 14, fontWeight: "400", color: "white", padding: 4, flex: 1,
    },
    error: {
        color: Colors.red,
        ...margin(4, 0, 0, 0),
    },
    check_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...margin(11, 0),
    },
    cell: {
        width: 22, height: 4, marginHorizontal: 4, borderRadius: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Input;
