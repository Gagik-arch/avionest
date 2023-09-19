import React, {useState} from 'react'
import s from './style'
import {Button, DropDown, Icon, Input, NavigationHeader, Screen, Text} from "../../../core";
import global from "../../../styles/global";
import {Colors, margin, onChangeBody} from "../../../resources";
import DatePicker from "../../../core/DatePicker";

export const Profile = (props) => {
    const [body, setBody] = useState({})

    const onChange = (e) => {
        onChangeBody(e, body, setBody)
    }

    return (
        <Screen contentContainerStyle={s.container}
                header={<NavigationHeader title={<></>}
                                          backHandler={
                                              <Button style={{columnGap: 18}}
                                                      onPress={() => {
                                                          props.navigation.goBack()
                                                      }}>
                                                  <Icon type={'ArrowLeft'} stroke={Colors.darkBlue} size={22}/>
                                                  <Text size={'14_400'} style={{color: Colors.darkBlue}}>Profile</Text>
                                              </Button>
                                          }
                                          {...props}/>}
        >
            <Input placeholder={'Username'}
                   onChange={onChange}
                   name={'username'}
                   value={body.username}
            />
            <Input placeholder={'Email'}
                   validationKey={'email'}
                   onChange={onChange}
                   name={'email'}
                   value={body.email}
            />
            <Input placeholder={'Mobule number'}
                   onChange={onChange}
                   name={'phone'}
                   value={body.phone}
            />
            <DatePicker placeholder={'Date'}
                        onChange={onChange}
                        name={'date'}
                        date={body.date}
            />
            <DropDown variant={'underlined'}
                      placeholder={'Country'}
                      data={Array.from({length: 100}, (_, k) => ({title: 'City ' + k, id: 'city' + k}))}
                      label={(e) => e.title}
                      renderItem={({item, isSelected}) => {
                          return <Text size={'14_400'}
                                       style={{color: isSelected ? 'white' : '#787777'}}>{item.title}</Text>
                      }}
            />
            <Button style={s.log_out_btn}
                    label={'Sign out'}
                    labelStyle={{color: Colors.red}}
                    labelSize={'14_400'}
            />
        </Screen>
    )
}


