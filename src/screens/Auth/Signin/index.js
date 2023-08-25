import React, {  useState } from "react";
import s from "./style";
import { Button, Icon, Input, NavigationHeader, Screen, Text } from "../../../core";

export const Signin = (props) => {
  const [body, setBody] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  return (
      <Screen contentContainerStyle={s.container}>
       <Text>Signin</Text>
      </Screen>
  );
};
