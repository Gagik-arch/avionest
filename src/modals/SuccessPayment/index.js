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
import {useNavigation} from "@react-navigation/native";

export const SuccessPayment = ({
                                   visibility,
                                   setVisibility,
                                   state = null,
                                   body,
                               }) => {
    const navigation = useNavigation()
    const startD = moment(body.dateStart);
    const endD = moment(body.dateEnd);
    const duration = moment.duration( endD.diff(startD)   );

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
                            <Text size={'18_600'}
                                  style={[{
                                      textAlign: 'center',
                                      color: Colors.darkBlue,
                                      marginBottom: 20
                                  }]}
                            >
                                Summary of your booking
                            </Text>
                            <Text size={'15_400'}
                                  style={[{textAlign: 'center'}]}
                            >
                                {startD.format('HH:MM')}
                                {' '}
                                on
                                {' '}
                                {startD.format('dddd')}
                                {' '}
                                {startD.format('DD')}th
                                {' '}
                                {startD.format('MMM YY')}
                            </Text>
                            <Text size={'15_400'}
                                  style={[{textAlign: 'center', ...margin(12, 0)}]}
                            >
                                {duration.asDays()}{' '} days booked
                                in {body.space_type === 'parking' ? 'outdoor space' : 'covered ' + body.space_type}
                            </Text>
                            <Text size={'15_400'}
                                  style={[{textAlign: 'center', ...margin()}]}
                            >
                                Parking expiry
                            </Text>
                            <Text size={'15_400'}
                                  style={[{textAlign: 'center', ...margin(10, 0)}]}
                            >
                                {endD.format('HH:MM')}
                                {' '}
                                on
                                {' '}
                                {endD.format('dddd')}
                                {' '}
                                {endD.format('DD')}th
                                {' '}
                                {endD.format('MMM YY')}
                            </Text>
                            <Text size={'14_500'}
                                  style={{textAlign: 'center', color: 'rgba(220,0,0,0.9)'}}
                            >
                                Amount Total price: {state?.amount?.currencyFormat()} Euros
                            </Text>
                        </View>
                        <Button label={`Go to home`}
                                onPress={() => {
                                    setVisibility(null)
                                    navigation.reset({index: 0, routes: [{name: "Home"}]});
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
