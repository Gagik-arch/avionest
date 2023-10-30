import React, {useRef, useState} from "react";
import s from "./style";
import {Button, Input, Screen, Text} from "../../../core";
import plane from '../../../../assets/images/plane.png'
import {Image, View} from "react-native";
import global from "../../../styles/global";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../store/asyncThunks/auth";
import {
    Colors, margin, onChangeBody, validateFields, onRequiredFieldNotAvailable
} from "../../../resources";


export const Signin = (props) => {
    const [body, setBody] = useState({
        // 'email':'asdd88ii8d88a@mail.com',
        // 'password':'123456789'
    });
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["password", "email"]
    const dispatch = useDispatch()
    const {isLoading} = useSelector(state => state.auth)
    const passIRef = useRef(null)

    const onChange = (e) => {
        const copyBody = {...requiredMessage}
        delete copyBody[e.name]
        setRequiredMessage(copyBody)
        onChangeBody(e, body, setBody)
    }

    const disableSubmitBtn = () => validateFields(formQuery, body) || isLoading;

    const onDisable = () => {
        const result = {}

        onRequiredFieldNotAvailable(formQuery, body, (item) => {
            result[item] = `${item.toUpperCaseFirstChar()} is required`
        })
        setRequiredMessage(result)
    }

    const onSubmit = () => {
        dispatch(login({body, navigation: props.navigation}))
    }

    return (
        <Screen contentContainerStyle={s.container}>
            <View style={{alignItems: "center"}}>
                <Image source={plane}/>
            </View>
            <Text style={[global.app_title, {...margin(46, 0, 11, 0)}]}>
                Welcome Back!
            </Text>
            <Text>Hi, please login to continue your journey</Text>
            <Input placeholder={'Email'}
                   onFinish={onChange}
                   name={'email'}
                   value={body?.username}
                   validationKey={'email'}
                   requiredMessage={requiredMessage['email']}
                   blockStyles={margin(0, 0, 16, 0)}
                   onSubmitEditing={() => {
                       passIRef.current.focus();
                   }}
            />
            <Input placeholder={'Password'}
                   validationKey={'password'}
                   onFinish={onChange}
                   name={'password'}
                   value={body?.password}
                   requiredMessage={requiredMessage['password']}
                   ref={passIRef}
                   onSubmitEditing={() => {
                       if (disableSubmitBtn()) return
                       onSubmit()
                   }}
            />
            <View style={[{alignItems: 'flex-end'}, margin(8, 0, 0, 0)]}>
                <Button label={'Forgot password?'}
                        onPress={() => {
                            props.navigation.navigate('ForgotPassword')
                        }}
                />
            </View>
            <Button label={'Login'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onPress={onSubmit}
                    onDisabled={onDisable}
                    isLoading={isLoading}
                    style={{...margin(40, 0, 0, 0)}}
            />
            <Text style={{textAlign: 'center', ...margin(14, 0, 10, 0)}}>
                Don’t have an account?
            </Text>
            <Button label={'Create Account'}
                    labelStyle={{color: Colors.darkBlue, fontSize: 12}}
                    onPress={() => {
                        props.navigation.navigate('Signup')
                    }}
            />
        </Screen>
    );
};
