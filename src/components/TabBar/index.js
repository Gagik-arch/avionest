import React, { useContext } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import s from "./style";
import { Icon } from "../../core";
import { ThemeContext, themes } from "../../resources";

export const TabBar = ({ state, descriptors, navigation }) => {
  const scheme = useContext(ThemeContext);

  return (
    <View style={[s.container, { backgroundColor: themes[scheme].backgroundColor }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        let icon = "";
        let type = "Normal";
        switch (route.name) {
          case "Store":
            icon = "Home";
            break;
          case "Location":
            icon = "Location";
            break;
          case "Payment":
            icon = "Payment";
            break;
          case "Favorite":
            icon = "Favorite";
            break;
          case "User":
            icon = "UserCircle";
            break;
          default:
            break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={icon}
            type={type}
            selected={isFocused}
            label={route.name}
            scheme={scheme}
          />
        );
      })}
    </View>
  );
};
const TabBarButton = ({
                        icon,
                        accessibilityRole,
                        accessibilityState,
                        accessibilityLabel,
                        onPress,
                        onLongPress,
                        selected,
                        scheme,
                        label,
                      }) => {
  return (
    <TouchableOpacity
      style={s.tab}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      onPress={e => onPress(e)}
      onLongPress={onLongPress}>
      <Icon
        type={icon}
        width={28}
        height={28}
        fill={selected ? 'rgba(105, 197, 105, 1)' : (themes[scheme].primaryTextColor)}
      />
      {/*<Text style={[s.label,{*/}
      {/*  // color:selected ? Colors.blue : Colors.darkGray*/}
      {/*}]}*/}
      {/*      size={"10_600"}*/}
      {/*>*/}
      {/*  {label.charAt(0).toUpperCase() + label.slice(1)}*/}
      {/*</Text>*/}
    </TouchableOpacity>
  );
};
