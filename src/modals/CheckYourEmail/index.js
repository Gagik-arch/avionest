import React from 'react'
import s from './style'
import {Modal, View, Image} from "react-native";
import {Button, Text} from "../../core";
import global from "../../styles/global";
import welcomeFrame from '../../../assets/images/welcome-frame.png'

export const CheckYourEmail = ({
                                    visibility,
                                    setVisibility,
                                }) => {

    return (
        <Modal visible={visibility}
               animationType="fade"
        >
            <View style={s.container}>
                <Image source={welcomeFrame} style={{width: '100%'}}/>
                <View style={s.block}>
                    <Text style={[global.app_title, {textAlign: 'center', marginBottom: 25}]}>
                        Welcome to Avionest!
                    </Text>
                    <Text style={s.text}>
                        Flypark aim to facilitate your journey by allowing
                        you to prebook parking space in all partnering
                        airfields in France. With a simple click, plan your
                        arrival with peace of mind and keep your aircraft
                        in a safe and covered hangar for the duration of
                        your stay.
                    </Text>
                    <Button label={'Let’s Go'}
                            variant={'primary'}
                            onPress={() => {
                                setVisibility(false)
                            }}
                    />
                </View>
            </View>
        </Modal>
    )
}
