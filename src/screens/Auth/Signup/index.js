import React, { useContext, useState } from "react";
import s from "./style";
import { Button, Icon, Input, Screen, Text } from "../../../core";
import { View } from "react-native";
import { onChangeBody, padding,  validateFields } from "../../../resources";

export const Signup = (props) => {
  const [body, setBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    onChangeBody(e, body, setBody);
  };

  const disableSubmitBtn = () => validateFields(["name", "phoneNumber", "email", "password"], body) || isLoading;

  const onSubmit = () => {
    setIsLoading(true);
    // authApi.signup(body)
    //   .then(() => {
    //     props.navigation.navigate("SellerOrCustomer");
    //   })
    //   .catch(e => {
    //     Toast.show({
    //       type: "error",
    //       text1: e?.response || "<Signup> An error occurred.",
    //     });
    //   })
    //   .then(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
      <Screen contentContainerStyle={s.container}>
      <Text>Signup</Text>
      </Screen>
  );
};
