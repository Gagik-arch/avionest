import React from 'react'
import s from './style'
import { Button, Screen, Text } from "../../core";
import { Image, View } from "react-native";
// import noNetwork from '../../../assets/images/no_wifi.png'

export  const NoNetwork = ()=>{
  return (
    <Screen style={s.container}
      footer={<Button label={'Refresh'} variant={'primary'}/>}>
<View style={s.block}>
  {/*<Image source={noNetwork} />*/}
  <Text size={'26_600'} style={{marginVertical:10}}>Ooooops!</Text>
  <Text size={'17_400'} style={{textAlign:'center'}}>
    Slow or no internet connection. Please check your internet connection.!
  </Text>
</View>
    </Screen>
  )
}
