import React, {useEffect, useState} from 'react'
import s from './style'
import {Button, Icon, Switch, NavigationHeader, Screen, Text} from "../../../core";
import {Colors, margin} from "../../../resources";
import {ActivityIndicator, View} from 'react-native'
import usersApi from "../../../api/usersApi";
import {useSelector} from "react-redux";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';

export const MyBookings = (props) => {
    const user = useSelector(state => state.auth)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLong, setIsLong] = useState(false)

    //console.log(user.data.user.id)
    useEffect(() => {
        setIsLoading(true)
        usersApi.getMyBookings({userId: user.data.user.id})
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(e => {
                console.log(e)
            })
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <Screen footer={<Button label={'Book'}
                                variant={'primary'}
                                style={{...margin(8, 48)}}
                                onPress={() => {
                                    usersApi.getMyBookings({userId: user.data.user.id})
                                        .then(res => {
                                            console.log(res.data)
                                        })
                                        .catch(e => {
                                            console.log(e)
                                        })
                                }}
        />}
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
                {isLoading ? <ActivityIndicator/> :
                    data.length ?
                        data.map(item => {
                            const startD = moment(item.start_timestamp);
                            const endD = moment(item.end_timestamp);
                            const duration = moment.duration(endD.diff(startD));

                            return (
                                <View style={s.list_container} key={item.id}>
                                    <View style={s.list_top}>
                                        <View style={{alignItems: 'center',}}>
                                            <Icon type={'MapMarker'} size={26}/>
                                        </View>
                                        <View style={{flex: 1, rowGap: 10}}>
                                            <Text style={{color: Colors.darkBlue}}
                                                  size={'16_400'}
                                            >
                                                dfasdasdasd
                                            </Text>
                                            <Text style={{color: Colors.darkBlue}}>
                                                {moment(item.start_timestamp).format('DD MMMM YY')}
                                                {' '} on {' '}
                                                {moment(item.end_timestamp).format('DD MMMM YY')}
                                            </Text>
                                            <Text style={{color: Colors.darkBlue}}>
                                                {duration.asDays().toFixed()} {' '}
                                                booked in covered hangar
                                            </Text>
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
                        }) :
                        <Text>Bookings not available.</Text>
                }
            </View>
        </Screen>
    )
}
