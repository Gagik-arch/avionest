import React, {useEffect, useMemo, useState} from 'react'
import s from './style'
import {Screen, Text, Button, NavigationHeader, Icon, DropDown} from '../../../core'
import {View} from "react-native";
import a from '../../../../assets/images/a.jpg'
import b from '../../../../assets/images/b.jpg'
import c from '../../../../assets/images/c.jpg'
import d from '../../../../assets/images/d.jpg'
import {Colors, margin} from "../../../resources";
import {Slider} from '../../../components'
import globalApi from "../../../api/globalApi";
import moment from "moment";
import {Compass} from "../../../core";
import env from "../../../env";
import airfieldsApi from "../../../api/airfieldsApi";

export const Aeroclub = (props) => {
    const state = useMemo(() => props.route.params, [])
    const [selected, setSelected] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const images = [a, b, c, d]
    const plans = [
        {label: `Short term parking fee <24hrs-${state.data.airfield?.short_hr_price_eur} euros/hr`, id: 1},
        {label: `Long term parking fee >24hrs-${state.data.airfield?.long_day_price_eur} euros/day`, id: 2},
    ]

    const onConfirm = () => {
        setIsLoading(true)
        const body = {
            paymentMethod: selected,
            dateEnd: moment(state.body.endDate).format('YYYY-MM-DD hh:mm'),
            dateStart: moment(state.body.startDate).format('YYYY-MM-DD hh:mm'),
            oaciId: 5,
            space_type:state.body.space_type,
        }
        airfieldsApi.calcBookPrice(body)
            .then(res => {
                props.navigation.reset({
                    index: 0,
                    routes: [{name: "ViewBook", params: {data: res.data, body, paymentMethod: selected}}]
                });
            })
            .catch(e => {
                console.log(e)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

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
                                                  props.navigation.goBack({a: 1});
                                              }} style={{...margin(0, 10, 0, 0)}}>
                                                  <Icon type={'ArrowLeft'} fill={'white'}/>
                                              </Button>
                                              <Icon type={'Plane'} fill={'white'}/>
                                              <Text style={{
                                                  color: '#fff',
                                                  marginLeft: 10
                                              }}>{state.data.airfield?.airfield_name}</Text>
                                          </>
                                          }
                                          {...props}/>}>
            <Slider data={state?.data?.airfield?.images?.length ?
                state?.data?.airfield?.images.map(i => ({uri: env.APP_URL + i.file_path})) :
                images}
            />
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
                            <Text size={'14_400'}
                                  style={{
                                      color: index === selected ? 'white' :
                                          Colors.darkBlue
                                  }}
                            >
                                {item.label}
                            </Text>
                        </Button>
                    )
                })}
            </View>
            <View style={s.container}>
                <Text style={s.name} size={'16_400'}>LFLI aeroclub Annemasse, Information</Text>
                <View style={s.runway_container}>
                    {
                        state.data.airfield.runways.map((item, index) => {
                            return <Runway key={index} item={item}/>
                        })
                    }
                </View>
                {renderList(`${state.data.airfield.spaces_count} parking spaces`)}
                <Button variant={'primary'}
                        label={'Book space'}
                        style={{...margin(40, 0)}}
                        onPress={onConfirm}
                />

            </View>


        </Screen>
    )
}

const Runway = ({item}) => {
    const [compassVisibility, setCompassVisibility] = useState(false)
    const [value, setValue] = useState(0)

    return (
        <>
            <View style={s.list_container}>
                <Text>Runway {value.runaway} {item.title}</Text>
                <Button labelSize={'18_400'}
                        style={s.runway_add_btn}
                        onPress={() => {
                            setCompassVisibility(true)
                        }}
                >
                    <Icon type={'PlusCircle'} stroke={'rgba(0,0,0,0.3)'} size={22}/>
                </Button>
            </View>
            <Compass visibility={compassVisibility}
                     degree={value.degree}
                     onClose={() => {
                         setCompassVisibility(false)
                     }}
                     onFinish={(e) => {
                         setValue(e)
                         setCompassVisibility(false)
                     }}
            />
        </>
    )
}

const renderList = (title = '') => {
    return (
        <View style={s.list_container}>
            <Text>{title}</Text>
        </View>
    )
}
