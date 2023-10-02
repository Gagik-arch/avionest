import React, {useState} from "react";
import s from "./style";
import {Button, CardInput, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {onChangeBody, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import {WelcomeAvionest} from "../../../modals";
import authApi from "../../../api/authApi";
import {StripeProvider, CardField, useStripe} from '@stripe/stripe-react-native'

export const PaymentDetails = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["card_name", "card_number", "card_date", "card_cvv", "card_postal"]
    // const { confirmPayment } = useStripe();

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody);
    }
    const disableSubmitBtn = () => validateFields(formQuery, body) || isLoading;

    const onSubmit = () => {
        setIsLoading(true)
        authApi.signup(body)
            .then((res) => {
                console.log(res.data)
                setModalVisibility(true)
            })
            .catch(e => {
                console.log(123132, e)
            })
            .then(() => {
                setIsLoading(false)
            })
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
                        publishableKey={'pk_live_51NsQHOHsAwmdsPL7oIhJvxKprJnoyFu6AxWChH5lAX1ojPhWrKocORL2l8mP5An7cZNgjiQWIuDuTTrFm6QqbPGq00YZdWrAen'}
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
                {/*<CardField*/}
                {/*    postalCodeEnabled={true}*/}
                {/*    placeholders={{*/}
                {/*        number: '4242 4242 4242 4242',*/}
                {/*    }}*/}
                {/*    cardStyle={{*/}
                {/*        backgroundColor: '#FFFFFF',*/}
                {/*        textColor: '#000000',*/}
                {/*    }}*/}
                {/*    style={{*/}
                {/*        width: '100%',*/}
                {/*        height: 50,*/}
                {/*        flexDirection:"column",*/}
                {/*        marginVertical: 30,*/}
                {/*    }}*/}
                {/*    onCardChange={(cardDetails) => {*/}
                {/*        console.log('cardDetails', cardDetails);*/}
                {/*    }}*/}
                {/*    onFocus={(focusedField) => {*/}
                {/*        console.log('focusField', focusedField);*/}
                {/*    }}*/}
                {/*/>*/}
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
                               onFinish={onChange}
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
