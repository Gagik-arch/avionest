import React, {useContext, useState} from "react";
import s from "./style";
import {Button, Checkbox, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, onRequiredFieldNotAvailable, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import Toast from "react-native-toast-message";

export const Signup = (props) => {
    const [body, setBody] = useState({});
    const [terms, setTerms] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["email", "username", "password", "confirm_password"]

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody);
    };

    const disableSubmitBtn = () => validateFields(formQuery, body) || !terms || body?.password !== body.confirm_password;

    const onDisable = () => {
        const result = {}
        onRequiredFieldNotAvailable(formQuery, body, (item) => {
            result[item] = `${item.toUpperCaseFirstChar()} is required`
        })
        setRequiredMessage(result)
        if(!terms){
            Toast.show({
                type: 'error',
                text1: 'You need to agree with Terms and Conditions',
            });
        }
        if (body?.password !== body.confirm_password) {
            Toast.show({
                type: 'error',
                text1: 'Password and confirm password don\'t match!',
            });
            return
        }
    }

    return (
        <Screen contentContainerStyle={s.container}>
            <Text style={global.app_title}>Welcome!</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>Create your Account</Text>
            <Input placeholder={'Email address'}
                   name={'email'}
                   validationKey={'email'}
                   onChange={onChange}
                   value={body?.email}
                   requiredMessage={requiredMessage?.email}
            />
            <Input placeholder={'Username'}
                   name={'username'}
                   onChange={onChange}
                   value={body?.username}
                   requiredMessage={requiredMessage?.username}
            />
            <Input placeholder={'Password'}
                   validationKey={'password'}
                   name={'password'}
                   onChange={onChange}
                   value={body?.password}
                   requiredMessage={requiredMessage?.password}
            />
            <Input placeholder={'Confirm password'}
                   validationKey={'password'}
                   name={'confirm_password'}
                   onChange={onChange}
                   value={body?.confirm_password}
                   requiredMessage={requiredMessage?.confirm_password}
            />
            <Checkbox label={'I have read and agreed to the Terms and Conditions'}
                      size={16}
                      containerStyle={{...margin(17, 0, 0, 0)}}
                      name={'terms'}
                      onChange={(e) => {
                          setTerms(e.value)
                      }}
                      checked={terms}
            />
            <View style={{flex: 1}}/>
            <Button label={'Create Account'} variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onPress={() => {
                        props.navigation.navigate('UserInfo', body)

                    }}
                    onDisabled={onDisable}
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
