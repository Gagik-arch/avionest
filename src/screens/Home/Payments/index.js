import React, {useEffect, useRef, useState} from 'react'
import s from './style'
import {Button, Icon, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {margin} from "../../../resources";
import {ActivityIndicator, FlatList, Image,  View} from 'react-native'
import mastercard from '../../../../assets/images/mastercard.png'
import visa from '../../../../assets/images/visa.png'
import {PaymentModal} from "../../../modals";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import NavigationHeader from "../../../core/NavigationHeader";
import {useDispatch, useSelector} from "react-redux";
import {deleteCard, getCards} from "../../../store/asyncThunks/cards";

export const Payments = (props) => {
    const dispatch = useDispatch()
    const cards = useSelector(state => state.cards)
    const images = {mastercard, visa}
    // console.log(cards)
    useEffect(() => {
        dispatch(getCards())
    }, [])

    return (
        <Screen scrollDisable={true}
                header={
                    <NavigationHeader title={<></>}
                                      backHandler={<Button onPress={() => {
                                          props.navigation.goBack()
                                      }}
                                      >
                                          <Icon type={'ArrowLeft'}/>
                                      </Button>}
                                      {...props} />
                }>
            <Text style={[global.app_title, {...margin(100, 52, 40, 52)}]}>
                Payment Method
            </Text>
            {cards.isLoading ?
                <ActivityIndicator/> :
                cards.data.length ?
                    <FlatList
                        data={cards.data}
                        renderItem={({item}) => {
                            return  <CardList key={item.card.id}
                                      name={item.card.brand.toUpperCaseFirstChar()}
                                      number={item.card.last4}
                                      image={images[item.card.brand.toLowerCase()]}
                                      cardId={item.id}
                            />
                        }}
                        keyExtractor={item => item.id}
                    /> :
                    <Text size={'16_600'} style={{...margin(0, 0, 0, 50)}}>Cards not available</Text>
            }
            <View style={{flex: 1}}/>
            <Button label={'Add Payment method'}
                    variant={'primary'}
                    style={{...margin(0, 55, 0, 55)}}
                    onPress={() => {
                        props.navigation.navigate('PaymentDetails')
                    }}
            />
        </Screen>
    )
}

const CardList = ({
                      name,
                      number,
                      image,
                      cardId
                  }) => {
    const [visibility, setVisibility] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const swipRef = useRef()
    const dispatch = useDispatch()

    const onDelete = () => {
        dispatch(deleteCard({cardId, setIsLoading}))
    }

    const rightActions = (progress, dragX) => {
        const scaleTrash = dragX.interpolate({
            inputRange: [-100, 100],
            outputRange: [1, 0],
            extrapolate: "clamp",
        });
        return (
            <View style={s.swipe_container}>
                <Button style={[s.swipeable_btn, {transform: [{scale: scaleTrash}]}]}
                        disabled={isLoading}
                        onPress={() => {
                            setVisibility(true)
                        }}
                >
                    {isLoading ? <ActivityIndicator/> : <Icon type={'Trash'} stroke={'red'}/>}
                </Button>
            </View>
        );
    };

    return (
        <>
            <PaymentModal visibility={visibility}
                          setVisibility={setVisibility}
                          onCancel={() => {
                              swipRef.current.close()
                          }}
                          onDelete={onDelete}
            />
            <Swipeable ref={swipRef}
                       containerStyle={{
                           borderTopWidth: 1,
                           borderBottomWidth: 1,
                           borderColor: '#99999926',
                       }}
                       swipeSuccessThreshold={70}
                       renderRightActions={rightActions}
                       rightButtonContainerStyle={{
                           borderTopWidth: 1,
                           borderBottomWidth: 1,
                           borderColor: '#99999926',
                       }}
            >
                <View style={s.container_list}>
                    <View style={s.block_list}>
                        <Image source={image}/>
                        <View>
                            <Text size={'18_400'} style={{color: '#454545'}}>{name}</Text>
                            <Text style={s.card_number} size={'14_400'}>
                                **** **** **** {number}
                            </Text>
                        </View>
                    </View>
                    <Icon type={'ChevronRight'} stroke={'#787777'} size={20}/>
                </View>
            </Swipeable>
        </>
    )
}
