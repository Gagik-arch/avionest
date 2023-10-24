import React, {useEffect, useState} from 'react'
import s from './style'
import {Button, Icon, Switch, NavigationHeader, Screen, Text} from "../../../core";
import {Colors, margin, onChangeBody} from "../../../resources";
import {View} from 'react-native'
import usersApi from "../../../api/usersApi";
import {useSelector} from "react-redux";

export const MyBookings = (props) => {
    const [isLong, setIsLong] = useState(false)
    const user = useSelector(state => state.auth)

    useEffect(() => {
        usersApi.getMyBookings({userId: user.data.user.id})
            .then(res => {
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <Screen footer={<Button label={'Book'} variant={'primary'} style={{...margin(16, 48)}}/>}
                header={<NavigationHeader title={<Text size={'14_400'}>My bookings</Text>}
                                          backHandler={
                                              <Button onPress={() => {
                                                  props.navigation.goBack()
                                              }}>
                                                  <Icon type={'ArrowLeft'} size={22}/>
                                              </Button>
                                          }

                                          {...props}/>}
        >
            <View style={s.top}>
                <Text style={{color: 'white'}}>Long term parking </Text>
                <Switch value={isLong}
                        onChange={e => {
                            setIsLong(e.value)
                        }}
                        style={{borderColor: 'white', backgroundColor: 'white'}}
                        switchStyle={{
                            backgroundColor: Colors.darkBlue,
                            borderColor: Colors.darkBlue,
                        }}
                        activeStyle={{
                            backgroundColor: Colors.darkBlue,
                            borderColor: 'white',
                        }}
                        switchActiveStyle={{
                            borderColor: 'white',
                            backgroundColor: 'white'

                        }}
                />
            </View>
            <View style={s.container}>
                {renderList()}
                {renderList()}
            </View>
        </Screen>
    )
}

const renderList = () => {

    return (
        <View style={s.list_container}>
            <View style={s.list_top}>
                <View style={{alignItems: 'center',}}>
                    <Icon type={'MapMarker'} size={26}/>
                </View>
                <View style={{flex: 1, rowGap: 10}}>
                    <Text style={{color: Colors.darkBlue}}
                          size={'16_400'}
                    > asdasdasd </Text>
                    <Text> asdasdasd </Text>
                    <Text> asdasdasd </Text>
                </View>
            </View>
            <View style={s.list_bottom}>
                <Text style={{color: Colors.darkBlue}}
                      size={'14_400'}
                >
                    {new Date().toLocaleDateString('en', {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    })}
                </Text>
            </View>
        </View>
    )
}
