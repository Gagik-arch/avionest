import React, {useEffect, useRef, useState} from 'react'
import s from './style'
import {Button, Icon, NavigationHeader, Screen, Switch, Text} from "../../../core";
import {View} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import env from "../../../env";
import {SelectLocation} from "../../../sheets";
import {onChangeBody} from "../../../resources";
import longPressGestureHandler from "react-native-gesture-handler/src/web_hammer/LongPressGestureHandler";
import {useDispatch, useSelector} from "react-redux";
import {getAuthSources} from "../../../store/asyncThunks/global";
import global from "../../../styles/global";

export const Location = (props) => {
    const sheetRef = useRef()
    const [airfields, setAirfields] = useState([])
    const [body, setBody] = useState({space_type: 'hangar'})
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!Object.keys(global.data).length) {
            dispatch(getAuthSources())
        }
    }, [global])

    const [region, setRegion] = useState({
        latitude: 47.107184,
        longitude: 2.264011,
        latitudeDelta: 10,
        longitudeDelta: 10,
    });

    const onChange = (e) => onChangeBody(e, body, setBody)

    return (
        <>
            <Screen header={<NavigationHeader style={s.header}
                                              title={<></>}
                                              buttons={<View
                                                  style={{flexDirection: "row", columnGap: 10, alignItems: "center"}}>
                                                  <Switch style={{borderColor: "white"}}
                                                          name={'space_type'}
                                                          value={body?.space_type === 'hangar'}
                                                          containerStyle={{columnGap: 8}}
                                                          onChange={(e) => {
                                                              onChange({
                                                                  value: e.value ? 'hangar' : 'outdoor',
                                                                  name: e.name
                                                              })
                                                          }}
                                                  >
                                                      {(e) => {
                                                          return (
                                                              <Text style={{color: 'white'}} size={'16_500'}>
                                                                  {e?.value ? 'hangar'.toUpperCaseFirstChar() : 'outdoor'.toUpperCaseFirstChar()}
                                                              </Text>
                                                          )
                                                      }}
                                                  </Switch>
                                                  <Button onPress={() => props.navigation.openDrawer()}>
                                                      <Icon type={'Bars'} fill={'white'}/>
                                                  </Button>
                                              </View>}
                                              {...props}/>
            }>
                <View style={s.top}>
                    <View style={[s.top_btn, {backgroundColor: '#fff'}]}>
                        <Icon type={'Mark'} size={16} fill={'#F4909E'}/>
                        <Text size={'10_400'} style={s.top_btn_text}>No space available</Text>
                    </View>
                    <View style={s.divider}/>
                    <View style={[s.top_btn, {backgroundColor: '#fff'}]}>
                        <Icon type={'Mark'} size={16} fill={'#67E0D4'}/>
                        <Text size={'10_400'} style={s.top_btn_text}>Available space</Text>
                    </View>
                    <View style={s.divider}/>
                    <View style={[s.top_btn, {backgroundColor: '#fff'}]}>
                        <Icon type={'Mark'} size={16} fill={'#FFDF7A'}/>
                        <Text size={'10_400'} style={s.top_btn_text}>50% space available</Text>
                    </View>
                    <View style={s.divider}/>
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
                                    onPress={() => props.navigation.navigate('Aeroclub')}
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
                            body={body}
                            setBody={setBody}
                            OACIData={global.data?.oaciList}
            />
        </>
    )
}
