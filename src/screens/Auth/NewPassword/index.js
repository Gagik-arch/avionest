import React, {useContext, useState} from "react";
import s from "./style";
import {ImageBackground, View} from "react-native";
import {Button, Icon, Input, NavigationHeader, Screen, Text} from "../../../core";
import {margin, padding } from "../../../resources";

export const NewPassword = (props) => {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <Screen header={<NavigationHeader title={<></>}
                                          style={padding(16, 0)}
                                          backHandler={<Button onPress={() => props.navigation.goBack()}>
                                              <Icon type={"ChevronLeft"}/>
                                          </Button>}
                                          {...props}
        />}
                footer={<Button variant={"primary"} label={"Save"} onPress={() => setIsSuccess(true)}/>}
        >
            <Text size={"24_400"}>NewPassword</Text>

        </Screen>
    );
};
