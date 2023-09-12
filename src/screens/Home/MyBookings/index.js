import React, {useState} from 'react'
import s from './style'
import {Button, DropDown, Icon, Switch, NavigationHeader, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {Colors, margin, onChangeBody} from "../../../resources";
import DatePicker from "../../../core/DatePicker";
import {View} from 'react-native'

export const MyBookings = (props) => {
    const [body, setBody] = useState({})

    const onChange = (e) => {
        onChangeBody(e, body, setBody)
    }

    return (
        <Screen footer={<Button label={'Book'} variant={'primary'} style={{...margin(16, 48)}}/>}
                header={<NavigationHeader title={<>
                    <Icon type={'Plane'} size={22}/>
                    <Text size={'14_400'} style={{color: 'white'}}>LFLI Aeroclub Annemasse</Text>
                </>}
                                          style={s.header_container}
                                          backHandler={
                                              <Button style={{columnGap: 18}}
                                                      onPress={() => {
                                                          props.navigation.goBack()
                                                      }}>
                                                  <Icon type={'ArrowLeft'} fill={'white'} size={22}/>
                                              </Button>
                                          }
                                          buttons={
                                              <>
                                                  <Button>
                                                      <Icon type={'Bell'} fill={'white'} size={22}/>
                                                  </Button>
                                                  <Button onPress={() => {
                                                      props.navigation.openDrawer();
                                                  }}>
                                                      <Icon type={'Bars'} fill={'white'}/>
                                                  </Button>
                                              </>
                                          }
                                          {...props}/>}
        >
            <View style={s.top}>
                <Text style={{color: 'white'}}>Long term parking fee >24hrs-32euros/day</Text>
                <Switch style={{borderColor: 'white', backgroundColor: 'white'}}
                        switchStyle={{
                            backgroundColor: Colors.darkBlue,
                            borderColor: Colors.darkBlue,
                        }}
                        activeStyle={{
                            backgroundColor: Colors.darkBlue,
                            borderColor: 'white',
                        }}
                        switchActiveStyle={{
                            borderColor: 'white',
                            backgroundColor: 'white'

                        }}
                />
            </View>
            <View style={s.container}>
                <Text style={{color: Colors.darkBlue, ...margin(0, 0, 10, 0)}} size={'14_400'}>Pick your parking
                    time</Text>
                {renderList()}
                {renderList()}
                {renderList()}
                <Text size={'10_400'}
                      style={{color: '#8D8D8D', ...margin(10, 0)}}
                >
                    You have booking for 22 days
                </Text>
                <View style={{alignItems: "flex-end"}}>
                    <Text size={'16_400'} style={{color: Colors.darkBlue}}>Cost 47 Euros</Text>
                </View>
            </View>
        </Screen>
    )
}

const renderList = () => {

    return (
        <View style={s.list}>
            <Icon type={'Calendar'} size={18}/>
            <Text style={{color: '#0A0A0A'}}
                  size={'14_400'}
            >
                {new Date().toLocaleDateString('en', {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                })}
            </Text>
        </View>
    )
}
