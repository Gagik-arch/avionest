import React, {forwardRef, useEffect, useMemo, useState} from "react";
import s from "./style";
import {Icon, Screen, Text, Button, Checkbox, Input, SearchInput} from "../../core";
import {View, Animated, Easing} from "react-native";
import global from "../../styles/global";
import {Colors, margin, onChangeBody, padding, themes, validateFields} from "../../resources";
import {Group, SelectYourDestination} from "../../components";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import DatePicker from "../../core/DatePicker";
import {useNavigation} from "@react-navigation/native";
import globalApi from "../../api/globalApi";
import moment from "moment/moment";
import {getAuthSources} from "../../store/asyncThunks/global";
import {useDispatch, useSelector} from "react-redux";

export const SelectLocation = forwardRef(({
                                              onClose,
                                              setRegion,
                                              OACIData = [],
                                              setBody,
                                              body,
                                              onSubmit,
                                          }, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);
    const formQuery = ["oaciId", "space_type", 'endDate', 'startDate']
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('')
    const [visibility, setVisibility] = useState(false)

    const disableSubmitBtn = () => validateFields(formQuery, body) || isLoading;

    const onConfirm = () => {

        setIsLoading(true)
        globalApi.getAirfieldById(body.oaciId)
            .then(res => {
                navigation.reset({index: 0, routes: [{name: "Aeroclub", params: {body, data: res.data}}]});
                onSubmit()
            })
            .catch(e => {
                console.log(e)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

    const onChange = (e) => onChangeBody(e, body, setBody)

    return (
        <>
            <SelectYourDestination OACIData={OACIData}
                                   visibility={visibility}
                                   setVisibility={setVisibility}
                                   setValue={setValue}
                                   value={value}
                                   onChange={(e) => {
                                       onChange({value: e.value.id, name: 'oaciId'})
                                   }}
            />
            <BottomSheet ref={ref}
                         handleIndicatorStyle={{backgroundColor: '#E5E5EB', width: 60, position: "relative", zIndex: 9}}
                         snapPoints={snapPoints}
                         index={-1}
                         enablePanDownToClose={true}
            >
                <View style={s.container}>
                    <BottomSheetScrollView contentContainerStyle={{...padding(16)}}>
                        <Text size={'22_700'}>Select Location</Text>
                        <Text style={{color: '#515151', ...margin(20, 0, 9, 0)}}>Where are you flying to?</Text>
                        <Button variant={'underlined'} style={s.btn}
                                onPress={() => {
                                    setVisibility(true)
                                }}>
                            <Text
                                style={s.placeholder}>{OACIData.find(item => item.id === body.oaciId)?.airfield_name || 'Select your destination'}</Text>
                            <Icon type={'Search'}
                                  size={18}/>
                        </Button>
                        <View style={{flex: 1, ...margin(20, 0, 0, 0)}}>
                            <Text size={'14_400'}>Check In Date</Text>
                            <DatePicker name={'startDate'}
                                        placeholder={'From Date'}
                                        style={{
                                            borderColor: '#EBEBEB',
                                            ...padding(14, 4)
                                        }}
                                        onChange={(e) => {
                                            setBody(prev => ({...prev, [e.name]: e.value.toISOString()}))
                                        }}
                                        date={body.startDate}
                                        textStyle={{color: Colors.darkBlue}}
                                        icon={<Icon type={'Calendar2'} size={20}/>}
                                        minimumDate={new Date()}
                            />
                        </View>
                        <View style={{flex: 1, ...margin(20, 0, 0, 0)}}>
                            <Text size={'14_400'}>Check In Date</Text>
                            <DatePicker name={'endDate'}
                                        placeholder={'To Date'}
                                        style={{
                                            borderColor: '#EBEBEB',
                                            ...padding(14, 4)
                                        }}
                                        onChange={(e) => {
                                            setBody(prev => ({...prev, [e.name]: e.value.toISOString()}))
                                        }}
                                        date={body.startDate}
                                        textStyle={{color: Colors.darkBlue}}
                                        icon={<Icon type={'Calendar2'} size={20}/>}
                                        minimumDate={new Date()}
                            />
                        </View>
                        <Button variant={'primary'}
                                label={'Confirm'}
                                style={{...margin(18, 0, 0, 0)}}
                                disabled={disableSubmitBtn()}
                                isLoading={isLoading}
                                onPress={() => {
                                    onSubmit?.()
                                    onConfirm()
                                }}
                        />
                    </BottomSheetScrollView>
                </View>
            </BottomSheet>
        </>
    );
});

