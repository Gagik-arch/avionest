import React, {useContext, useEffect, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import DatePicker from "../../../core/DatePicker";
import globalApi from "../../../api/globalApi";
import axios from "axios";

export const UserInfo = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        globalApi.getCountries()
            .then(res => {
                setCountries(res.data.countries)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    const onChange = (e) => {
        onChangeBody(e, body, setBody);
    };

    const disableSubmitBtn = () => validateFields([
        "first_name",
        "last_name",
        "date_of_birth",
        "country_id",
        "home_base",
    ], body);

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
            />
            <Input placeholder={'Surname'}/>
            <DatePicker placeholder={'Date of birth'}/>
            <DropDown variant={'underlined'}
                      placeholder={'Nationality'}
                      data={countries}
                      label={(e) => e.name}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.name}</Text>
                      }}
            />
            <Input placeholder={'Home base'}/>
            <View style={{flex: 1, ...margin(20, 0, 0, 0)}}/>
            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onPress={() => {
                        // props.navigation.navigate('YourAircraft')

                    }}/>
        </Screen>
    );
};
