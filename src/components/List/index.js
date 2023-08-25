import React, { forwardRef } from "react";
import s from "./style";
import { View } from "react-native";
import { Button, Icon, Text } from "../../core";

export const List = forwardRef(({
                                  icon,
                                  label = "",
                                  rightRenderer = null,
                                  onPress = () => {
                                  },
                                }, ref) => {

  return (
    <Button style={[s.list_container, { borderBottomWidth: 1 }]} onPress={onPress} ref={ref}>
      <View style={s.list_row}>
        {icon}
        <Text size={"12_400"}>{label}</Text>
      </View>
      <View style={s.list_row}>
        {rightRenderer}
        <Icon type={"ChevronRight"} size={22} stroke={"rgba(176, 176, 176, 1)"} />
      </View>
    </Button>
  );
});
