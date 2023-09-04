import React, {useState} from "react";
import s from "./style";
import {Screen, Text, Button, NavigationHeader, Icon, Input} from "../../../core";
import {margin, padding,} from "../../../resources";
import {Image, View} from 'react-native'
import global from "../../../styles/global";
import forgotPasswordFrame from '../../../../assets/images/forgot-password-frame.png'
import {CheckYourEmail} from "../../../modals";

export const ForgotPassword = (props) => {
    const [visibility, setVisibility] = useState(false)

    return (
        <Screen contentContainerStyle={s.container}>
            <View style={s.top}>
                <Image source={forgotPasswordFrame}/>
            </View>
            <Text style={[global.app_title, s.title]}>ForgotPassword</Text>
            <Text style={{lineHeight: 20}}>
                Enter your email address below and we'll send you an email with instructions on how to change your
                password
            </Text>
            <Input name={'email'} placeholder={'Email'}/>
            <Button variant={"primary"}
                    label={"Request email"}
                    onPress={() => {
                        // props.navigation.navigate("CheckYourEmail")
                        setVisibility(true)
                    }}
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
