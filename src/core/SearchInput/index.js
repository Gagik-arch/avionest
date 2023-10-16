import React, {useEffect, useRef, useState} from 'react'
import {FlatList, Modal, TouchableOpacity, View} from "react-native";
import {Button, Icon, Input, Text} from "../../core";
import s from './style'
import globalApi from "../../api/globalApi";
import {Colors, padding} from "../../resources";

const SearchInput = ({
                         onChange,
                         name,
                         data = [],
                         renderItem,
                         filter,
                         setValue,
                         value = '',
                         keyboardType,
                         containerStyles = {},
                         renderButtons,
    onFinish
                     }) => {
    const [_value, _setValue] = useState(value)
    const [visibility, setVisibility] = useState(false)

    return (
        <View>
            <Input variant={'underlined'}
                   containerStyles={[containerStyles]}
                   placeholder={'Select your aircraft'}
                   value={_value}
                   renderButtons={renderButtons}
                   keyboardType={keyboardType}
                   onFinish={(e) => {
                       _setValue(e.value)
                       if (e.value.length >= 2) {
                           setVisibility(true)
                       }
                   }}
            />
            <Modal visible={visibility}
                   animationType={'slide'}
            >
                <View style={s.modal_container}>
                    <View style={s.block}>
                        <View style={s.top_container}>
                            <Button onPress={() => {
                                setVisibility(false)
                            }}>
                                <Icon type={'X'} stroke={Colors.darkBlue}/>
                            </Button>
                        </View>
                        <View style={{flex: 1}}>
                            {filter(data, _value).length ?
                                <FlatList style={{...padding(16)}}
                                       data={filter(data, _value)}
                                       renderItem={({item, index}) => {
                                           return (
                                               <TouchableOpacity style={[s.list,
                                                   {borderBottomWidth: index < data.length ? 1 : 0}
                                               ]}
                                                                 onPress={() => {
                                                                     onChange?.({value: item, name})
                                                                     setVisibility(false)
                                                                     setValue && _setValue(setValue(item))
                                                                 }}
                                               >
                                                   {renderItem?.({item, index})}
                                               </TouchableOpacity>
                                           )
                                       }}
                                       keyExtractor={item => item.id}
                            />:
                            <Text style={{marginLeft:16}}>Data not available.</Text>}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SearchInput
