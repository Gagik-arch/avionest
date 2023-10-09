import React, {useContext, useEffect, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {ActivityIndicator, Platform} from "react-native";
import {margin, onChangeBody, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import DatePicker from "../../../core/DatePicker";
import {getAuthSources} from "../../../store/asyncThunks/global";
import {useDispatch, useSelector} from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";

export const UserInfo = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [requiredMessage, setRequiredMessage] = useState({})
    const {isLoading, data} = useSelector(state => state.global)
    const dispatch = useDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const formQuery = ["first_name", "last_name", "date_of_birth", "country_id", "home_base"]

    useEffect(() => {
        dispatch(getAuthSources())
    }, [])

    const generateYears = () => {
        const currentYear = new Date().getFullYear()
        const result = []
        for (let i = currentYear - 100; i <= currentYear; i++) {
            result.push(i)
        }
        return result;
    }

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

    return (
        <Screen contentContainerStyle={s.container}
                header={
                    <NavigationHeader title={<></>} {...props}
                                      backHandler={<Button onPress={() => {
                                          props.navigation.goBack()
                                      }}>
                                          <Icon type={'ArrowLeft'}/>
                                      </Button>}
                    />
                }>
            <Text style={global.app_title}>Let’s get started</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>Create your Account</Text>
            <Input placeholder={'First Name'}
                   name={'first_name'}
                   onChange={onChange}
                   requiredMessage={requiredMessage['first_name']}
                   value={body?.first_name}
            />
            <Input placeholder={'Surname'}
                   name={'last_name'}
                   onChange={onChange}
                   requiredMessage={requiredMessage['last_name']}
                   value={body?.last_name}
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
                          setDatePickerVisibility(true)
                          onChange({value: new Date(`${e.value} 01 01`), name: e.name})
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
            {isLoading ?
                <ActivityIndicator/> :
                <DropDown variant={'underlined'}
                          placeholder={body?.country_id || 'Nationality'}
                          data={data?.countries}
                          label={(e) => e.value.name}
                          renderItem={({item, isSelected}) => {
                              return <Text size={'14_400'}
                                           style={{color: isSelected ? 'white' : '#787777'}}>{item.name}</Text>
                          }}
                          name={'country_id'}
                          requiredMessage={requiredMessage['country_id']}
                          onChange={(e) => {
                              onChange({value: e.value.id, name: e.name})
                          }}
                />}
            <Input placeholder={'Home base'}
                   name={'home_base'}
                   onChange={onChange}
                   requiredMessage={requiredMessage['home_base']}
                   value={body?.home_base}
            />
            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={() => {
                        body.date_of_birth = moment(body.date_of_birth).format('YYYY/MM/DD')
                        props.navigation.navigate('YourAircraft', body)
                    }}
            />
        </Screen>
    );
};
