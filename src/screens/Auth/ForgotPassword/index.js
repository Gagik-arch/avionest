import React, {useState} from "react";
import s from "./style";
import {Screen, Text, Button, NavigationHeader, Icon, Input} from "../../../core";
import {margin, onChangeBody, onRequiredFieldNotAvailable, padding, validateFields,} from "../../../resources";
import {Image, View} from 'react-native'
import global from "../../../styles/global";
import forgotPasswordFrame from '../../../../assets/images/forgot_password_frame.png'
import {CheckYourEmail} from "../../../modals";
import authApi from "../../../api/authApi";

export const ForgotPassword = (props) => {
    const [visibility, setVisibility] = useState(false)
    const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["email"]

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody)
    }
    const disableSubmitBtn = () => validateFields(formQuery, body) || isLoading;

    const onDisable = () => {
        const result = {}
        onRequiredFieldNotAvailable(formQuery, body, (item) => {
            result[item] = `No account found with that email address.`
        })
        setRequiredMessage(result)
    }

    const onSubmit = ()=>{
        setIsLoading(true)
        authApi.forgotPassword(body)
            .then(()=>{

            })
            .catch(e=>{
                console.log(e)
            })
            .then(()=>{
                setIsLoading(false)
            })
    }

    return (
        <Screen contentContainerStyle={s.container}>
            <View style={s.top}>
                <Image source={forgotPasswordFrame}/>
            </View>
            <Text style={[global.app_title, s.title]}>ForgotPassword</Text>
            <Text style={{lineHeight: 20,marginBottom:47}}>
                Enter your email address below and we'll send you an email with instructions on how to change your
                password
            </Text>
            <Input name={'email'}
                   placeholder={'Email'}
                   validationKey={'email'}
                   onFinish={onChange}
                   value={body?.email}
                   requiredMessage={requiredMessage['email']}
            />
            <Button variant={"primary"}
                    label={"Request email"}
                    onPress={onSubmit}
                    onDisabled={onDisable}
                    disabled={disableSubmitBtn()}
                    style={{
                        ...margin(74, 0)
                    }}
            />
            <View style={{justifyContent: "center", alignItems: 'center'}}>
                <Button label={'Go Back'}
                        variant={'link'}
                        onPress={() => props.navigation.goBack()}

                />
            </View>
            <CheckYourEmail visibility={visibility}
                            setVisibility={setVisibility}
                            onSubmit={()=>{
                                props.navigation.navigate('NewPassword')
                            }}
            />
        </Screen>
    );
};
