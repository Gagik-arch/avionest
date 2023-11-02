import React, { forwardRef } from "react";
import s from "./style";
import { View } from "react-native";
import { Button, Icon, Text } from "../../core";

export const List = forwardRef(({
                               children,
                                  onPress = () => {
                                  },
                                }, ref) => {

  return (
    <Button style={[s.list_container, { borderBottomWidth: 1 }]} onPress={onPress} ref={ref}>
        {children}
    </Button>
  );
});
