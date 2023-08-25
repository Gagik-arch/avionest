import React, { useEffect, useState } from "react";
import { StyleSheet,  TouchableOpacity } from "react-native";
import { Button, Text } from "../core";
import Icon from "./Icon";
// import { Popover, usePopover } from "react-native-modal-popover";

const DropDown = ({
                    variant = "outlined",
                    label = () => {
                    },
                    children,
                    value,
                    icon = null,
                    data = [],
                    renderItem = () => {
                    },
  btnStyle={},
                    onChange = () => {
                    },
  name
                  }) => {
  // const {
  //   openPopover,
  //   closePopover,
  //   popoverVisible,
  //   touchableRef,
  //   popoverAnchorRect,
  // } = usePopover();
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, []);

  return (
    <><Text>DropDown</Text>
      {/*<Button*/}
      {/*  ref={touchableRef}*/}
      {/*  variant={variant}*/}
      {/*  style={[s.btn,btnStyle]}*/}
      {/*  onPress={() => openPopover()}*/}
      {/*>*/}
      {/*  {selected ? <Text size={"16_400"} style={[s.btn_text]}>{label(selected)}</Text> :*/}
      {/*    (children || <Text size={"16_400"} style={[s.btn_text]}>{label(selected)}</Text>)}*/}
      {/*  {icon || <Icon type={"ChevronDown"} size={20} />}*/}
      {/*</Button>*/}

      {/*<Popover*/}
      {/*  contentStyle={s.content}*/}
      {/*  backgroundStyle={s.background}*/}
      {/*  visible={popoverVisible}*/}
      {/*  onClose={closePopover}*/}
      {/*  fromRect={popoverAnchorRect}*/}
      {/*  supportedOrientations={["portrait", "landscape"]}*/}
      {/*  placement={"auto"}*/}
      {/*  duration={190}*/}
      {/*  useNativeDriver={true}*/}
      {/*>*/}
      {/*  {data.map((item, index) => {*/}
      {/*    return (*/}
      {/*      <TouchableOpacity style={s.item}*/}
      {/*                        key={index}*/}
      {/*                        onPress={() => {*/}
      {/*                          setSelected(item);*/}
      {/*                          closePopover();*/}
      {/*                          onChange({ value:item,name })*/}
      {/*                        }*/}
      {/*                        }>*/}
      {/*        {renderItem(item, index)}*/}
      {/*      </TouchableOpacity>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Popover>*/}
    </>
  );
};

const s = StyleSheet.create({
  btn: {
    justifyContent: "space-between",
  },
  btn_text: {
    color: "rgba(136, 136, 136, 1)",
  },
  item: {},
});
export default DropDown;
