import React, {useEffect, useState} from "react";
import {FlatList, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Text} from "../index";
import ArrowDown from './arrow-down.svg'
import X from './x.svg'
import s from './style'

const DropDown = ({
                      variant = "",
                      label = () => {
                      },
                      value,
                      icon = <ArrowDown/>,
                      data = [],
                      renderItem = () => {
                      },
                      btnStyle = {},
                      itemStyles = {},
                      activeStyles = {},
                      onChange = () => {
                      },
                      placeholder = '',
                      name,
                  }) => {
    const [selected, setSelected] = useState(value);
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        setSelected(value);
    }, [value]);

    return (
        <>
            <Button
                style={[s['btn_' + variant], btnStyle]}
                onPress={() => {
                    setVisibility(true)
                }}
            >
                <Text size={"16_400"}
                      style={[s.btn_text]}
                >
                    {selected ? label(selected) : placeholder}
                </Text>
                {icon}
            </Button>

            <Modal visible={visibility}
                   animationType="slide"
                   transparent={true}
            >
                <TouchableOpacity style={[s.container]}
                                  activeOpacity={1}
                                  onPress={() => {
                                      setVisibility(false)
                                  }}>
                    <View style={s.block}>
                        <View style={s.top}>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity onPress={() => {
                                setVisibility(false)
                            }}>
                                <X/>
                            </TouchableOpacity>
                        </View>
                        <FlatList data={data}
                                  contentContainerStyle={s.scroll}
                                  renderItem={({item, index, separators}) => (
                                      <TouchableOpacity
                                          key={index}
                                          onPress={() => {
                                              setVisibility(false)
                                              setSelected({...item, index})
                                              onChange({value: item, name})
                                          }}
                                          style={[
                                              s.item,
                                              {
                                                  backgroundColor: selected?.index === index ? 'rgba(0,0,0,.4)' : 'white'
                                              },
                                              selected?.index === index && activeStyles,
                                              itemStyles
                                          ]}
                                          onShowUnderlay={separators.highlight}
                                          onHideUnderlay={separators.unhighlight}
                                      >
                                          {renderItem({item, index, separators, isSelected: selected?.index === index})}
                                      </TouchableOpacity>
                                  )}/>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};


export default DropDown;
