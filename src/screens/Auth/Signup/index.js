import React, {useContext, useState} from "react";
import s from "./style";
import {Button, Checkbox, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'

export const Signup = (props) => {
    const [body, setBody] = useState({});
    const [terms, setTerms] = useState(false);

    const onChange = (e) => {
        onChangeBody(e, body, setBody);
    };

    const disableSubmitBtn = () => validateFields(["email", "username", "password", "confirm_password"], body) || !terms;

    return (
        <Screen contentContainerStyle={s.container}>
            <Text style={global.app_title}>Welcome!</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>Create your Account</Text>
            <Input placeholder={'Email address'}
                   name={'email'}
                   validationKey={'email'}
                   onChange={onChange}
                   value={body?.email}
            />
            <Input placeholder={'Username'}
                   name={'username'}
                   onChange={onChange}
                   value={body?.username}
            />
            <Input placeholder={'Password'}
                   validationKey={'password'}
                   name={'password'}
                   onChange={onChange}
                   value={body?.password}
            />
            <Input placeholder={'Confirm password'}
                   validationKey={'password'}
                   name={'confirm_password'}
                   onChange={onChange}
                   value={body?.confirm_password}
            />
            <Checkbox label={'I have read and agreed to the Terms and Conditions'}
                      size={16}
                      containerStyle={{...margin(17, 0, 0, 0)}}
                      name={'terms'}
                      onChange={(e)=>{
                          setTerms(e.value)
                      }}
                      checked={terms}
            />
            <View style={{flex: 1}}/>
            <Button label={'Create Account'} variant={'primary'}
                    onPress={() => {
                        props.navigation.navigate('UserInfo', body)
                    }}
                    disabled={disableSubmitBtn()}
            />
            <Text style={{textAlign: 'center', ...margin(14, 0, 10, 0)}}>
                Already have an account?
            </Text>
            <Button label={'Sign In to your account'}
                    labelStyle={{color: Colors.darkBlue, fontSize: 12}}
                    onPress={() => {
                        props.navigation.navigate('Signin')
                    }}
            />
        </Screen>
    );
};
