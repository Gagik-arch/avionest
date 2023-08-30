import React, {useContext, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";

export const YourQualifications = (props) => {
    // const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
                }>
            <Text style={global.app_title}>Your Qualifications</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>
                In order to comply with the DGAC we need to
                verify the validity of your license
            </Text>
            <DropDown variant={'underlined'}
                      placeholder={'License type'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Title Text' + k, id: 'item' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <DropDown variant={'underlined'}
                      placeholder={'Lssue date'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Color' + k, id: 'Color' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <DropDown variant={'underlined'}
                      placeholder={'License number'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Color' + k, id: 'Color' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <DropDown variant={'underlined'}
                      placeholder={'Valid until'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Color' + k, id: 'Color' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <DropDown variant={'underlined'}
                      placeholder={'Lssuing country'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Color' + k, id: 'Color' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <Text style={[global.app_subtitle, {...margin(32, 0, 12, 0)}]}>Additional Qualifications</Text>
            <View style={s.grid}>
                <View style={s.column}>
                    <Radio label={'Night flight'} name={'additionalQualifications'} onChange={onChangeRadio}/>
                    <Radio label={'Mountain'} name={'additionalQualifications'} onChange={onChangeRadio}/>
                </View>
                <View style={s.column}>
                    <Radio label={'IFR'} name={'additionalQualifications'} onChange={onChangeRadio}/>
                    <Radio label={'Seaplane'} name={'additionalQualifications'} onChange={onChangeRadio}/>
                </View>
            </View>
            <Button label={'Next'} variant={'primary'} onPress={()=>{
                props.navigation.navigate('PaymentDetails')
            }}/>
        </Screen>
    );
};
