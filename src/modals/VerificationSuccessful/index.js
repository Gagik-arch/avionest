import React from 'react'
import s from './style'
import {Modal, View, Image} from "react-native";
import {Button, Text} from "../../core";
import global from "../../styles/global";
import successFrame from '../../../assets/images/success.png'
import {Colors, margin} from "../../resources";

export const VerificationSuccessful = ({
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
                    <Image source={successFrame}/>
                </View>
                <Text style={[global.app_title, {textAlign: 'center', marginBottom: 25}]}>
                    Check your email
                </Text>
                <Text style={s.text}>You now have full access to our system</Text>
                <Button label={'Let’s Go'}
                        variant={'primary'}
                        onPress={onSubmit}
                        style={{
                            ...margin(43, 0,0,0)
                        }}
                />
            </View>
        </Modal>
    )
}
