import React, {useState} from "react";
import s from "./style";
import {Button, Icon, Input, NavigationHeader, Screen, Text} from "../../../core";
import plane from '../../../../assets/images/plane.png'
import {Image, View} from "react-native";
import global from "../../../styles/global";
import {Colors, margin} from "../../../resources";

export const Signin = (props) => {
    const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    return (
        <Screen contentContainerStyle={s.container}>
            <View style={{alignItems: "center"}}>
                <Image source={plane}/>
            </View>
            <Text style={[global.app_title, {...margin(46, 0, 11, 0)}]}
            >
                Welcome Back!
            </Text>
            <Text>Hi, please login to continue your journey</Text>
            <Input placeholder={'Username'}/>
            <Input placeholder={'Password'} validationKey={'password'}/>
            <View style={{alignItems: 'flex-end',...margin( 8,0)}}>
                <Button label={'Forgot Password?'}
                        onPress={() => {
                            props.navigation.navigate('ForgotPassword')
                        }}
                />
            </View>
            <Button label={'Create Account'}
                    variant={'primary'}
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
