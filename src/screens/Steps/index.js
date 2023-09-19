import React, {useRef, useState} from 'react'
import s from './style'
import {Button, Screen, Text} from '../../core'
import PagerView from 'react-native-pager-view';
import {View, ImageBackground} from "react-native";
import step1 from '../../../assets/images/step_1.png'
import step2 from '../../../assets/images/step_2.png'
import step3 from '../../../assets/images/step_3.png'
import {Colors} from "../../resources";
import global from '../../styles/global'

export const Steps = (props) => {
    const [selected, setSelected] = useState(0);
    const viewPager = useRef();

    return (
        <Screen style={s.container}>
            <PagerView style={s.pagerView}
                       ref={viewPager}
                       initialPage={0}
                       onPageSelected={e => {
                           const {position} = e.nativeEvent;
                           setSelected(position);
                       }}
                       scrollEnabled={false}
            >
                <ImageBackground source={step1} style={[s.bg]} key="1">
                    <Text style={global.app_title}>Plan Your Trip</Text>
                    <Text style={{textAlign: 'center'}}>
                        With just a single click, you can effortlessly plan your trip, access key information about your selected destination, and promptly secure your parking reservation
                    </Text>
                    <Button variant={'link'}
                            label={'Skip'}
                            onPress={() => viewPager.current.setPage(1)}
                    />
                </ImageBackground>
                <ImageBackground source={step2} style={[s.bg]} key="2">
                    <Text style={global.app_title}>Secured payment</Text>
                    <Text style={{textAlign: 'center'}}>
                        Our secure payment platform enables you to swiftly reserve your parking spot, giving you peace of mind for your upcoming flight.
                    </Text>
                    <Button variant={'link'} label={'Skip'}
                            onPress={() => viewPager.current.setPage(2)}
                    />
                </ImageBackground>
                <ImageBackground source={step3} style={[s.bg]} key="3">
                    <Text style={global.app_title}>Ready for take off !</Text>
                    <Text style={{textAlign: 'center'}}>
                        Off you go! Your spot is now booked, you can start your journey.
                    </Text>
                    <Button variant={'primary'}
                            label={'Let’s Started!'}
                            onPress={() => {
                                props.navigation.navigate('Welcome')
                            }}
                    />
                </ImageBackground>
            </PagerView>
            <View style={s.dots}>
                {
                    Array.from({length: 3}, (_, k) => <View key={k}
                                                            style={[s.dot, {backgroundColor: selected === k ? Colors.darkBlue : Colors.lightBlue}]}
                    />)
                }
            </View>
        </Screen>
    )
}
