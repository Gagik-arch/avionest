import React from "react";
import s from "./style";
import {Screen, Text, Button, NavigationHeader, Icon, Input} from "../../../core";
import {margin, padding,} from "../../../resources";
import {Image, View} from 'react-native'
import global from "../../../styles/global";
import forgotPasswordFrame from '../../../../assets/images/forgot-password-frame.png'

export const ForgotPassword = (props) => {

    return (
        <Screen contentContainerStyle={s.container}
        >
            <View style={{justifyContent: "center", alignItems: 'center', ...padding(74, 0)}}>
                <Image source={forgotPasswordFrame}/>
            </View>
            <Text style={[global.app_title,s.title]}>ForgotPassword</Text>
            <Text style={{lineHeight:20}}>
                Enter your email address below and we'll send you an email with instructions on how to change your password
            </Text>
            <Input name={'email'} placeholder={'Email'} />
            <Button variant={"primary"}
                    label={"Request email"}
                    onPress={() => props.navigation.navigate("OTP")}
                    style={{
                        ...margin(74,0)
                    }}
            />
          <View style={{justifyContent:"center",alignItems:'center'}}>
              <Button label={'Go Back'}
                      variant={'link'}
                      onPress={() => props.navigation.goBack()}
              />
          </View>
        </Screen>
    );
};
