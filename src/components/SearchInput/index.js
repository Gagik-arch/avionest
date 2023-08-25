import React from 'react'
import s from './style'
import { View } from "react-native";
import { Icon, Input } from "../../core";

export const SearchInput = ()=>{

  return (
      <Input frontIcon={<Icon type={'Search'}/>}
             placeholder={'Search'}
             containerStyles={s.input_container}
      />
  )
}
