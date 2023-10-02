import React, {forwardRef, useEffect, useMemo, useState} from "react";
import s from "./style";
import {Icon, Screen, Text, Button, Checkbox, Input} from "../../core";
import {View, Animated, Easing} from "react-native";
import global from "../../styles/global";
import {Colors, margin, onChangeBody, padding, themes} from "../../resources";
import {Group} from "../../components";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import DatePicker from "../../core/DatePicker";
import {useNavigation} from "@react-navigation/native";
import globalApi from "../../api/globalApi";
import moment from "moment/moment";

export const SelectLocation = forwardRef(({
                                              setAirfields,
                                              onClose,
                                              setRegion,
                                          }, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);
    const navigation = useNavigation()
    const [body, setBody] = useState({})

    const onChange = (e) => {
        onChangeBody(e, body, setBody)
    }

    return (
        <BottomSheet ref={ref}
                     handleIndicatorStyle={{backgroundColor: '#E5E5EB', width: 60}}
                     snapPoints={snapPoints}
                     index={-1}
                     enablePanDownToClose={true}
        >
            <View style={s.container}>
                <BottomSheetScrollView contentContainerStyle={{...padding(16)}}>
                    <Text size={'22_700'}>Select Location</Text>
                    <Text style={{color: '#515151', ...margin(20, 0, 9, 0)}}>Where are you flying to?</Text>
                    <Input placeholder={'2972 Westheimer Rd. Santa Ana, Illinois 85486 '}
                           containerStyles={s.input_container}
                           renderButtons={() => {
                               return (
                                   <Button>
                                       <Icon type={'Search'} size={18}/>
                                   </Button>
                               )
                           }}
                           name={'code'}
                           onFinish={onChange}
                           value={body.code}
                    />
                    <View style={{flexDirection: "row", columnGap: 16}}>
                        <View style={{flex: 1, ...margin(20, 0, 0, 0)}}>
                            <Text size={'14_400'}>Check In Date</Text>
                            <DatePicker name={'startDate'}
                                        placeholder={'From Date'}
                                        style={{
                                            borderColor: '#EBEBEB',
                                            ...padding(14, 4)
                                        }}
                                        onChange={(e) => {
                                            setBody(prev => ({...prev, [e.name]: e.value}))
                                        }}
                                        date={body.startDate}
                                        textStyle={{color: Colors.darkBlue}}
                                        icon={<Icon type={'Calendar2'} size={20}/>}
                            />
                        </View>
                        <View style={{flex: 1, ...margin(20, 0, 0, 0)}}>
                            <Text size={'14_400'}>Check In Time</Text>
                            <DatePicker name={'startDate'}
                                        placeholder={'From Time'}
                                        mode={'time'}
                                        style={{
                                            borderColor: '#EBEBEB',
                                            ...padding(14, 4)
                                        }}
                                        onChange={(e) => {
                                            setBody(prev => ({...prev, [e.name]: e.value}))
                                        }}
                                        date={body.startDate}
                                        textStyle={{color: Colors.darkBlue}}
                                        icon={<Icon type={'Calendar2'} size={20}/>}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: "row", columnGap: 16}}>
                        <View style={{flex: 1, ...margin(20, 0, 0, 0)}}>
                            <Text size={'14_400'}>Check In Date</Text>
                            <DatePicker name={'endDate'}
                                        placeholder={'To Date'}
                                        style={{
                                            borderColor: '#EBEBEB',
                                            ...padding(14, 4)
                                        }}
                                        onChange={(e) => {
                                            setBody(prev => ({...prev, [e.name]: e.value}))
                                        }}
                                        date={body.startDate}
                                        textStyle={{color: Colors.darkBlue}}
                                        icon={<Icon type={'Calendar2'} size={20}/>}
                            />
                        </View>
                        <View style={{flex: 1, ...margin(20, 0, 0, 0)}}>
                            <Text size={'14_400'}>Check In Time</Text>
                            <DatePicker name={'endDate'}
                                        placeholder={'To Time'}
                                        mode={'time'}
                                        style={{
                                            borderColor: '#EBEBEB',
                                            ...padding(14, 4)
                                        }}
                                        onChange={(e) => {
                                            setBody(prev => ({...prev, [e.name]: e.value}))
                                        }}
                                        date={body.to_date}
                                        textStyle={{color: Colors.darkBlue}}
                                        icon={<Icon type={'Calendar2'} size={20}/>}
                            />
                        </View>
                    </View>
                    <Button variant={'primary'}
                            label={'Confirm'}
                            style={{...margin(18, 0, 0, 0)}}
                            onPress={() => {
                                globalApi.getAirfieldByRange(
                                    moment(body.startDate).format('YYYY-MM-DD HH:MM'),
                                    moment(body.endDate).format('YYYY-MM-DD HH:MM'),
                                )
                                    .then(res => {
                                        setAirfields(res.data.airfields)
                                        if (res.data.airfields.length > 0) {
                                            setRegion({
                                                latitude: +res.data.airfields[0].latitude,
                                                longitude: +res.data.airfields[0].longitude,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            })
                                        }
                                        onClose()
                                    })
                                    .catch(e => {
                                        console.log(e)
                                    })
                                    .then(() => {

                                    })
                            }}/>
                </BottomSheetScrollView>
            </View>
        </BottomSheet>
    );
});
