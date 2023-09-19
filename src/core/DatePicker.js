import React, {useState} from "react";
import {StyleSheet, Platform} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Button, Text} from "../core";
import {padding, Colors} from "../resources";
import Icon from "./Icon";

const DatePicker = ({
                        placeholder,
                        onChange = () => {
                        },
                        date,
                        mode = "date",
                        name,
                        children,
                        icon = null,
                        variant = 'underlined',
                        style = {},
                        textSize = '"14_500"',
                        textStyle = {},
                    }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const options = mode === "date" ? {
        year: "numeric",
        month: "short",
        day: "numeric",
    } : {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    return (
        <>
            <Button
                onPress={showDatePicker}
                style={[s.button, style]}
                variant={variant}
            >
                <Text size={textSize}
                      style={[{
                          color: Colors.darkGray,
                      }, textStyle]}>
                    {date?.[mode === "date" ? "toLocaleString" : "toLocaleTimeString"]('en-US', options) || placeholder}
                </Text>
                {icon}
                {/*{icon || <Icon type={"ChevronDown"} size={20} />}*/}
            </Button>

            {isDatePickerVisible ? (
                <DateTimePicker
                    mode={mode}
                    value={date || new Date()}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={({nativeEvent, type}) => {
                        hideDatePicker();
                        if (type === "set") {
                            onChange({value: new Date(nativeEvent.timestamp), name});
                        }
                    }}
                />
            ) : null}
        </>
    );
};

const s = StyleSheet.create({
    button: {
        justifyContent: "space-between",
    },
});
export default DatePicker;
