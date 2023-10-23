import {View} from "react-native";
import s from "../../screens/Home/Location/style";
import {padding} from "../../resources";
import {Button, Icon, Text} from "../../core";
import React from "react";

export const CustomCallout = ({
                                  item,
                              }) => {

    return (
        <View style={[s.callout]}>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                ...padding(16),
                columnGap: 10,
            }}>
                <Icon type={'Mark'}
                      size={14}
                      fill={item.free_spaces_count > 0 ? '#67E0D4' : '#F4909E'}/>
                <Text numberOfLines={1}>
                    Region name {item.airfield_name}
                </Text>
            </View>
            <View style={{alignItems: 'center', ...padding(0, 0, 16, 0),}}>
                <Text numberOfLines={1}>
                    Free space count is {item.free_spaces_count}
                </Text>
            </View>
        </View>
    )
}
