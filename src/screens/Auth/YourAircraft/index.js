import React, {useState} from "react";
import s from "./style";
import {Button, ColorPicker, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {SelectableInput} from "../../../components";
import {View} from "react-native";
import {Colors, margin, onChangeBody, onRequiredFieldNotAvailable, padding, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";

export const YourAircraft = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [isLoading, setIsLoading] = useState(false);
    const [requiredMessage, setRequiredMessage] = useState({})

    const formQuery = ["first_name", "last_name", "date_of_birth", "country_id", "home_base",'registration_number']

    const onChangeCheckbox = (e) => {
        setBody((prev) => {
            let copy = prev[e.name] ? [...prev[e.name]] : []
            if (copy.includes(e.label)) {
                copy = copy.filter(item => item !== e.label)
            } else {
                copy.push(e.label)
            }
            return {...prev,[e.name] : copy}
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
            <Text style={global.app_title}>Your Aircraft</Text>
            <Text style={{...margin(12, 0, 80, 0)}}>
                Select from the list below the type of aircraft you are currently using
            </Text>
            <SelectableInput onChange={onChange} name={'aircraft_id'}/>
            <ColorPicker onChange={onChange} name={'color_id'}/>
            <Input placeholder={'Registration number'}
                   name={'registration_number'}
                   value={body?.aircraft_id.number}
                   onChange={onChange}
                   disabled={true}
                   requiredMessage={requiredMessage['registration_number']}
            />
            <Text style={[global.app_subtitle, {...margin(32, 0, 12, 0)}]}>Equipment</Text>
            <View style={s.grid}>
                <View style={s.column}>
                    <Radio label={'ADF'}
                           name={'equipment'}
                           onChange={onChangeCheckbox}
                           checked={body?.equipment ==='ADF' }
                    />
                    <Radio label={'GPS'}
                           name={'equipment'}
                           onChange={onChangeCheckbox}
                           checked={body?.equipment ==='GPS' }
                    />
                    <Radio label={'VHF'}
                           name={'equipment'}
                           onChange={onChangeCheckbox}
                           checked={body?.equipment ==='VHF' }
                    />
                </View>
                <View style={s.column}>
                    <Radio label={'VOR'}
                           name={'equipment'}
                           onChange={onChangeCheckbox}
                           checked={body?.equipment ==='VOR' }
                    />
                    <Radio label={'DME'}
                           name={'equipment'}
                           onChange={onChangeCheckbox}
                           checked={body?.equipment ==='DME' }
                    />
                </View>
            </View>
            <View style={{flex: 1}}/>
            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={() => {
                        props.navigation.navigate('YourQualifications',body)
                    }}/>
        </Screen>
    );
};
