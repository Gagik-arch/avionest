import React from "react";
import s from "./style";
import {Screen, Text, Button, NavigationHeader, Icon, Input} from "../../../core";
import {margin, padding, } from "../../../resources";


export const ForgotPassword = (props) => {

    return (
        <Screen
            header={<NavigationHeader title={<></>}
                                      style={padding(16, 0)}
                                      backHandler={<Button><Icon type={"ChevronLeft"}
                                                                 onPress={() => props.navigation.goBack()}/></Button>}
                                      {...props}
            />}
            footer={<Button variant={"primary"}
                            label={"Request email"}
                            onPress={() => props.navigation.navigate("OTP")}
            />}
        >
            <Text>ForgotPassword</Text>
        </Screen>
    );
};
