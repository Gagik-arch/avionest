import React, {useState} from 'react'
import s from './style'
import {Button, Icon, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {margin} from "../../../resources";
import {Image, View} from 'react-native'
import mastercardImage from '../../../../assets/images/mastercard.png'
import visaImage from '../../../../assets/images/visa.png'
import {PaymentModal} from "../../../modals";

export const Profile = () => {

    return (
        <Screen>
            <Text style={[global.app_title]}>
                Profile
            </Text>
        </Screen>
    )
}


