import React, {useState} from "react";
import s from "./style";
import {Button, CardInput, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {margin, onChangeBody, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import {WelcomeAvionest} from "../../../modals";
import authApi from "../../../api/authApi";

export const PaymentDetails = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false)
    const [requiredMessage, setRequiredMessage] = useState({})
    const formQuery = ["card_name", "card_number", "card_date", "card_cvv", "card_postal"]

    const onChange = (e) => {
        onChangeBody(e, body, setBody);
    }
    const disableSubmitBtn = () => validateFields(formQuery, body) || isLoading;

    const onSubmit = () => {

        console.log(body)
        setIsLoading(true)
        authApi.signup(body)
            .then(res=>{
                setModalVisibility(true)
                console.log(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
            .then(()=>{
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
        <Screen contentContainerStyle={s.container}
                header={
                    <NavigationHeader title={<></>} {...props}
                                      backHandler={<Button onPress={() => {
                                          props.navigation.goBack()
                                      }}>
                                          <Icon type={'ArrowLeft'}/>
                                      </Button>}
                    />
                }
        >
            <Text style={global.app_title}>Payment Details</Text>
            <Button style={s.scan_btn}
            onPress={()=>{
            }}>
                <Icon type={'Scan'}/>
                <Text style={{color: '#0094FF'}} size={'14_700'}>Scan Card</Text>
            </Button>
            <Input placeholder={'Enter Name on Card'}
                   name={'card_name'}
                   onFinish={onChange}
                   value={body?.card_name}
                   requiredMessage={requiredMessage.card_name}
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
                           requiredMessage={requiredMessage.card_date}
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
            <Button label={'Next'} variant={'primary'}
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
    );
};
