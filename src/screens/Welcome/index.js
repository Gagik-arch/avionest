import React, {useRef, useState} from 'react'
import s from './style'
import {Button, Screen, Text} from '../../core'
import clouds from "../../../assets/images/clouds.png";
import logo from "../../../assets/images/logo.png";
import {ImageBackground, Image, View} from "react-native";
import {margin} from "../../resources";

export const Welcome = (props) => {

    return (
        <ImageBackground source={clouds} style={[s.bg]}>
            <Screen style={s.container} scrollDisable={true}>
                <View style={{flex: 1}}/>
                <Image source={logo}/>
                <View style={{flex: 1}}/>
                <Text size={'24_400'} style={{color: 'white', textAlign:'center'}}>
                    Let’s Start Trip
                </Text>
                <Text style={{color: 'white' ,...margin(32,0),textAlign:'center'}}>
                    Intuitive real life experience on mobile.
                </Text>
                <Button label={'Go to Sign in'}
                        variant={'primary'}
                        style={{...margin(0,0,14,0)}}
                        onPress={()=>{
                            props.navigation.navigate('Signin')
                        }}
                />
                <Button label={'Don\'t have an account yet? Sign Up'}
                        variant={'secondary'}
                        onPress={()=>{
                            props.navigation.navigate('Signup')
                        }}
                />
            </Screen>
        </ImageBackground>
    )
}
