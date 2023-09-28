import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { padding } from "../resources";

const Screen = ({
                  children,
                  style = {},
                  contentContainerStyle = {},
                  edges = [ 'top',"left", "right",'bottom'],
                  header = <></>,
                  footer = <></>,
                  scrollDisable = false,
                  backgroundColor = "white",
                  floatingActionButton = null,
                }) => {
  return (
    <KeyboardAvoidingView
      style={[
        {
          height: "100%",
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? "padding" : StatusBar.height + 20
      }
    >
      <SafeAreaView
        edges={edges}
        style={{
          flex: 1,
          backgroundColor,
          ...style,
        }}>
          {header}
        <View style={[s.container]}>
          {scrollDisable ? (
            <View
              style={[
                {
                  flex: 1,
                },
              ]}>
              {children}
            </View>
          ) : (
            <ScrollView
              contentProps={{
                keyboardDismissMode: "interactive",
                keyboardShouldPersistTaps: false,
              }}
              contentContainerStyle={[contentContainerStyle, { flexGrow: 1 }]}>
              {children}
            </ScrollView>
          )}
        </View>
        {footer}
      </SafeAreaView>
      {floatingActionButton && <View style={s.floating_action_btn}>
        {floatingActionButton}
      </View>}
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  floating_action_btn: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default Screen;
