import React from 'react'
import s from './style'
import {Button, Icon, NavigationHeader, Screen, Text} from "../../../core";
import {View} from "react-native";

export const Location = (props) => {

    return (
        <Screen header={<NavigationHeader style={s.header}
                                          title={<></>}
                                          buttons={
                                              <Button onPress={()=>{
                                                  props.navigation.openDrawer();
                                              }}>
                                                  <Icon type={'Bars'} fill={'white'}/>
                                              </Button>
                                          }
                                          {...props}/>}
        >
            <View style={s.top}>
                <Button style={s.top_btn}>
                    <Icon type={'Mark'} size={16} fill={'#F4909E'}/>
                    <Text size={'10_400'}>No space available</Text>
                </Button>
                <View style={s.divider}/>
                <Button style={s.top_btn}>
                    <Icon type={'Mark'} size={16} fill={'#67E0D4'}/>
                    <Text size={'10_400'}>No space available</Text>
                </Button>
                <View style={s.divider}/>
                <Button style={s.top_btn}>
                    <Icon type={'Mark'} size={16} fill={'#FFDF7A'}/>
                    <Text size={'10_400'}>No space available</Text>
                </Button>
            </View>
            <Text>Location</Text>
        </Screen>
    )
}
