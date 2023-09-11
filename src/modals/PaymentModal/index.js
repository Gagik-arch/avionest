import React from 'react'
import s from './style'
import {Modal, View, TouchableOpacity} from "react-native";
import {Button, Text} from "../../core";

export const PaymentModal = ({
                                 visibility,
                                 setVisibility,
                             }) => {

    return (
        <Modal visible={visibility}
               animationType="fade"
               transparent={true}
        >

            <View style={s.container}
                  activeOpacity={0}
            >
                <View style={s.block}>
                    <Text style={[s.title]} size={'20_400'}>
                        Remove Master Card?
                    </Text>
                    <Text style={s.subtitle}>
                        Master Card will be remove from your account
                    </Text>
                    <View style={s.btn_container}>
                        <Button label={'Cancel'}
                                style={s.btn}
                                labelSize={'20_400'}
                                labelStyle={s.btn_text}
                                onPress={() => {
                                    setVisibility(false)
                                }}
                        />
                        <View style={s.divider} />
                        <Button label={'Remove'}
                                style={s.btn}
                                labelStyle={s.btn_text}
                                labelSize={'20_400'}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
