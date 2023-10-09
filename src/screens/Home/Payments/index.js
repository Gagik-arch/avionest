import React, {useRef, useState} from 'react'
import s from './style'
import {Button, Icon, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {margin} from "../../../resources";
import {Image, TouchableOpacity, View} from 'react-native'
import mastercardImage from '../../../../assets/images/mastercard.png'
import visaImage from '../../../../assets/images/visa.png'
import {PaymentModal} from "../../../modals";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import NavigationHeader from "../../../core/NavigationHeader";

export const Payments = (props) => {

    const onEdit = () => {
        props.navigation.navigate('PaymentDetails')
    }

    return (
        <Screen header={
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
            <CardList name={'Master Card'}
                      number={'2123123555554568'}
                      image={mastercardImage}
                      onEdit={onEdit}
            />
            <CardList name={'Visa'}
                      number={'2123123555555645'}
                      image={visaImage}
                      onEdit={onEdit}
            />
            <Button label={'Add Payment method'}
                    variant={'primary'}
                    style={{...margin(208, 55, 0, 55)}}
            />

        </Screen>
    )
}

const CardList = ({
                      name,
                      number,
                      image,
                      onPress = () => {
                      },
                      onEdit = () => {
                      }
                  }) => {
    const [visibility, setVisibility] = useState(false)
    const swipRef = useRef()

    const onPressDelete = () => {
        setVisibility(true)

    }
    const rightActions = (progress, dragX) => {
        const scaleTrash = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: "clamp",
        });
        const scaleEdit = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.6],
            extrapolate: "clamp",
        });

        return (
            <View style={s.swipe_container}>
                <TouchableOpacity style={[s.swipeable_btn, {transform: [{scale: scaleTrash}]}]}
                                  onPress={onPressDelete}
                >
                    <Icon type={'Trash'} stroke={'red'}/>
                </TouchableOpacity>
                <TouchableOpacity style={[s.swipeable_btn, {transform: [{scale: scaleEdit}]}]}
                                  onPress={onEdit}>
                    <Icon type={'Edit'} stroke={'green'}/>
                </TouchableOpacity>
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
            />
            <Swipeable ref={swipRef}
                       onSwipeableClose={() => {
                       }}
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
                <Button style={s.container_list} onPress={onPress}>
                    <View style={s.block_list}>
                        <Image source={image}/>
                        <View>
                            <Text size={'18_400'} style={{color: '#454545'}}>{name}</Text>
                            <Text style={s.card_number} size={'14_400'}>
                                **** **** **** {number.substring(number.length - 4, number.length)}
                            </Text>
                        </View>
                    </View>
                    <Icon type={'ChevronRight'} stroke={'#787777'} size={20}/>
                </Button>
            </Swipeable>
        </>
    )
}
