import React, {useLayoutEffect, useMemo, useRef, useState} from 'react'
import s from './style'
import {View, Animated, Dimensions, Modal} from "react-native";
import {GestureDetector, Gesture, GestureHandlerRootView,} from 'react-native-gesture-handler';
import {Button, Text} from '../index'
import Icon from "../Icon";

const {width, height} = Dimensions.get('window')

const Compass = ({
                     visibility = false,
                     degree = 0,
                     onClose,
                     onChange,
                     onFinish,
                 }) => {
    const [_degree, _setDegree] = useState(degree)

    useLayoutEffect(() => {
        _setDegree(degree)
    }, [degree])

    const panChange = useMemo(() => {
        return Gesture.Pan()
            .onChange((e) => {
            const x = e.absoluteX
            const y = e.absoluteY

            const centerX = width / 2
            const centerY = height / 2
            const radians = Math.atan2(y - centerY, -(x - centerX))

            let __degree = (radians * (180 / Math.PI) * -1);
            if (__degree < 0) {
                __degree = 360 + __degree
            }
            _setDegree(__degree-90)
            onChange?.({degree: __degree-90, runaway})
        }).runOnJS(true)
    }, [_degree])

    const panEnd = useMemo(() => {
        return Gesture.Pan().onFinalize((e) => {
            onFinish({degree: angle, runaway})
        })
    }, [_degree])

    const angle = useMemo(() => _degree >= 0 ? Math.round(_degree) : Math.round(360 - Math.abs(_degree)), [_degree])

    const runaway = useMemo(() => {
        const text = angle.toString()
        const second = angle >= 180 ? (angle - 180) : (angle + 180)

        return `${text}/${second}`
    }, [_degree])

    const composed = Gesture.Simultaneous(panChange,panEnd)

    return (
        <Modal visible={visibility} animationType={'fade'}>
            <View
                style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%', top: 80}}>
                <Text size={'22_700'} style={s.text}>{runaway}</Text>
            </View>
            <Button style={s.close_icon}
                    onPress={onClose}
            >
                <Icon type={'X'} stroke={'black'}/>
            </Button>
            <GestureHandlerRootView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
            }}>
                <GestureDetector gesture={composed}>
                    <View style={[s.container,
                        {
                            width: width - 8,
                            height: width - 8,
                            borderRadius: width / 2
                        }
                    ]}>
                        <Animated.View style={[
                            s.arrow,
                            {transform: [{rotateZ: (_degree-90) + 'deg'},]},
                        ]}>
                            <View style={{
                                flex: 1,
                                backgroundColor: 'rgba(135,135,135,.2)',
                            }}/>
                            <View style={{
                                backgroundColor: 'rgba(240,50,10,.8)',
                                flex: 1,
                                borderTopRightRadius: 50,
                                borderBottomRightRadius: 50,
                            }}/>
                        </Animated.View>
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>

    )
}
export default Compass
