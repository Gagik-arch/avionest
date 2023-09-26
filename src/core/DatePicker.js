import React, {useState} from "react";
import {StyleSheet, Platform, View} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Button, Text} from "../core";
import {padding, Colors, margin} from "../resources";
import Icon from "./Icon";

const DatePicker = ({
                        placeholder,
                        onChange = () => {
                        },
                        date ,
                        mode = "date",
                        name,
                        icon = null,
                        variant = 'underlined',
                        style = {},
                        textSize = '"14_500"',
                        textStyle = {},
                        containerStyle = {},
                        requiredMessage = null
                    }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [value, setValue] = useState(date)

    const showDatePicker = () => setDatePickerVisibility(true);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const options = mode === "date" ? {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    } : {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    const text = value?.[mode === "date" ? "toLocaleDateString" : "toLocaleTimeString"]('en-US', options)

    return (
        <View style={[containerStyle, {position: "relative"}]}>
            <Button
                onPress={showDatePicker}
                style={[s.button, style]}
                variant={variant}
            >
                <Text size={textSize}
                      style={[{
                          color: Colors.darkGray,
                      }, textStyle]}>
                    {text || placeholder}
                </Text>
                {icon}
                {/*{icon || <Icon type={"ChevronDown"} size={20} />}*/}

            </Button>
            {requiredMessage && <Text size={"12_500"}
                                      style={[s.error]}
            >
                {requiredMessage}
            </Text>}
            {isDatePickerVisible ? (
                <DateTimePicker
                    mode={mode}
                    value={date || new Date()}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={({nativeEvent, type}) => {
                        hideDatePicker();
                        if (type === "set") {
                            setValue(new Date(nativeEvent.timestamp))
                            onChange({value: new Date(nativeEvent.timestamp), name, text});
                        }
                    }}
                />
            ) : null}
        </View>
    );
};

const s = StyleSheet.create({
    button: {
        justifyContent: "space-between",
    },
    error: {
        color: Colors.red,
        ...margin(4, 0, 0, 0),
        // position: 'absolute',
        // top: '100%',
    },
});
export default DatePicker;
