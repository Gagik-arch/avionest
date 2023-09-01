import React, {useState} from "react";
import s from "./style";
import {Button, CardInput, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";
import {WelcomeAvionest} from "../../../modals";

export const PaymentDetails = (props) => {
    // const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false)

    const onChangeRadio = (e) => {
        // setBody((prev) => ({...prev, [e.name]: e.label}))
    };

    const onChange = (e) => {
        // onChangeBody(e, body, setBody);
    }
    const disableSubmitBtn = () => validateFields([], body) || isLoading;

    const onSubmit = () => {
        setIsLoading(true);
    };

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
            <Button style={s.scan_btn}>
                <Icon type={'Scan'}/>
                <Text style={{color: '#0094FF'}} size={'14_700'}>Scan Card</Text>
            </Button>
            <Input placeholder={'Enter Name on Card'}/>
            <CardInput placeholder={'Card Number'}/>
            <View style={s.row}>
                <View style={{flex: 1}}>
                    <Input placeholder={'MM/YY'}/>
                </View>
                <View style={{flex: 1}}>
                    <Input placeholder={'CVV'} maxLength={3} keyboardType={'numeric'}/>
                </View>
            </View>
            <Input placeholder={'ZIp/Postal Code'} maxLength={5} keyboardType={'numeric'}/>
            <View style={{flex: 1}}/>
            <Button label={'Next'} variant={'primary'}
                    onPress={() => {
                        setModalVisibility(true)
                    }}
                    style={{marginTop:40}}
            />
            <WelcomeAvionest visibility={modalVisibility}
                             setVisibility={setModalVisibility}
            />
        </Screen>
    );
};
