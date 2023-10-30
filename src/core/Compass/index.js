import React, {useMemo, useRef, useState} from 'react'
import s from './style'
import {View, Animated} from "react-native";
import {GestureDetector, Gesture,} from 'react-native-gesture-handler';

const Compass = () => {
    const oldCords = useRef({})
    const [rotate, setRotate] = useState(0)

    const panStart = useMemo(() => {
        return Gesture.Pan().onBegin((e) => {
            oldCords.current = {
                x: e.absoluteX,
                y: e.absoluteY
            }
        })
    }, [oldCords])


    const panChange = useMemo(() => {
        return Gesture.Pan().onChange((e) => {
            const oX = oldCords.current.x
            const oY = oldCords.current.y

            setRotate(
                Math.sqrt(Math.pow(e.absoluteX - oX,2)+ Math.pow(e.absoluteY - oY,2))
            )
        })
    }, [oldCords])

    const panEnd = useMemo(() => {
        return Gesture.Pan().onFinalize((e) => {
            oldCords.current = {}
        })
    }, [oldCords])

    const composed = Gesture.Simultaneous(panChange, panStart, panEnd)


    return (
        <GestureDetector gesture={composed}>
            <View style={s.container}>
                <Animated.View style={[
                    s.arrow,
                    {
                        transform: [
                            {rotateZ: rotate + 'deg'}
                        ]
                    },
                ]}/>
            </View>
        </GestureDetector>

    )
}
export default Compass
