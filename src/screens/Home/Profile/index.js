import React, {useCallback, useEffect, useState} from 'react'
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
import {login, updateUser} from "../../../store/asyncThunks/auth";
import Toast from "react-native-toast-message";

export const Profile = (props) => {
    const {auth, global} = useSelector(state => state)
    const date = auth?.data?.user?.date_of_birth ?
        moment(auth?.data?.user?.date_of_birth).format('YYYY/MM/DD') :
        undefined

    const [body, setBody] = useState({
        ...auth?.data?.user,
        date_of_birth: date
    });
    const [requiredMessage, setRequiredMessage] = useState({})
    const dispatch = useDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const formQuery = ["country_id", "first_name", "last_name", "email", "date_of_birth"]

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

    const hasNotChangedUserData = useCallback(() => {
        return Object.keys(body).every((key) => {
            const authClone = {...auth?.data?.user}
            authClone.date_of_birth = date
            return body[key] === authClone[key]
        })
    }, [body, auth])

    const disableSubmitBtn = () => {
        return validateFields(formQuery, body) || hasNotChangedUserData() || auth.isLoading
    };

    const onDisable = () => {
        const result = {}
        onRequiredFieldNotAvailable(formQuery, body, (item) => {
            result[item] = `${item.toUpperCaseFirstChar()} is required`
        })
        setRequiredMessage(result)
        if(hasNotChangedUserData()){
            Toast.show({
                type: 'error',
                text1: `You must change your personal information.`,
            });
        }
    }

    const onSubmit = () => {
        dispatch(updateUser({body, navigation: props.navigation}))
    }

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
            <Input placeholder={'First name'}
                   onChange={onChange}
                   name={'first_name'}
                   value={body?.first_name}
            />
            <Input placeholder={'Last name'}
                   onChange={onChange}
                   name={'last_name'}
                   value={body?.last_name}
            />
            <Input placeholder={'Email'}
                   validationKey={'email'}
                   onChange={onChange}
                   name={'email'}
                   value={body?.email}
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
                                                    onChange={({_, type}) => {
                                                        setDatePickerVisibility(false)
                                                        if (type === "set") {

                                                            onChange({
                                                                value: moment(body.date_of_birth).format('YYYY/MM/DD'),
                                                                name: 'date_of_birth',
                                                            });
                                                        }
                                                    }}
            />}
            <DropDown variant={'underlined'}
                      placeholder={'Nationality'}
                      data={global.data?.countries}
                      value={global?.data?.countries?.findIndex(item => item.id === auth?.data?.user?.country_id)}
                      label={(e) => e?.value?.name}
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
            <View style={{flex: 1}}/>

            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={onSubmit}
            />
        </Screen>
    )
}


