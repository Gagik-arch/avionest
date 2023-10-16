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

const apiKey = 'pk_test_51NsQHOHsAwmdsPL7SBxgBVrIG2xBJ9HJ3pgIoC7EJhIHkRLzM5wzAr8vQuvNNkUWGcK4vSZqJ35qLhu9ouvUqr8o00X3dnSjzz';

export const PaymentDetails = (props) => {
    const [body, setBody] = useState({...props.route.params});
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = [ 'card_postal',"card_number", "card_cvv",'card_name','card_date']

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody);
    }
    const disableSubmitBtn = () =>validateFields(formQuery, body) || isLoading;

    const onSubmit = async () => {
        if (props.route.params) {
            setIsLoading(true)
            authApi.signup(body)
                .then(async () => {
                    const client = new Stripe(apiKey);
                    const sendingData = {
                        number: body.card_number,
                        exp_month: body.card_date.split('/')[0],
                        exp_year: body.card_date.split('/')[1],
                        cvc: body.card_cvv,
                    }
                    try {
                        const cardData = await client.createToken(sendingData);

                        props.navigation.reset({index: 0, routes: [{name: "Signin"}]});
                    } catch (e) {
                        console.log(e)
                    }
                    setModalVisibility(true)
                })
                .catch(e => {
                    console.log(e)
                    Toast.show({
                        type: "error",
                        text1: e?.response?.data || "An error occurred.",
                    });
                })
                .then(() => {
                    setIsLoading(false)
                })
        } else {
            const client = new Stripe(apiKey);
            const sendingData = {
                number: body.card_number,
                exp_month: body.card_date.split('/')[0],
                exp_year: body.card_date.split('/')[1],
                cvc: body.card_cvv,
            }
            try {
                const cardData = await client.createToken(sendingData);
                props.navigation.reset({index: 0, routes: [{name: "Home"}]});
            } catch (e) {
                console.log(e)
            }
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
                        isLoading={isLoading}
                />
                <WelcomeAvionest visibility={modalVisibility}
                                 setVisibility={setModalVisibility}
                />
            </Screen>
        </StripeProvider>
    );
};
