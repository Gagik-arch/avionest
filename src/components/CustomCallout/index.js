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
            <View style={{flexDirection: "row",
                justifyContent: "center",
                ...padding(16),
                columnGap:10,
            }}>
                <Icon type={'Mark'}
                      size={14}
                      fill={item.free_spaces_count > 0 ? '#67E0D4' : '#F4909E'}/>
                <Text numberOfLines={1}>
                    Region name {item.airfield_name}
                </Text>
            </View>
            <View style={{alignItems: 'center', ...padding(0, 0, 16, 0),}}>
                <Text numberOfLines={1}
                >
                    Free space count is {item.free_spaces_count}
                </Text>
            </View>
            <View style={s.callout_footer}>
                <Button label={'Cancel'} style={s.callout_footer_btn}
                        labelStyle={s.callout_footer_btn_text}
                        labelSize={'14_400'}
                        onPress={() => {
                            console.log(1)
                        }}
                />
                <View style={{width: 1, backgroundColor: '#00000040'}}/>
                <Button label={'Next'}
                        style={s.callout_footer_btn}
                        labelSize={'14_400'}
                        labelStyle={s.callout_footer_btn_text}
                        onPress={() => {
                            console.log(2)
                        }}
                />
            </View>
        </View>
    )
}
