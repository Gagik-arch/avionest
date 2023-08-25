import React from 'react'
import s from './style'
import { View } from "react-native";
import {Text} from "../../core";

export const Divider = ({text = 'Or'})=>{

  return (
    <View style={s.container}>
      <View style={s.line}/>
      <Text>{text}</Text>
      <View style={s.line}/>
    </View>
  )
}
