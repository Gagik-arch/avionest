import React, {useState} from "react";
import s from "./style";
import {Button, Icon, Input, NavigationHeader, Screen, Text} from "../../../core";
import plane from '../../../../assets/images/plane.png'
import {Image, View} from "react-native";
import global from "../../../styles/global";
import {
    Colors, margin, onChangeBody, validateFields, onRequiredFieldNotAvailable
} from "../../../resources";

export const Signin = (props) => {
    const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["password", "email"]

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
            />
            <Input placeholder={'Password'}
                   validationKey={'password'}
                   onFinish={onChange}
                   name={'password'}
                   value={body?.password}
                   requiredMessage={requiredMessage['password']}
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
                    onPress={() => {
                        props.navigation.navigate('Home')
                    }}
                    onDisabled={onDisable}
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
