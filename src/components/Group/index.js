import React, { useContext } from "react";
import {Button, Icon, Text} from "../../core";
import s from "./style";
import {View} from "react-native";
import { ThemeContext, themes } from "../../resources";

export const Group = ({data = [],
                          containerStyle = {},
                          rightRenderer = null,
                          btnStyle={}}) => {
  const scheme = useContext(ThemeContext);

    return (
        <View style={[s.container, containerStyle]}>
            {
                data.map((item, index) => {
                    return (
                        <Button key={index}
                                onPress={item.onPress}
                                style={[s.list_btn,btnStyle]}>
                            {item.icon && <Icon type={item.icon} fill={themes[scheme].primaryTextColor} size={14}/>}
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

