import React, {useEffect, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {FlatList, View} from "react-native";
import {margin, onChangeBody, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";
import DatePicker from "../../../core/DatePicker";
import globalApi from "../../../api/globalApi";
import Toast from "react-native-toast-message";
import {useDispatch, useSelector} from "react-redux";
import {globalReducer} from "../../../store/reducers";
import {getAuthSources, getCountries} from "../../../store/asyncThunks/global";

export const YourQualifications = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [requiredMessage, setRequiredMessage] = useState({})
    const {data} = useSelector(state => state.global)

    const formQuery = [
        "license_type", "issue_date", "license_number", "valid_until_date",
        "issuing_country_id", 'additional_qualifications',
    ]

    const onChangeCheckbox = (e) => {
        setBody((prev) => {
            let copy = prev?.[e.name] ? [...prev[e.name]] : []
            if (copy.includes(e.id)) {
                copy = copy.filter(item => item !== e.id)
            } else {
                copy.push(e.id)
            }
            return {...prev, [e.name]: copy}
        })
    };

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
    console.log(body)
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
                      data={['LAPL(A)', 'PPL(A)', 'CPL(A)', 'ATPL(A)']}
                      label={(e) => e.value}
                      name={'license_type'}
                      onChange={onChange}
                      renderItem={({item, isSelected}) => {
                          return (
                              <Text size={'14_400'}
                                    style={{color: isSelected ? 'white' : '#787777'}}
                              >
                                  {item}
                              </Text>
                          )
                      }}
            />
            <DatePicker placeholder={'Lssue date'}
                // date={body?.issue_date}
                        name={'issue_date'}
                        onChange={(e) => onChange({name: e.name, value: e.text})}
                        requiredMessage={requiredMessage['issue_date']}
                        value={body?.issue_date}
            />
            <Input placeholder={'License number'}
                   name={'license_number'}
                   onChange={onChange}
                   requiredMessage={requiredMessage['license_number']}
                   value={body?.license_number}
            />
            <DatePicker placeholder={'Valid until'}
                        name={'valid_until_date'}
                // date={body?.valid_until_date}
                        onChange={(e) => onChange({name: e.name, value: e.text})}
                        requiredMessage={requiredMessage['valid_until_date']}
                        value={body?.valid_until_date}
            />

            <DropDown variant={'underlined'}
                      placeholder={body?.issuing_country_id || 'Issuing country'}
                      data={data.countries}
                      label={(e) => e.value.name}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.name}</Text>
                      }}
                      name={'issuing_country_id'}
                      requiredMessage={requiredMessage['issuing_country_id']}
                      onChange={(e) => {
                          onChange({value: e.value.id, name: e.name})
                      }}
            />
            <Text style={[global.app_subtitle, {...margin(32, 0, 12, 0)}]}>Additional Qualifications</Text>
            <View style={s.grid}>
                <FlatList data={data?.additionalQualificationTypes}
                          numColumns={2}
                          renderItem={({item}) => <Radio label={item.title}
                                                         name={'additional_qualifications'}
                                                         onChange={(e) => onChangeCheckbox({name: e.name, id: item.id})}
                                                         checked={body?.equipment === 'ADF'}
                                                         containerStyle={{flex: 1, marginBottom: 8}}
                          />}
                />
            </View>
            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={() => {
                        props.navigation.navigate('PaymentDetails', body)
                    }}
            />
        </Screen>
    );
};
