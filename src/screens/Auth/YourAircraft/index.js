import React, {useContext, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {View} from "react-native";
import {Colors, margin, onChangeBody, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";

export const YourAircraft = (props) => {
    const [body, setBody] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChangeRadio = (e) => {
        setBody((prev) => ({...prev, [e.name]: e.label}))
    };

    const onChange = (e) => {
        // onChangeBody(e, body, setBody);
    }
    const disableSubmitBtn = () => validateFields(["name", "phoneNumber", "email", "password"], body) || isLoading;

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
            <Text style={global.app_title}>Your Aircraft</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>Select from the list below the type of aircraft you
                are currently using</Text>
            <DropDown variant={'underlined'}
                      placeholder={'Select your aircraft'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Title Text' + k, id: 'item' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <DropDown variant={'underlined'}
                      placeholder={'Color'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'Color' + k, id: 'Color' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <Input placeholder={'First Name'}/>
            <Text style={[global.app_subtitle, {...margin(32, 0, 12, 0)}]}>Equipment</Text>
            <View style={s.grid}>
                <View style={s.column}>
                    <Radio label={'ADF'} name={'equipment'} onChange={onChangeRadio}/>
                    <Radio label={'GPS'} name={'equipment'} onChange={onChangeRadio}/>
                    <Radio label={'VHF'} name={'equipment'} onChange={onChangeRadio}/>
                </View>
                <View style={s.column}>
                    <Radio label={'VOR'} name={'equipment'} onChange={onChangeRadio}/>
                    <Radio label={'DME'} name={'equipment'} onChange={onChangeRadio}/>
                </View>
            </View>
            <View style={{flex: 1}}/>
            <Button label={'Next'} variant={'primary'}
            onPress={()=>{
                props.navigation.navigate('YourQualifications')
            }}/>
        </Screen>
    );
};
