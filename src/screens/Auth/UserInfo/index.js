import React, {useContext, useEffect, useRef, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text, SearchInput} from "../../../core";
import {ActivityIndicator, Platform, View, Image} from "react-native";
import {margin, onChangeBody, generateYears, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import {getAuthSources} from "../../../store/asyncThunks/global";
import {useDispatch, useSelector} from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";

export const UserInfo = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [requiredMessage, setRequiredMessage] = useState({})
    const {isLoading, data} = useSelector(state => state.global)
    const dispatch = useDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const lastNameRef = useRef()

    const formQuery = ["first_name", "last_name", "date_of_birth", "country_id", "home_base"]

    useEffect(() => {
        dispatch(getAuthSources())
    }, [])

    const onChange = (e) => {
        setRequiredMessage(prev => {
            delete prev[e.name]
            return prev
        })
        onChangeBody(e, body, setBody);
    };
    const disableSubmitBtn = () => validateFields(formQuery, body);

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
                }>
            <Text style={global.app_title}>Let’s get started</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>Create your Account</Text>
            <Input placeholder={'First Name'}
                   name={'first_name'}
                   onChange={onChange}
                   requiredMessage={requiredMessage['first_name']}
                   value={body?.first_name}
                   onSubmitEditing={()=>{
                       lastNameRef.current.focus();
                   }}
            />
            <Input placeholder={'Surname'}
                   name={'last_name'}
                   onChange={onChange}
                   requiredMessage={requiredMessage['last_name']}
                   value={body?.last_name}
                   ref={lastNameRef}
            />
            <DropDown variant={'underlined'}
                      placeholder={body?.date_of_birth || 'Date of birth'}
                      data={generateYears()}
                      name={'date_of_birth'}
                      label={() =>body?.date_of_birth &&  moment(body?.date_of_birth).format('YYYY/MM/DD')}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item}</Text>
                      }}
                      requiredMessage={requiredMessage['date_of_birth']}
                      onChange={(e) => {
                          let date = new Date()
                          date.setFullYear(e.value)
                          date.setDate(1)
                          date.setMonth(0)
                          setDatePickerVisibility(true)
                          onChange({value: date, name: e.name})
                      }}
            />
            {isDatePickerVisible && <DateTimePicker mode={'date'}
                                                    value={body.date_of_birth}
                                                    display={Platform.OS === "ios" ? "spinner" : "default"}
                                                    onChange={({nativeEvent, type}) => {
                                                        setDatePickerVisibility(false)
                                                        if (type === "set") {
                                                            moment(body.date_of_birth).format('YYYY/MM/DD')
                                                            onChange({
                                                                value: new Date(nativeEvent.timestamp),
                                                                name: 'date_of_birth',
                                                            });
                                                        }
                                                    }}
            />}
            {isLoading ?
                <ActivityIndicator/> :
                <>
                    <DropDown variant={'underlined'}
                              placeholder={body?.country_id || 'Nationality'}
                              data={data?.countries}
                              label={(e) => e?.value?.name}
                              renderItem={({item, isSelected}) => {
                                  return <View style={{flexDirection: "row", columnGap: 10, alignItems: 'center'}}>
                                      <Image
                                          source={{uri: `http://65.109.11.93:9026/sources/flags/${item.code.toLowerCase()}.png`}}
                                          style={{width: 30, height: '100%'}}
                                      />
                                      <Text size={'14_400'}
                                            style={{color: isSelected ? 'white' : '#787777'}}>{item.name}</Text>
                                  </View>
                              }}
                              name={'country_id'}
                              requiredMessage={requiredMessage['country_id']}
                              onChange={(e) => {
                                  onChange({value: e.value.id, name: e.name})
                              }}
                    />

                    <SearchInput data={data?.oaciList}
                                 name={'home_base'}
                                 filter={(_data, value = '') => {
                                     return _data.filter(item =>(
                                         item.oaci_code.toLowerCase().includes(value.toLowerCase()) ||
                                         item.airfield_name.toLowerCase().includes(value.toLowerCase())
                                         )
                                     )
                                 }}
                                 setValue={(item) => item.oaci_code}
                                 renderItem={({item}) => <View style={{
                                     flexDirection:'row',
                                     justifyContent:'space-between',
                                     width:'100%'
                                 }}>
                                     <Text>{item.airfield_name}</Text>
                                     <Text>{item.oaci_code}</Text>
                                 </View>}
                                 onChange={(e) => {
                                     onChange({value: e.value.id, name: e.name})
                                 }}
                    />
                </>}
            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={() => {
                        body.date_of_birth = moment(body.date_of_birth).format('YYYY/MM/DD')
                        props.navigation.navigate('YourAircraft', body)
                    }}
            />
        </Screen>
    );
};


