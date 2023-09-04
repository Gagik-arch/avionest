import React from 'react'
import s from './style'
import {Modal, View, Image} from "react-native";
import {Button, Text} from "../../core";
import global from "../../styles/global";
import checkYourEmail from '../../../assets/images/check-your-email.png'
import {Colors, margin} from "../../resources";

export const CheckYourEmail = ({
                                   visibility,
                                   setVisibility,
                                   onSubmit = () => {
                                   }
                               }) => {

    return (
        <Modal visible={visibility}
               animationType="fade"
        >
            <View style={s.container}>
                <View style={s.top}>
                    <Image source={checkYourEmail}/>
                </View>
                <View style={s.block}>
                    <Text style={[global.app_title, {textAlign: 'center', marginBottom: 25}]}>
                        Check your email
                    </Text>
                    <Text style={s.text}>
                        We have sent a password recovery instruction
                        to your email
                    </Text>
                    <Text style={[{textAlign: 'center'}]}>
                        To rest your password, please click this link
                    </Text>
                    <Button labelSize={'10_600'}
                            label={'https://your service.com/reset-password/some-key'}
                            style={{...margin(18, 0, 0, 0) }}
                            labelStyle={{
                                textDecorationLine: 'underline',
                                color: Colors.darkBlue,
                                textAlign: 'center',
                            }}
                    />
                    <Button label={'Ok'}
                            variant={'primary'}
                            onPress={onSubmit}
                            style={{
                                ...margin(74, 0)
                            }}
                    />
                    <View style={{justifyContent: "center", alignItems: 'center'}}>
                        <Button label={'Go Back'}
                                variant={'link'}
                                onPress={() => setVisibility(false)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
