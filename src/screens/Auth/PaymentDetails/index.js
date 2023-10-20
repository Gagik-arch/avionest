import React, {useState} from "react";
import s from "./style";
import {Button, CardInput, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, onChangeBody, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import NavigationHeader from "../../../core/NavigationHeader";
import authApi from "../../../api/authApi";
import {StripeProvider} from '@stripe/stripe-react-native'
import Toast from "react-native-toast-message";
import Stripe from 'react-native-stripe-api';
import {WelcomeAvionest} from "../../../modals";
import {addCard, getCards} from '../../../store/asyncThunks/cards'
import {useDispatch, useSelector} from "react-redux";

const apiKey = 'pk_test_51NsQHOHsAwmdsPL7SBxgBVrIG2xBJ9HJ3pgIoC7EJhIHkRLzM5wzAr8vQuvNNkUWGcK4vSZqJ35qLhu9ouvUqr8o00X3dnSjzz';

export const PaymentDetails = (props) => {
    const [body, setBody] = useState({...props.route.params});
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [requiredMessage, setRequiredMessage] = useState({})
    const dispatch = useDispatch()
    const cards = useSelector(state=>state.cards)

    const formQuery = ['card_postal', "card_number", "card_cvv", 'card_name', 'card_date']

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody);
    }
    const disableSubmitBtn = () => validateFields(formQuery, body) || isLoading || cards.isLoading;

    const onSubmit = async () => {
        const cloneBody = {...body}
        const sendingData = {
            number: cloneBody.card_number,
            exp_month: cloneBody.card_date.split('/')[0],
            exp_year: cloneBody.card_date.split('/')[1],
            cvc: cloneBody.card_cvv,
            name: cloneBody.card_name,
            address_zip: cloneBody.card_postal
        }
        delete cloneBody.card_postal
        delete cloneBody.card_cvv
        delete cloneBody.card_name
        delete cloneBody.card_date

        const client = new Stripe(apiKey);
        let cardDetails;
        try {
            cardDetails = await client.createToken(sendingData);

            cloneBody.stripe_card_token = cardDetails.id
            cloneBody.stripe_card_id = cardDetails.card.id

        } catch (e) {
            console.log(e)
        }

        if (props.route.params) {
            setIsLoading(true)
            authApi.signup(cloneBody)
                .then(async () => {
                    props.navigation.reset({index: 0, routes: [{name: "Signin"}]});
                    setModalVisibility(true)
                })
                .catch(e => {
                    Toast.show({
                        type: "error",
                        text1: e?.response?.data || "An error occurred.",
                    });
                })
                .then(() => {
                    setIsLoading(false)
                })
        } else {
            dispatch(addCard({navigation:props.navigation,card:cardDetails}))
        }
    };

    const onDisable = () => {
        const result = {}
        onRequiredFieldNotAvailable(formQuery, body, (item) => {
            result[item] = `${item.toUpperCaseFirstChar()} is required`
        })
        setRequiredMessage(result)
    }

    return (
        <StripeProvider urlScheme="https://github.com/stripe/stripe-react-native"
                        publishableKey={apiKey}
        >

            <Screen contentContainerStyle={s.container}
                    header={
                        <NavigationHeader title={<></>}
                                          backHandler={<Button onPress={() => {
                                              props.navigation.goBack()
                                          }}
                                          >
                                              <Icon type={'ArrowLeft'}/>
                                          </Button>}
                                          {...props} />
                    }
            >
                <Text style={global.app_title}>Payment Details</Text>
                <Button style={s.scan_btn}
                        onPress={() => {
                        }}>
                    <Icon type={'Scan'}/>
                    <Text style={{color: '#0094FF'}} size={'14_700'}>Scan Card</Text>
                </Button>
                <Input placeholder={'Enter Name on Card'}
                       name={'card_name'}
                       onFinish={onChange}
                       value={body?.card_name}
                       requiredMessage={requiredMessage?.card_name}
                />
                <CardInput placeholder={'Card Number'}
                           name={'card_number'}
                           onFinish={onChange}
                           value={body?.card_number}
                />
                <View style={s.row}>
                    <View style={{flex: 1}}>
                        <Input placeholder={'MM/YY'}
                               maxLength={5}
                               name={'card_date'}
                               onChange={(e) => {
                                   onChange({
                                       name: e.name,
                                       value: e.value.length === 2 ?
                                           e.value + '/' :
                                           e.value
                                   })
                               }}
                               value={body?.card_date}
                               requiredMessage={requiredMessage?.card_date}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Input placeholder={'CVV'}
                               maxLength={3}
                               keyboardType={'numeric'}
                               name={'card_cvv'}
                               onFinish={onChange}
                               value={body?.card_cvv}
                               requiredMessage={requiredMessage.card_cvv}
                        />
                    </View>
                </View>
                <Input placeholder={'Zip/Postal Code'}
                       maxLength={5}
                       keyboardType={'numeric'}
                       name={'card_postal'}
                       onFinish={onChange}
                       value={body?.card_postal}
                       requiredMessage={requiredMessage.card_postal}
                />
                <View style={{flex: 1}}/>
                <Button label={'Next'}
                        variant={'primary'}
                        onPress={onSubmit}
                        disabled={disableSubmitBtn()}
                        onDisabled={onDisable}
                        style={{marginTop: 40}}
                        isLoading={(isLoading) || (cards.isLoading)}
                />
                <WelcomeAvionest visibility={modalVisibility}
                                 setVisibility={setModalVisibility}
                />
            </Screen>
        </StripeProvider>
    );
};
