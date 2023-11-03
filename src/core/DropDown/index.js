import React, {useEffect, useMemo, useState} from "react";
import {FlatList, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Text} from "../index";
import ArrowDown from './arrow-down.svg'
import X from './x.svg'
import s from './style'

const DropDown = ({
                      variant = "",
                      label = () => {
                      },
                      defaultSelectedIndex,
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
                      requiredMessage,
                      frontIcon,
                      btnTextStyle,
                  }) => {
    const [selected, setSelected] = useState(null);
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (typeof defaultSelectedIndex === 'number' ) {
            setSelected({value: data[defaultSelectedIndex], index: defaultSelectedIndex});
        }
    }, [defaultSelectedIndex]);

    const _selected = useMemo(()=>label(selected) ,[selected])

    return (
        <View style={[{position: 'relative'}]}>
            <Button
                style={[s['btn_' + variant], btnStyle]}
                onPress={() => {
                    setVisibility(true)
                }}
            >
                {typeof frontIcon === 'function' && frontIcon(selected)}
                { _selected ? (typeof _selected === 'string' ? <Text size={"14_400"}
                                                             style={[s.btn_text, btnTextStyle]}
                >
                    {selected ? _selected : placeholder}
                </Text> : _selected): <Text size={"14_400"}
                                            style={[s.btn_text, btnTextStyle]}>{placeholder}</Text>}
                {icon}
            </Button>
            {(requiredMessage && <Text size={"12_500"}
                                       style={[s.error]}
                >
                    {requiredMessage}
                </Text>
            )}
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
                                              setSelected({value: item, index})
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
                                  )
                                  }/>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};


export default DropDown;
