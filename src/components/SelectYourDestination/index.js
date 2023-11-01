import React, {useCallback, useMemo, useState} from 'react'
import s from './style'
import {Button, Icon, Input, Text} from "../../core";
import {FlatList, Modal, TouchableOpacity, View} from "react-native";
import {Colors, padding} from "../../resources";

export const SelectYourDestination = ({
                                          OACIData = [],
                                          onChange,
                                          value
                                      }) => {
    const [_value, _setValue] = useState('')
    const [visibility, setVisibility] = useState(false)

    const filter = useMemo(() => {
        return _value ? OACIData.filter(item => item.airfield_name.toLowerCase().includes(_value.toLowerCase())) : []
    }, [_value])

    return (
        <>
            <Button variant={'underlined'} style={s.btn}
                    onPress={() => {
                        setVisibility(true)
                    }}>
                <Text style={s.placeholder}>{OACIData.find(item=>item.id === value)?.airfield_name || 'Select your destination'}</Text>
                <Icon type={'Search'}
                      size={18}/>
            </Button>
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
                                       value={_value}
                                       renderButtons={(e) => {
                                           if (!e.value) return null
                                           return <Button onPress={() => {
                                               e.setValue('')
                                               _setValue('')
                                           }}>
                                               <Icon type={'X'} size={18} stroke={Colors.darkGray}/>
                                           </Button>
                                       }}
                                       onFinish={(e) => {
                                           if (e.value.length >= 2) {
                                               _setValue(e.value)
                                           } else {
                                               _setValue('')
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
                                                                        _setValue(item.airfield_name)
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
                                <Text style={{marginLeft: 16}}>Data not available.</Text>}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
