import React, {useEffect, useState} from 'react'
import s from './style'
import {Button, Icon, Switch, NavigationHeader, Screen, Text} from "../../../core";
import {Colors, margin} from "../../../resources";
import {ActivityIndicator, View} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {getMyBookings} from "../../../store/asyncThunks/myBookings";

export const MyBookings = (props) => {
    const myBookings = useSelector(state => state.myBookings)
    const [isLong, setIsLong] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getMyBookings())
    }, [])

    return (
        <Screen    header={<NavigationHeader title={<Text size={'14_400'}>My bookings</Text>}
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
                {myBookings.isLoading ? <ActivityIndicator/> :
                    myBookings.data?.length ?
                        myBookings.data.map(item => {
                            const startD = moment(item?.dateStart);
                            const endD = moment(item?.dateEnd);
                            const duration = moment.duration(endD.diff(startD));

                            return (
                                <View style={s.list_container} key={item?.id}>
                                    <View style={s.list_top}>
                                        <View style={{alignItems: 'center',}}>
                                            <Icon type={'MapMarker'} size={26}/>
                                        </View>
                                        <View style={{flex: 1, rowGap: 10}}>
                                            <Text style={{color: Colors.darkBlue}}
                                                  size={'16_400'}
                                            >
                                                {item?.address}
                                            </Text>
                                            <Text style={{color: Colors.darkBlue}}>
                                                {moment(item?.dateStart).format('DD MMMM YY')}
                                                {' '} on {' '}
                                                {moment(item?.dateEnd).format('DD MMMM YY')}
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
