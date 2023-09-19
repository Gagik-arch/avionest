import React, {useState} from 'react'
import s from './style'
import {Screen, Text, Button} from '../../../core'
import {View, Image} from "react-native";
import a from '../../../../assets/images/a.jpg'
import b from '../../../../assets/images/b.jpg'
import c from '../../../../assets/images/c.jpg'
import d from '../../../../assets/images/d.jpg'
import {Colors, margin} from "../../../resources";
import {Slider} from '../../../components'

export const Aeroclub = () => {
    const [selected, setSelected] = useState(0)
    const images = [a, b, c, d]
    const breadcrumbs = [
        'Short term parking fee <24hrs-7euros/hr',
        'Long term parking fee >24hrs-32euros/day',
    ]

    return (
        <Screen>
            <Slider data={images}/>
            <View style={{rowGap: 6}}>
                {breadcrumbs.map((item, index) => {
                    return (
                        <Button key={index}
                                style={[s.breadcrumbs,
                                    {
                                        backgroundColor: index === selected ?
                                            Colors.darkBlue : '#F5F5F5'
                                    }
                                ]}
                                onPress={() => {
                                    setSelected(index)
                                }}>
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
                            }}>Long term parking fee >24hrs-32euros/day</Text>
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
