import {Button, Icon, NavigationHeader, Screen, Switch, Text} from "../../../core";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAuthSources} from "../../../store/asyncThunks/global";
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store/reducers";
import {CustomCallout} from "../../../components";
import {onChangeBody} from "../../../resources";
import globalApi from "../../../api/globalApi";
import {SelectLocation} from "../../../sheets";
import authApi from "../../../api/authApi";
import {View, Image} from "react-native";
import env from "../../../env";
import moment from "moment";
import s from './style'
import LogoIcon from '../../../../assets/images/LogoIcon.png'

export const Location = (props) => {
    const sheetRef = useRef()
    const [airfields, setAirfields] = useState([])
    const [oacies, setOacies] = useState([])
    const [body, setBody] = useState({space_type: 'hangar'})
    const global = useSelector(state => state.global)
    const dispatch = useDispatch()
    const [region, setRegion] = useState({
        latitude: 47.107184, longitude: 2.264011, latitudeDelta: 10, longitudeDelta: 10,
    });

    useEffect(() => {
        if (!Object.keys(global.data).length) {
            dispatch(getAuthSources())
        }
    }, [global])

    useEffect(() => {
        globalApi.getAirfieldByRange(
            body.startDate ? moment(body.startDate).format('YYYY-MM-DD HH:MM') : undefined,
            body.endDate ? moment(body.endDate).format('YYYY-MM-DD HH:MM') : undefined,
            body?.spaceType,
        )
            .then(res => {
                setOacies(res.data.oacies)
                setAirfields(res.data.airfields.filter(item => item.id))
                if (res?.data?.airfields?.length > 0) {
                    setRegion({
                        latitude: 48.850723,
                        longitude: 2.349352,
                        latitudeDelta: 3,
                        longitudeDelta: 3,
                    })
                }
            })
            .catch(e => {
                if (e.response.status === 401) {
                    refreshTokenOn401()
                }
            })
    }, [body])

    const refreshTokenOn401 = async () => {
        try {
            let refreshToken = await AsyncStorage.getItem('token')
            refreshToken = JSON.parse(refreshToken).refreshToken
            authApi.refreshToken({refreshToken})
                .then(res => {
                    Promise.all([
                        AsyncStorage.setItem('token', JSON.stringify(res.data.tokens)),
                        AsyncStorage.setItem('user', JSON.stringify(res.data.user))
                    ])
                        .then(() => {
                            dispatch(authActions.setUserData(res.data));
                        })
                        .catch(e => {
                            console.log(1313, e)
                        })
                })
                .catch(e => {
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }
    const onChange = (e) => onChangeBody(e, body, setBody)

    return (<>
        <Screen header={<NavigationHeader style={s.header}
                                          title={<></>}
                                          buttons={<View style={{
                                              flexDirection: "row",
                                              columnGap: 10,
                                              alignItems: "center"
                                          }}
                                          >
                                              <Switch style={{borderColor: "white"}}
                                                      name={'space_type'}
                                                      value={body?.space_type === 'hangar'}
                                                      containerStyle={{columnGap: 8}}
                                                      onChange={(e) => {
                                                          onChange({
                                                              value: e.value ? 'hangar' : 'parking', name: e.name
                                                          })
                                                      }}
                                              >
                                                  {(e) => {
                                                      return (<Text style={{color: 'white'}} size={'16_500'}>
                                                          {e?.value ? 'hangar'.toUpperCaseFirstChar() : 'outdoor'.toUpperCaseFirstChar()}
                                                      </Text>)
                                                  }}
                                              </Switch>
                                              <Button onPress={() => props.navigation.openDrawer()}>
                                                  <Icon type={'Bars'} fill={'white'}/>
                                              </Button>
                                          </View>}
                                          {...props}/>}
        >
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
            {<MapView key={env.GOOGLE_MAP_KEY}
                      provider={PROVIDER_GOOGLE}
                      style={s.map}
                      region={region}
                      mapType={'standard'}
                      showsCompass={true}

            >
                {airfields?.map((item, i) => {
                    return (
                        <Marker key={i}
                                tracksViewChanges={false}
                                onPress={() => {
                                    sheetRef.current.snapToIndex(0)
                                }}
                                coordinate={{
                                    latitude: +item.latitude, longitude: +item.longitude,
                                }}
                        >
                            <Image source={LogoIcon} style={s.logoIcon}/>
                            {/* <Icon type={'Mark'} fill={item.free_spaces_count > 0 ? '#67E0D4' : '#F4909E'}/>*/}
                            <Callout>
                                <CustomCallout item={item}/>
                            </Callout>
                        </Marker>
                    )
                })}
                {oacies?.map((item, i) => {
                    return (
                        <Marker key={i}
                                tracksViewChanges={false}
                                title={item.airfield_name}
                                description={item.city}
                                onPress={() => {
                                    // sheetRef.current.snapToIndex(0)
                                }}
                                coordinate={{
                                    latitude: +item.latitude, longitude: +item.longitude,
                                }}
                        >
                            <Icon type={'Mark'} fill={'rgba(135,135,135,.4)'}/>
                        </Marker>
                    )
                })}
            </MapView>}
        </Screen>
        <SelectLocation ref={sheetRef}
                        setRegion={setRegion}
                        body={body}
                        setBody={setBody}
            // OACIData={global.data?.oaciList}
                        OACIData={airfields}
                        onSubmit={() => {
                            sheetRef.current?.close()
                        }}
        />
    </>)
}
