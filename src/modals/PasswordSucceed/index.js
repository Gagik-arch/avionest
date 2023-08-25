import React from "react";
import s from "./style";
import { Modal, View } from "react-native";
import { Button, Text } from "../../core";
import Lottie from "lottie-react-native";
import { Colors } from "../../resources";

export const PasswordSucceed = ({
                                  visibility,
                                  setVisibility,
                                }) => {

  return (
    <Modal animationType="fade"
           transparent={true}
           visible={visibility}
    >
      <View style={s.container}>
        <Text size={"24_400"} style={{ marginBottom: 72 }}>Password updated</Text>
        <View style={s.block}>
          <Lottie source={require("./data.json")} speed={1.5} autoPlay loop={false} />
        </View>
        <Text size={"16_400"}>Your password has been updated!</Text>
        <Button label={"Log In"}
                variant={"primary"}
                style={{ backgroundColor: "white", width: "100%", marginTop: 200 }}
                textStyle={{ color: Colors.green }}
                onPress={() => setVisibility(false)}
        />
      </View>
    </Modal>
  );
};
