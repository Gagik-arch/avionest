import React, {useState} from 'react'
import {FlatList, Modal, TouchableOpacity, View} from "react-native";
import {Button, Icon, Input, Text} from "../../core";
import s from './style'
import globalApi from "../../api/globalApi";
import {Colors, padding} from "../../resources";

export const SelectableInput = ({
                                    onChange,
                                    name,
                                }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [_value, _setValue] = useState('')

    return (
        <View>
            <Input variant={'underlined'}
                   placeholder={'Select your aircraft'}
                   value={_value}
                   onChange={(e) => {
                       _setValue(e.value)
                       if (e.value.length > 2) {
                           setIsLoading(true)
                           globalApi.getAircrafts(e.value)
                               .then(res => {
                                   setData(res.data.aircrafts)
                               })
                               .catch(e => {
                                   console.log(e)
                               })
                               .then(e => {
                                   setIsLoading(false)
                               })
                       }
                   }}
            />
            <Modal visible={data.length > 0}
                   animationType={'slide'}
            >
                <View style={s.modal_container}>
                    <View style={s.block}>
                        <View style={s.top_container}>
                            <Button onPress={() => {
                                setData([])
                            }}>
                                <Icon type={'X'} stroke={Colors.darkBlue}/>
                            </Button>
                        </View>
                        <View style={{flex: 1}}>
                            <FlatList style={{...padding(16)}}
                                      data={data}
                                      renderItem={({item, index}) => {
                                          return (
                                              <TouchableOpacity style={[s.list,
                                                  {borderBottomWidth: index < data.length ? 1 : 0}
                                              ]}
                                                                onPress={() => {
                                                                    console.log(item)
                                                                    onChange({value: item, name})
                                                                    setData([])
                                                                    _setValue(item.number)
                                                                }}
                                              >
                                                  <Text>{item.number}</Text>
                                                  <Text>{item.aircraft}</Text>
                                              </TouchableOpacity>
                                          )
                                      }}
                                      keyExtractor={item => item.id}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
