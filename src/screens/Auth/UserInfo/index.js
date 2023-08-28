import React, {useContext, useState} from "react";
import s from "./style";
import {Button, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";

export const UserInfo = (props) => {
    const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e) => {
        onChangeBody(e, body, setBody);
    };

    const disableSubmitBtn = () => validateFields(["name", "phoneNumber", "email", "password"], body) || isLoading;

    const onSubmit = () => {
        setIsLoading(true);
    };

    return (
        <Screen contentContainerStyle={s.container}
                header={
                    <NavigationHeader title={<></>} {...props}
                                      backHandler={<Button onPress={()=>{
                                          props.navigation.goBack()
                                      }}>
                                          <Icon type={'ArrowLeft'}/>
                                      </Button>}
                    />
                }>
            <Text style={global.app_title}>Let’s get started</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>Create your Account</Text>
            <Input placeholder={'First Name'}/>
            <Input placeholder={'Surname'}/>
            <Input placeholder={'Date of birth'}/>
            <Input placeholder={'Nationality'}/>
            <Input placeholder={'Home base'}/>
            <View style={{flex: 1}}/>
            <Button label={'Next'} variant={'primary'}/>
        </Screen>
    );
};
