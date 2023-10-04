import React, {useRef, useState} from 'react'
import s from './style'
import {Button, Icon, NavigationHeader, Screen, Text} from "../../../core";
import {PixelRatio, View} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import env from "../../../env";
import {SelectLocation} from "../../../sheets";

export const Location = (props) => {
    const sheetRef = useRef()
    const [airfields, setAirfields] = useState([])
    const [region, setRegion] = useState({
        latitude: 47.107184,
        longitude: 2.264011,
        latitudeDelta: 10,
        longitudeDelta: 10,
    });

    const openDrawer = () => props.navigation.openDrawer();

    const onPressMarker = () => props.navigation.navigate('Aeroclub')


    return (
        <>
            <Screen header={<NavigationHeader style={s.header}
                                              title={<></>}
                                              buttons={<Button onPress={openDrawer}>
                                                  <Icon type={'Bars'} fill={'white'}/>
                                              </Button>}
                                              {...props}/>
            }>
                <View style={s.top}>
                    <Button style={s.top_btn}>
                        <Icon type={'Mark'} size={16} fill={'#F4909E'}/>
                        <Text size={'10_400'}>No space available</Text>
                    </Button>
                    <View style={s.divider}/>
                    <Button style={s.top_btn}>
                        <Icon type={'Mark'} size={16} fill={'#67E0D4'}/>
                        <Text size={'10_400'}>Available space</Text>
                    </Button>
                    <View style={s.divider}/>
                    <Button style={s.top_btn}>
                        <Icon type={'Mark'} size={16} fill={'#FFDF7A'}/>
                        <Text size={'10_400'}>50% space available</Text>
                    </Button>
                </View>
                <MapView key={env.GOOGLE_MAP_KEY}
                         provider={PROVIDER_GOOGLE}
                         style={s.map}
                         region={region}
                         mapType={'standard'}
                         showsCompass={true}
                         onPress={() => sheetRef.current.snapToIndex(0)}
                >
                    {airfields.map(item => {
                        return (
                            <Marker key={item.id}
                                    onPress={onPressMarker}
                                    title={'Region name ' + item.id}
                                    description={`Free space count is ${item.free_spaces_count}`}
                                    coordinate={{
                                        latitude: +item.latitude,
                                        longitude: +item.longitude,
                                    }}
                            >
                                <Icon type={'Mark'} fill={item.free_spaces_count > 0 ? '#67E0D4' : '#F4909E'}/>
                            </Marker>
                        )
                    })}
                </MapView>
            </Screen>
            <SelectLocation ref={sheetRef}
                            setAirfields={setAirfields}
                            setRegion={setRegion}
                            onClose={() => sheetRef.current.close()}
            />
        </>
    )
}
