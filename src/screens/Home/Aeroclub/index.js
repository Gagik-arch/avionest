import React, {useState} from 'react'
import s from './style'
import {Screen, Text, Button, NavigationHeader, Icon} from '../../../core'
import {View, Image} from "react-native";
import a from '../../../../assets/images/a.jpg'
import b from '../../../../assets/images/b.jpg'
import c from '../../../../assets/images/c.jpg'
import d from '../../../../assets/images/d.jpg'
import smallPlane from '../../../../assets/images/plane.png'
import {Colors, margin} from "../../../resources";
import {Slider} from '../../../components'

export const Aeroclub = (props) => {
    const [selected, setSelected] = useState(0)
    const images = [a, b, c, d]
    const plans = [
        {label: 'Short term parking fee <24hrs-7euros/hr', id: 1},
        {label: 'Long term parking fee >24hrs-32euros/day', id: 2},
    ]

    return (
        <Screen header={<NavigationHeader style={s.header}
                                          title={<></>}
                                          buttons={
                                              <Button onPress={() => {
                                                  props.navigation.openDrawer();
                                              }}>
                                                  <Icon type={'Bars'} fill={'white'}/>
                                              </Button>
                                          }
                                          backHandler={<>
                                              <Button onPress={() => {
                                                  props.navigation.goBack();
                                              }} style={{...margin(0,10,0,0)}}>
                                                  <Icon type={'ArrowLeft'} fill={'white'}/>
                                              </Button>
                                              <Icon type={'Plane'} fill={'white'}/>
                                          </>
                                          }
                                          {...props}/>}>
            <Slider data={images}/>
            <View style={{rowGap: 6}}>
                {plans.map((item, index) => {
                    return (
                        <Button key={index}
                                style={[s.breadcrumbs,
                                    {
                                        backgroundColor: index === selected ?
                                            Colors.darkBlue : '#D9D9D9'
                                    }
                                ]}
                                onPress={() => {
                                    setSelected(index)
                                }}
                        >
                            <View style={{
                                width: 14,
                                height: 14,
                                borderWidth: 1,
                                borderColor: index === selected ? 'white' : Colors.darkBlue,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {index === selected && <View style={{
                                    width: 8, height: 8,
                                    backgroundColor: 'white',
                                    borderRadius: 50
                                }}/>}
                            </View>
                            <Text size={'14_400'} style={{
                                color: index === selected ? 'white' :
                                    Colors.darkBlue
                            }}>{item.label}</Text>
                        </Button>
                    )
                })}
            </View>
            <View style={s.container}>
                <Text style={s.name} size={'16_400'}>LFLI aeroclub Annemasse, Information</Text>
                {renderList('Runway 12/30  1250 m')}
                {renderList('25 parking spaces')}
                {renderList('10 hangar spaces')}
                {renderList('AVGAS +JETFUEL available')}
                {renderList('ATS / NIGHT VFR / Repairs')}
                <Button variant={'primary'} label={'Book space'} style={{...margin(40, 0)}}/>
            </View>
        </Screen>
    )
}

const renderList = (title = '') => {
    return (
        <View style={s.list_container}>
            <Text>{title}</Text>
        </View>
    )
}
