import React, {useContext, useState} from "react";
import s from "./style";
import {Button, Icon, Input, NavigationHeader, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import forgotPasswordFrame from '../../../../assets/images/forgot-password-frame.png'
import {Image, View} from "react-native";
import {margin} from "../../../resources";
import {VerificationSuccessful} from "../../../modals";

export const NewPassword = (props) => {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <Screen style={s.container}>
            <View style={s.top}>
                <Image source={forgotPasswordFrame}/>
            </View>
            <Text style={[global.app_title, {textAlign: 'center'}]}
                  size={"24_400"}>
                Create new password
            </Text>
            <Text style={[{...margin(14, 0,60,0)},{textAlign: 'center'}]}>
                Your new password must be different from previously used passwords.
            </Text>
            <Input placeholder={'Password'}/>
            <Button label={'Send'}
                    variant={'primary'}
                    style={{
                        ...margin(74, 0)
                    }}
                    onPress={()=>{
                        setIsSuccess(true)
                    }}
            />
            <VerificationSuccessful visibility={isSuccess}
                                    setVisibility={setIsSuccess}
                                    onSubmit={()=>{
                                        setIsSuccess(false)
                                    }}
            />
        </Screen>
    );
};
