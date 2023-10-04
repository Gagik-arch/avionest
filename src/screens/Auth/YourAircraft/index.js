import React, {useState} from "react";
import s from "./style";
import {Button, ColorPicker, DropDown, Icon, Input, Screen, Text} from "../../../core";
import {SelectableInput} from "../../../components";
import {FlatList, View} from "react-native";
import {margin, onChangeBody, onRequiredFieldNotAvailable, validateFields} from "../../../resources";
import global from '../../../styles/global'
import NavigationHeader from "../../../core/NavigationHeader";
import Radio from "../../../core/Radio";
import {useSelector} from "react-redux";

export const YourAircraft = (props) => {
    const [body, setBody] = useState(props.route.params);
    const [requiredMessage, setRequiredMessage] = useState({})
    const { data} = useSelector(state => state.global)
    const formQuery = ["aircraft_id", 'first_color_id', 'second_color_id', 'equipments']
    console.log(data)
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
            <ColorPicker onChange={onChange} name={'first_color_id'} placeholder={'First color'}/>
            <ColorPicker onChange={onChange} name={'second_color_id'} placeholder={'Second color'}/>
            <Input placeholder={'Registration number'}
                   name={'registration_number'}
                   value={body?.aircraft_id?.aircraft}
                   onChange={onChange}
                   disabled={true}
                   requiredMessage={requiredMessage['registration_number']}
            />
            <Text style={[global.app_subtitle, {...margin(32, 0, 12, 0)}]}>Equipment</Text>
            <View style={s.grid}>
                <FlatList data={data?.equipmentTypes}
                          numColumns={2}
                          renderItem={({item}) => <Radio label={item.title}
                                                         name={'equipments'}
                                                         onChange={(e) => onChangeCheckbox({name: e.name, id: item.id})}
                                                         checked={body?.equipment === 'ADF'}
                                                         containerStyle={{flex: 1,marginBottom:8}}
                          />}
                />
            </View>
            <View style={{flex: 1}}/>
            <Button label={'Next'}
                    variant={'primary'}
                    disabled={disableSubmitBtn()}
                    onDisabled={onDisable}
                    style={{...margin(10, 0, 0, 0)}}
                    onPress={() => {
                        props.navigation.navigate('YourQualifications', body)
                    }}/>
        </Screen>
    );
};
