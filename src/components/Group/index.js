import React from "react";
import {Button, Icon, Text} from "../../core";
import s from "./style";
import {View} from "react-native";

export const Group = ({data = [],
                          containerStyle = {},
                          rightRenderer = null,
                          btnStyle={}}) => {

    return (
        <View style={[s.container, containerStyle]}>
            {
                data.map((item, index) => {
                    return (
                        <Button key={index}
                                onPress={item.onPress}
                                style={[s.list_btn,btnStyle]}>
                            {item.icon && <Icon type={item.icon}  size={14}/>}
                            <View style={[s.line_container, index < data.length - 1 ? [s.border] : null]}>
                                <Text> {item.label}</Text>
                                {rightRenderer?.()  }
                            </View>
                        </Button>
                    )
                })
            }
        </View>
    );
};

