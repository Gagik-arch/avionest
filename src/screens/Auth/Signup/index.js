import React, { useRef, useState} from "react";
import s from "./style";
import {Button, Checkbox,  Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, onRequiredFieldNotAvailable,  validateFields} from "../../../resources";
import global from '../../../styles/global'
import Toast from "react-native-toast-message";
import globalApi from "../../../api/globalApi";

export const Signup = (props) => {
    const [body, setBody] = useState({});
    const [terms, setTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["email", "username", "password", "confirm_password"]
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

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
        if (!terms) {
            Toast.show({
                type: 'error',
                text1: 'You need to agree with Terms and Conditions',
            });
        }
        if (body.password !== body.confirm_password) {
            Toast.show({
                type: 'error',
                text1: 'Password and confirm password don\'t match!',
            });
        }
    }

    const submit = ()=>{
        globalApi.checkEmailExist({email:body.email})
            .then( (res) => {
                if(res.data.emailExists){
                    Toast.show({
                        type: "error",
                        text1: 'Email is exists!',
                    });
                   const bodyClone = {...body}
                    delete bodyClone.email
                    setBody(bodyClone)
                }else{
                    props.navigation.navigate('UserInfo', body)
                }
            })
            .catch(e => {
                    Toast.show({
                        type: "error",
                        text1: e || "An error occurred.",
                    });
            })
            .finally(() => {
                setIsLoading(false)
            })
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
                   onSubmitEditing={() => {
                       usernameRef.current.focus();
                   }}
            />
            <Input placeholder={'Username'}
                   name={'username'}
                   onChange={onChange}
                   value={body?.username}
                   requiredMessage={requiredMessage?.username}
                   ref={usernameRef}
                   onSubmitEditing={() => {
                       passwordRef.current.focus();
                   }}
            />
            <Input placeholder={'Password'}
                   validationKey={'password'}
                   name={'password'}
                   onChange={onChange}
                   value={body?.password}
                   requiredMessage={requiredMessage?.password}
                   ref={passwordRef}
                   onSubmitEditing={() => {
                       confirmPasswordRef.current.focus();
                   }}
            />
            <Input placeholder={'Confirm password'}
                   validationKey={'password'}
                   name={'confirm_password'}
                   onChange={onChange}
                   value={body?.confirm_password}
                   requiredMessage={requiredMessage?.confirm_password}
                   ref={confirmPasswordRef}
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
                    onPress={submit}
                    onDisabled={onDisable}
                    isLoading={isLoading}
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
