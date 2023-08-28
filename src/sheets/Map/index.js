import { forwardRef,  useEffect, useMemo, useState } from "react";
import s from "./style";
import { Icon, Screen, Text, Button, Checkbox } from "../../core";
import { View, Animated, Easing } from "react-native";
import global from "../../styles/global";
import { Colors, margin, padding, ThemeContext, themes } from "../../resources";
import { Group } from "../../components";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export const Map = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "100%"], []);
  const [sheetIsOnTop, setSheetIsOnTop] = useState(undefined);

  const group1 = [
    {
      icon: "CirclePlusBlack",
      label: "Add to favorites",
      onPress: () => {
      },
    },
    {
      icon: "Store",
      label: "View Store",
      onPress: () => {
        // props.navigation.navigate("Settings");
      },
    },
  ];

  return (
    <BottomSheet
      backgroundComponent={(p) => <BottomSheetBackground
                                                         sheetIsOnTop={sheetIsOnTop}
                                                         {...p}
      />}
      ref={ref}
      handleIndicatorStyle={{}}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      onChange={(r) => {
        if (r === 2) {
          setSheetIsOnTop(r);
        } else {
          setSheetIsOnTop(undefined);
        }
      }}
    >
      <View style={s.container}>
        <BottomSheetScrollView contentContainerStyle={{ ...padding(16) }}>
          <View style={s.top}>
            <Text style={global.app_title}>Javier`s Fruit Stand</Text>
            <Button>
              <Icon type={"CircleClose"} size={18} stroke={Colors.green} />
            </Button>
          </View>
          <Text style={{ color: Colors.gray }}>2.2 miles away</Text>
          <Text style={s.description}>Description</Text>
          <Text style={[global.app_subtitle]}>Address</Text>
          <Text style={{ color: Colors.gray }}>2812 Cutler Avenue</Text>
          <Text style={{ color: Colors.gray }}>Fremont, California</Text>
          <Text style={{ color: Colors.gray }}>United States of America</Text>
          <Group data={group1}
                 containerStyle={s.group_container}
          />
          <Text style={[global.app_subtitle, { ...margin(0, 0, 20, 0) }]}>Items</Text>
          <View style={{ rowGap: 16 }}>
            {
              renderList({
                image: null,
                name: "Strawberries",
                quantity: 12,
                cost: 5,
              })
            }
            {
              renderList({
                image: null,
                name: "Strawberries",
                quantity: 12,
                cost: 5,
              })
            }
            {
              renderList({
                image: null,
                name: "Strawberries",
                quantity: 12,
                cost: 5,
              })
            }
          </View>
          <Text style={[global.app_subtitle, { ...margin(20, 0) }]}>Offers</Text>
          <View style={{ rowGap: 16 }}>
            {renderOfferList({
              name: "Strawberries",
              percentage: 12,
            })}
            {renderOfferList({
              name: "Strawberries",
              percentage: 12,
            })}
          </View>
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
});


const renderList = ({
                      image,
                      name,
                      quantity,
                      cost,
                    }) => {

  return (
    <Animated.View style={s.list_container}>
      {image ? <Image source={image} style={s.image} /> : <View style={s.image} />}
      <View>
        <Text size={"14_400"}>{name}</Text>
        <Text size={"12_400"}
              style={{ color: "rgba(136, 136, 136, 1)" }}
        >
          Quantity: {quantity} Cost: ${cost}
        </Text>
      </View>
    </Animated.View>
  );
};

const renderOfferList = ({
                           name,
                           percentage = 0,
                         }) => {

  return (
    <View style={[s.list_container, { justifyContent: "space-between" }]}>
      <Text size={"16_400"}>{percentage}% Off {name}</Text>
      <Checkbox />
    </View>
  );
};

const BottomSheetBackground = ({ sheetIsOnTop, scheme, style }) => {
  const border = useState(new Animated.Value(0))[0];

  useEffect(()=>{
    Animated.timing(border, {
      toValue: sheetIsOnTop === 2 ? 0 : 20,
      duration: 120,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  },[])

  return (
    <Animated.View
      style={[
        s.background,
        {
          backgroundColor: themes[scheme].backgroundColor,
          borderTopLeftRadius: sheetIsOnTop === 2 ? 0 : 20,
          borderTopRightRadius: sheetIsOnTop === 2 ? 0 : 20,
        },
        style,
      ]}
    />
  );
};
