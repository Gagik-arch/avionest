import React, {useCallback, useMemo, useState} from 'react'
import s from './style'
import {Button, Icon, Input, Text} from "../../core";
import {FlatList, Modal, TouchableOpacity, View} from "react-native";
import {Colors, margin, padding} from "../../resources";

export const SelectYourDestination = ({
                                          OACIData = [],
                                          onChange,
                                          value,
                                          visibility=false,
                                          setValue,
                                          setVisibility
                                      }) => {

    const filter = useMemo(() => {
        return value ? OACIData.filter(item => item.airfield_name.toLowerCase().includes(value.toLowerCase())) : []
    }, [value])

    return (
        <>

            <Modal visible={visibility}
                   animationType={'none'}
            >
                <View style={s.modal_container}>
                    <View style={s.block}>
                        <View style={s.top_container}>
                            <View style={{flex: 1}}>
                                <Input variant={'underlined'}
                                       blockStyles={{height: 46}}
                                       containerStyles={s.input_container}
                                       placeholder={'Select your destination'}
                                       value={value}
                                       autoFocus={true}
                                       renderButtons={(e) => {
                                           if (!e.value) return null
                                           return <Button onPress={() => {
                                               e.setValue('')
                                               setValue('')
                                           }}>
                                               <Icon type={'X'} size={18} stroke={Colors.darkGray}/>
                                           </Button>
                                       }}
                                       onFinish={(e) => {
                                           if (e.value.length >= 2) {
                                               setValue(e.value)
                                           } else {
                                               setValue('')
                                           }
                                       }}
                                />
                            </View>
                            <Button label={'Close'}
                                    labelSize={'14_400'}
                                    style={s.close_btn}
                                    onPress={() => {
                                        setVisibility(false)
                                    }}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            {filter.length ?
                                <FlatList style={{...padding(16), flex: 1, height: '100%',}}
                                          data={filter}
                                          renderItem={({item, index}) => {
                                              return (
                                                  <TouchableOpacity style={[s.list,
                                                      {borderBottomWidth: index < filter.length ? 1 : 0}
                                                  ]}
                                                                    onPress={() => {
                                                                        onChange?.({value: item})
                                                                        setVisibility(false)
                                                                        setValue(item.airfield_name)
                                                                    }}
                                                  >
                                                      <View>
                                                          <Text>{item.airfield_name}</Text>
                                                      </View>
                                                  </TouchableOpacity>
                                              )
                                          }}
                                          keyExtractor={item => item.id}
                                /> :
                                <Text style={{...margin(16,0,0,16)}}>Data not available.</Text>}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
