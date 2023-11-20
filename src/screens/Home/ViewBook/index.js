import {Button, DropDown, Icon, NavigationHeader, Screen, Text} from '../../../core'
import MasterCard from "../../../../assets/images/mastercard.png";
import {getCards} from "../../../store/asyncThunks/cards";
import React, {useEffect, useMemo, useState} from 'react'
import visa from "../../../../assets/images/visa.png";
import {useDispatch, useSelector} from "react-redux";
import global from '../../../styles/global'
import {Colors, margin, onChangeBody, onRequiredFieldNotAvailable, padding, validateFields} from "../../../resources";
import {List} from "../../../components";
import {View, Image} from 'react-native'
import s from './style'
import airfieldsApi from "../../../api/airfieldsApi";
import moment from "moment";
import {SuccessPayment} from "../../../modals";
import {addMyBooking} from "../../../store/asyncThunks/myBookings";

const cardImg = {MasterCard, visa}

export const ViewBook = (props) => {
    const state = useMemo(() => props.route.params, [])
    const cards = useSelector(state => state.cards)
    const [successResponse, setSuccessResponse] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [body, setBody] = useState({...state.body})
    const [requiredMessage, setRequiredMessage] = useState({})

    useEffect(() => {
        if (!cards.data.length) {
            dispatch(getCards())
        } else {
            setBody(prev => ({...prev, ['stripeCardId']: cards.data[0].id}))
        }
    }, [cards.data])

    const onChange = (e) => {
        const copyBody = {...requiredMessage}
        delete copyBody[e.name]
        setRequiredMessage(copyBody)
        onChangeBody(e, body, setBody)
    }

    const submit = () => {
        dispatch(addMyBooking({body,setSuccessResponse}))
    }

    const selectedCard = useMemo(() => {
        return cards?.defaultCardId ? cards.data.findIndex(item => item.id === cards?.defaultCardId) : undefined
    }, [cards])

    return (
        <Screen header={<NavigationHeader style={s.header}
                                          title={<></>}
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
                                          {...props}/>}
                footer={<Button label={'Book'}
                                variant={'primary'}
                                isLoading={isLoading}
                                style={{...margin(16, 24)}}
                                onPress={submit}
                />}
        >
            <View style={s.container}>
                <Text style={global.app_title}>Your parking time</Text>
                <Text style={{color: '#8D8D8D', ...margin(10, 0)}} size={'10_400'}>You can book a maximum of 3
                    days</Text>
                <List>
                    <Icon type={'Calendar'} size={18}/>
                    <Text>{moment(state.body.dateStart).format('DD MMMM YYYY')}</Text>
                </List>
                <List>
                    <Icon type={'Calendar'} size={18}/>
                    <Text>{moment(state.body.dateEnd).format('DD MMMM YYYY')}</Text>
                </List>
            </View>
            <DropDown placeholder={'Cards'}
                      btnStyle={{
                          ...padding(16), backgroundColor: '#0341680A',
                      }}
                      btnTextStyle={{}}
                      defaultSelectedIndex={selectedCard}
                      data={cards.data}
                      icon={<Icon type={'ChevronDown'} stroke={'#787777'} size={18}/>}
                      label={(e) => {
                          return (
                              <View>
                                  <Text size={'14_400'} style={{...margin(0, 0, 4, 0)}}>Payment Method</Text>
                                  {e ? <View style={{flexDirection: "row", alignItems: 'center', columnGap: 16}}>
                                          <Image source={cardImg[e.value.card.brand]}/>
                                          {<Text size={'14_400'} style={{color: '#0094FF'}}>
                                              **** **** **** ${e.value.card.last4}
                                          </Text>}
                                      </View> :
                                      <Text size={'16_400'}>Cards</Text>}
                              </View>

                          )
                      }}
                      renderItem={({item, isSelected, index}) => {
                          return (
                              <View style={{flexDirection: "row", columnGap: 10, alignItems: 'center'}}>
                                  <Image
                                      source={cardImg[item.card.brand]}
                                      style={{width: 30, height: '100%'}}
                                  />
                                  <Text size={'16_600'}
                                        style={{color: isSelected ? 'black' : '#787777'}}>{item.card.last4}</Text>
                                  <Text size={'14_400'}
                                        style={{color: isSelected ? 'black' : '#787777'}}>{item.card.name}</Text>
                                  <Text size={'12_400'}
                                        style={{color: 'rgba(0,0,0,0.2)'}}> {index === 0 && 'default'}</Text>
                              </View>
                          )
                      }}
                      name={'stripeCardId'}
                      onChange={(e) => {
                          onChange({value: e.value.id, name: e.name})
                      }}
            />
            <View style={s.cost_container}>
                <Text size={'16_600'} style={{color: Colors.darkBlue}}>Cost {state.data.amount} Euros</Text>
            </View>
            <SuccessPayment visibility={successResponse}
                            setVisibility={setSuccessResponse}
                            state={state.data}
                            body={body}
            />
        </Screen>
    )
}
