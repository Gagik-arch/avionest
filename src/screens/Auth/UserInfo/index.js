import React, {useContext, useEffect, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {ActivityIndicator, View} from "react-native";
import {Colors, margin, onChangeBody, onRequiredFieldNotAvailable, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import DatePicker from "../../../core/DatePicker";
import globalApi from "../../../api/globalApi";
import axios from "axios";
import Toast from "react-native-toast-message";

export const UserInfo = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})

    const formQuery = ["first_name", "last_name", "date_of_birth", "country_id", "home_base"]

    useEffect(() => {
        setIsLoading(true)
        globalApi.getCountries()
            .then(res => {
                setCountries(res.data.countries)
            })
            .catch(e => {
                Toast.show({
                    type: 'error', text1: e || 'An error occurred.',
                });
            })
            .then(() => {
                setIsLoading(false)
            })
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
            <DatePicker placeholder={'Date of birth'}
                        date={body?.date_of_birth}
                        name={'date_of_birth'}
                        onChange={(e) => {
                            onChange({...e, value: e.value.toLocaleDateString().split('.').join('/')})
                        }}
                        requiredMessage={requiredMessage['date_of_birth']}
            />
            {isLoading ?
                <ActivityIndicator/> :
                <DropDown variant={'underlined'}
                          placeholder={body?.country_id || 'Nationality'}
                          data={countries}
                          label={(e) => e.name}
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
                        props.navigation.navigate('YourAircraft', body)
                    }}
            />
        </Screen>
    );
};
