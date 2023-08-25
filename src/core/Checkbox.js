import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";

const Checkbox = ({
                    checked = false,
                    name,
                    size = 22,
                    label,
                    children,
                    onChange = () => {
                    },
                  }) => {
  const [_checked, _setChecked] = useState(checked);

  useEffect(() => {
    _setChecked(checked);
  }, [checked]);

  return (
    <TouchableOpacity style={s.container}
                      onPress={() => {
                        _setChecked(!_checked);
                        onChange({ checked, name });
                      }}>
      <View style={[
        {
          borderColor: _checked ? "rgba(105, 197, 105, 1)" : "#C5C5C5",
          width: size, height: size,
          backgroundColor: _checked ? "rgba(105, 197, 105, 1)" : "transparent",
        },
        s.box,
      ]}>
        {_checked ? <Icon type={"Check"} stroke={'white'} size={size - 4} /> : null}
      </View>
      {label}
      {children}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  box: {
    borderRadius: 2,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});


export default Checkbox;
