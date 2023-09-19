import React, {useRef, useState, useEffect} from 'react'
import s from './style'
import {Modal, View, BackHandler} from "react-native";
import Button from "../Button";
import Icon from "../Icon";
import {Colors} from "../../resources";
import Color from 'react-native-wheel-color-picker'

const ColorPicker = ({
                         value = '#FF0000',
                         onChange = () => {
                         },
                         name,
                     }) => {
    const [visibility, setVisibility] = useState(false)
    let ref = useRef()

    useEffect(() => {
        function handleBackButtonClick() {
            setVisibility(false)
            return true;
        }

        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const onColorChangeComplete = (e) => {
        onChange({value: e, name})
    }

    return (
        <>
            <Button label={'Color'}
                    style={s.container}
                    labelSize={'14_400'}
                    labelStyle={{color: '#787777'}}
                    onPress={() => {
                        setVisibility(true)
                    }}
            />

            <Modal visible={visibility}>
                <View style={s.block}>
                    <View style={s.top}>
                        <Button onPress={() => {
                            setVisibility(false)
                        }}>
                            <Icon type={'X'} stroke={Colors.darkBlue}/>
                        </Button>
                    </View>
                    <View style={{flex: 1}}>
                        <Color color={value}
                               ref={r => {
                                   ref = r
                               }}
                               swatchesOnly={false}
                               onColorChangeComplete={onColorChangeComplete}
                               thumbSize={20}
                               sliderSize={50}
                               noSnap={false}
                               row={false}
                               swatchesLast={true}
                               swatches={true}
                               discrete={false}
                               discreteLength={20}
                        />
                    </View>
                </View>
            </Modal>
        </>

    )
}

export default ColorPicker
