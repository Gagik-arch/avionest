import React from 'react'
import s from './style'
import {Modal, View,Text,Image} from "react-native";
import comp from '../../../assets/images/compass.png'

export const Compass = ({
                            visibility = false,
                            setVisibility,
                            onSubmit = () => {
                            }
                        }) => {

    return (
        <Modal visible={visibility}
               animationType="fade"
        >
            <View style={s.container}>
                <Text>add</Text>
                <View style={s.block}>
                    <Image source={comp}/>
                </View>

            </View>
        </Modal>
    )
}
