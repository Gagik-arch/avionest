import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Platform,
} from "react-native";
import { Colors, padding } from "../resources";

// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }
const Switch = ({
                  onChange = () => {
                  },
                  value = false,
                  name,
                }) => {
  const [active, setActive] = useState(value);

  useLayoutEffect(()=>{
    setActive(value)
  },[value])

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setActive(!active);
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.linear,
          duration: 90,
          springDamping: 0,
        });
        onChange({
          value: !active,
          name,
        });
      }}
      style={[
        s.container,
        { justifyContent: active ? "flex-end" : "flex-start" },
        active ? s.container_active : null,
      ]}>
      <View style={[s.switch, active && s.switch_active]} />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderWidth: 1,
    borderColor: 'rgba(205, 205, 205, 1)',
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(205, 205, 205, 1)",
    overflow: "hidden",
    ...padding(2),
  },
  switch: {
    width: 18,
    height: 18,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  container_active: {
    backgroundColor: 'rgba(105, 197, 105, 1)',
    borderColor: 'rgba(105, 197, 105, 1)',
  },

  switch_active: {
    backgroundColor: "white",
  },
});
export default Switch;
