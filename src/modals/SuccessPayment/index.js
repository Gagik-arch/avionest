import React from 'react'
import s from './style'
import {Modal, View, Image} from "react-native";
import {Button, Text} from "../../core";
import global from "../../styles/global";
import checkYourEmail from '../../../assets/images/check_your_email.png'
import {Colors, margin, padding} from "../../resources";
import LinearGradientBG from "../../core/LinearGradientBG";
import successImg from '../../../assets/images/success.png'
import moment from "moment/moment";

export const SuccessPayment = ({
                                   visibility,
                                   setVisibility,
                                   state = null,
                                   body,
                               }) => {

    return (
        <Modal visible={visibility}
               animationType="fade"
        >
            <LinearGradientBG styles={{height: '100%'}}>
                <View style={s.container}>
                    <View style={s.top}>
                        <Image source={successImg}/>
                    </View>
                    <View style={s.block}>
                        <Text size={'16_600'}
                              style={[global.app_title, {textAlign: 'center', marginBottom: 25}]}>
                            Your booking is confirmed
                        </Text>
                        <View style={{
                            backgroundColor: "#C5D8F8",
                            ...padding(21)
                        }}>
                            <Text size={'16_600'}
                                  style={[{
                                      textAlign: 'center',
                                      color: Colors.darkBlue,
                                      marginBottom: 20
                                  }]}
                            >
                                Summary of your booking
                            </Text>
                            <Text style={[{textAlign: 'center'}]}>
                                {moment(body.startDate).format('HH:MM')}
                                {' '}
                                on
                                {' '}
                                {moment(body.startDate).format('dddd')}
                                {' '}
                                {moment(body.startDate).format('DD')}th
                                {' '}
                                {moment(body.startDate).format('MMM YY')}
                            </Text>
                            <Text style={[{textAlign: 'center', ...margin(8, 0)}]}>
                                6 hours booked in  {body.space_type === 'parking' ? 'outdoor space' :  'covered ' +body.space_type}
                            </Text>
                            <Text style={[{textAlign: 'center'}]}>
                                Parking expiry {moment(body.endDate).format('HH:MM')}
                            </Text>
                        </View>

                        <Button label={`Total price: ${state?.amount} Euros`}
                                onPress={() => {
                                    setVisibility(null)
                                }}
                                labelSize={'24_400'}
                                labelStyle={{color: Colors.darkBlue}}
                                style={{...margin(18, 16, 0, 16)}}
                        />
                    </View>
                </View>
            </LinearGradientBG>

        </Modal>
    )
}
