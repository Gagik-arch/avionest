import React, {useState} from 'react'
import s from './style'
import {Button, Icon, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {margin} from "../../../resources";
import {Image, View} from 'react-native'
import mastercardImage from '../../../../assets/images/mastercard.png'
import visaImage from '../../../../assets/images/visa.png'
import {PaymentModal} from "../../../modals";

export const Payments = () => {
    const [visibility, setVisibility] = useState(false)

    const onPressModal = ()=>{
        setVisibility(true)
    }

    return (
        <Screen>
            <Text style={[global.app_title, {...margin(100, 52, 40, 52)}]}>
                Payment Method
            </Text>
            {renderCardList({
                name: 'Master Card',
                number: '2123123555554568',
                image: mastercardImage,
                onPress:onPressModal
            })}
            {renderCardList({
                name: 'Visa',
                number: '2123123555555645',
                image: visaImage,
                onPress:onPressModal
            })}
            <Button label={'Add Payment method'}
                    variant={'primary'}
                    style={{...margin(208, 55, 0, 55)}}
            />
            <PaymentModal visibility={visibility} setVisibility={setVisibility}/>
        </Screen>
    )
}

const renderCardList = ({
                            name,
                            number,
                            image,
    onPress = ()=>{}
                        }) => {

    return (
        <Button style={s.container_list} onPress={onPress}>
            <View style={s.block_list}>
                <Image source={image}/>
                <View>
                    <Text size={'18_400'} style={{color: '#454545'}}>{name}</Text>
                    <Text style={s.card_number} size={'14_400'}>
                        **** **** **** {number.substring(number.length - 4, number.length)}
                    </Text>
                </View>
            </View>
            <Icon type={'ChevronRight'} stroke={'#787777'} size={20}/>
        </Button>
    )
}
