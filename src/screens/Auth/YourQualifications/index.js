import React, {useContext, useEffect, useState} from "react";
import s from "./style";
import {Button, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {ActivityIndicator, View} from "react-native";
import {Colors, margin, onChangeBody, onRequiredFieldNotAvailable, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";
import DatePicker from "../../../core/DatePicker";
import globalApi from "../../../api/globalApi";
import Toast from "react-native-toast-message";

const europeanCountries = [
    'Albania',
    'Andorra',
    'Armenia',
    'Austria',
    'Azerbaijan',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Georgia',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'The Netherlands',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
]

export const YourQualifications = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [isLoading, setIsLoading] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})
    const [countries, setCountries] = useState([]);

    const formQuery = ["first_name", "last_name", "date_of_birth", "country_id", "home_base"]

    useEffect(() => {
        setIsLoading(true)
        globalApi.getCountries()
            .then(res => {
                setCountries(res.data.countries)
            })
            .catch(e => {
                Toast.show({
                    type: 'error', text1: e || 'An error occurred.',
                });
            })
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    const onChangeCheckbox = (e) => {
        setBody((prev) => {
            let copy = prev[e.name] ? [...prev[e.name]] : []
            if (copy.includes(e.label)) {
                copy = copy.filter(item => item !== e.label)
            } else {
                copy.push(e.label)
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
                      label={(e) => {
                          return e.value
                      }}
                      value={body?.license_type}
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
                        date={body?.issue_date}
                        name={'issue_date'}
                        onChange={onChange}
                        requiredMessage={requiredMessage['issue_date']}
                        value={body?.issue_date}
            />
            <DatePicker placeholder={'License number'}
                        date={body?.license_number}
                        name={'license_number'}
                        onChange={onChange}
                        requiredMessage={requiredMessage['license_number']}
                        value={body?.license_number}
            />
            <DatePicker placeholder={'Valid until'}
                        name={'valid_until_date'}
                        date={body?.valid_until_date}
                        onChange={onChange}
                        requiredMessage={requiredMessage['valid_until_date']}
                        value={body?.valid_until_date}
            />
            <DropDown variant={'underlined'}
                      placeholder={body?.issuing_country_id || 'Issuing country'}
                      data={europeanCountries}
                      label={(e) => {
                          return e.value
                      }}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item}</Text>
                      }}
                      name={'issuing_country_id'}
                      requiredMessage={requiredMessage['issuing_country_id']}
                      onChange={(e) => {
                          onChange({value: e.value, name: e.name})
                      }}
            />
            <Text style={[global.app_subtitle, {...margin(32, 0, 12, 0)}]}>Additional Qualifications</Text>
            <View style={s.grid}>
                <View style={s.column}>
                    <Radio label={'Night flight'}
                           name={'additional_qualifications'}
                           onChange={onChangeCheckbox}
                           checked={body?.additional_qualifications === 'Night flight'}
                    />
                    <Radio label={'Mountain'}
                           name={'additional_qualifications'}
                           onChange={onChangeCheckbox}
                           checked={body?.additional_qualifications === 'Mountain'}
                    />
                </View>
                <View style={s.column}>
                    <Radio label={'IFR'}
                           name={'additional_qualifications'}
                           onChange={onChangeCheckbox}
                           checked={body?.additional_qualifications === 'IFR'}
                    />
                    <Radio label={'Seaplane'}
                           name={'additional_qualifications'}
                           onChange={onChangeCheckbox}
                           checked={body?.additional_qualifications === 'Seaplane'}
                    />
                </View>
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
