import React, {useEffect, useMemo, useState} from 'react'
import s from './style'
import {Screen, Text, Button, NavigationHeader, Icon, DropDown} from '../../../core'
import {Image, View} from "react-native";
import a from '../../../../assets/images/a.jpg'
import b from '../../../../assets/images/b.jpg'
import c from '../../../../assets/images/c.jpg'
import d from '../../../../assets/images/d.jpg'
import {Colors, margin} from "../../../resources";
import {Slider} from '../../../components'
import {Compass, SuccessPayment} from "../../../modals";
import globalApi from "../../../api/globalApi";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "../../../store/asyncThunks/cards";
import MasterCard from '../../../../assets/images/mastercard.png'
import Visa from '../../../../assets/images/visa.png'

export const Aeroclub = (props) => {
    const state = useMemo(() => props.route.params, [])
    const [selected, setSelected] = useState(0)
    const [successResponse, setSuccessResponse] = useState(null)
    const [visibility, setVisibility] = useState(null)
    const cards = useSelector(state => state.cards)
    const dispatch = useDispatch()
    const cardImg = {MasterCard, Visa}

    useEffect(() => {
        if(!cards.data){
            dispatch(getCards())
        }
    }, [cards.data])

    const images = [a, b, c, d]
    const plans = [
        {label: `Short term parking fee <24hrs-${state.data.airfield?.short_hr_price_eur} euros/hr`, id: 1},
        {label: `Long term parking fee >24hrs-${state.data.airfield?.long_day_price_eur} euros/day`, id: 2},
    ]

    const onConfirm = () => {
        globalApi.bookAirfield({
            paymentMethod: selected,
            dateEnd: moment(state.body.endDate).format('YYYY-MM-DD hh:mm'),
            dateStart: moment(state.body.startDate).format('YYYY-MM-DD hh:mm'),
            oaciId: 5
        })
            .then(res => {
                setSuccessResponse(res.data)
            })
            .catch(e => {
                console.log(e)
            })
            .then(() => {

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

            <Slider data={state?.data?.airfield?.length ?
                state?.data?.airfield?.images.map(i => ({uri: 'http://192.168.77.129:9026' + i.file_path})) :
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
                        state.data.airfield.runways.map((item,index) => {
                            return (
                                <View style={s.list_container} key={index}>
                                    <Text>Runway 12/30 {item.title}</Text>
                                </View>)
                        })
                    }
                    <Button labelSize={'18_400'}
                            style={s.runway_add_btn}
                            onPress={() => {
                                setVisibility(true)
                            }}
                    >
                        <Icon type={'PlusCircle'} stroke={'rgba(0,0,0,0.3)'} size={22}/>
                    </Button>
                </View>
                {renderList(`${state.data.airfield.spaces_count} parking spaces`)}
                <Button variant={'primary'}
                        label={'Book space'}
                        style={{...margin(40, 0)}}
                        onPress={onConfirm}
                />
            </View>
            {/*<DropDown variant={'underlined'}*/}
            {/*          placeholder={'Cards'}*/}
            {/*          data={cards.data}*/}
            {/*          label={(e) => e.value.name}*/}
            {/*          renderItem={({item, isSelected}) => {*/}
            {/*              console.log(item)*/}
            {/*              return <View style={{flexDirection: "row", columnGap: 10, alignItems: 'center'}}>*/}
            {/*                  <Image*/}
            {/*                      source={cardImg[item.brand]}*/}
            {/*                      style={{width: 30, height: '100%'}}*/}
            {/*                  />*/}
            {/*                  <Text size={'14_400'}*/}
            {/*                        style={{color: isSelected ? 'white' : '#787777'}}>{item.type}</Text>*/}
            {/*              </View>*/}
            {/*          }}*/}
            {/*          name={'country_id'}*/}
            {/*          onChange={(e) => {*/}
            {/*              // onChange({value: e.value.id, name: e.name})*/}
            {/*          }}*/}
            {/*/>*/}
            <SuccessPayment visibility={successResponse !== null}
                            setVisibility={setSuccessResponse}
                            state={successResponse}
                            body={state.body}
                            paymentMethod={selected}
            />
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
