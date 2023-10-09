import React, {useEffect, useState} from 'react'
import s from './style'
import {Button, DropDown, Icon, Input, NavigationHeader, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {
    Colors,
    margin,
    onChangeBody,
    generateYears,
    onRequiredFieldNotAvailable,
    validateFields
} from "../../../resources";
import {Image, Platform, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {getAuthSources} from "../../../store/asyncThunks/global";
import DateTimePicker from "@react-native-community/datetimepicker";

export const Profile = (props) => {
    const [body, setBody] = useState({});
    const [requiredMessage, setRequiredMessage] = useState({})
    const {isLoading, data} = useSelector(state => state.global)
    const dispatch = useDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const formQuery = ["first_name", "last_name", "date_of_birth", "country_id", "home_base"]

    useEffect(() => {
        dispatch(getAuthSources())
    }, [])

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody);
    };

    const disableSubmitBtn = () => validateFields(formQuery, body);

    const onDisable = () => {
        const result = {}
        onRequiredFieldNotAvailable(formQuery, body, (item) => {
            result[item] = `${item.toUpperCaseFirstChar()} is required`
        })
        setRequiredMessage(result)
    }
    console.log(body)

    return (
        <Screen contentContainerStyle={s.container}
                header={<NavigationHeader title={<></>}
                                          backHandler={
                                              <Button style={{columnGap: 18}}
                                                      onPress={() => {
                                                          props.navigation.goBack()
                                                      }}>
                                                  <Icon type={'ArrowLeft'} stroke={Colors.darkBlue} size={22}/>
                                                  <Text size={'14_400'} style={{color: Colors.darkBlue}}>Profile</Text>
                                              </Button>
                                          }
                                          {...props}/>}
        >
            <Input placeholder={'Username'}
                   onChange={onChange}
                   name={'username'}
                   value={body?.username}
            />
            <Input placeholder={'Email'}
                   validationKey={'email'}
                   onChange={onChange}
                   name={'email'}
                   value={body?.email}
            />
            <Input placeholder={'Mobule number'}
                   onChange={onChange}
                   name={'phone'}
                   value={body?.phone}
            />
            <DropDown variant={'underlined'}
                      placeholder={body?.date_of_birth || 'Date of birth'}
                      data={generateYears()}
                      name={'date_of_birth'}
                      label={() => moment(body.date_of_birth).format('YYYY/MM/DD')}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item}</Text>
                      }}
                      requiredMessage={requiredMessage['date_of_birth']}
                      onChange={(e) => {
                          let date = new Date()
                          date.setFullYear(e.value)
                          date.setDate(1)
                          date.setMonth(0)
                          setDatePickerVisibility(true)
                          onChange({value: date, name: e.name})
                      }}
            />
            {isDatePickerVisible && <DateTimePicker mode={'date'}
                                                    value={body.date_of_birth}
                                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                                    onChange={({nativeEvent, type}) => {
                                                        setDatePickerVisibility(false)
                                                        if (type === "set") {
                                                            moment(body.date_of_birth).format('YYYY/MM/DD')
                                                            onChange({
                                                                value: new Date(nativeEvent.timestamp),
                                                                name: 'date_of_birth',
                                                            });
                                                        }
                                                    }}
            />}
            <DropDown variant={'underlined'}
                      placeholder={body?.country_id || 'Nationality'}
                      data={data?.countries}
                      label={(e) => e.value.name}
                      renderItem={({item, isSelected}) => {
                          return <View style={{flexDirection: "row", columnGap: 10, alignItems: 'center'}}>
                              <Image
                                  source={{uri: `http://192.168.77.129:9026/sources/flags/${item.code.toLowerCase()}.png`}}
                                  style={{width: 30, height: '100%'}}
                              />
                              <Text size={'14_400'}
                                    style={{color: isSelected ? 'white' : '#787777'}}>{item.name}</Text>
                          </View>
                      }}
                      name={'country_id'}
                      requiredMessage={requiredMessage['country_id']}
                      onChange={(e) => {
                          onChange({value: e.value.id, name: e.name})
                      }}
            />

            <Button style={s.log_out_btn}
                    label={'Sign out'}
                    labelStyle={{color: Colors.red}}
                    labelSize={'14_400'}
            />
            <View style={{flex: 1}}/>

            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={() => {
                    }}
            />
        </Screen>
    )
}


