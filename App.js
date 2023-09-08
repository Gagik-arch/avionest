import { SafeAreaProvider } from "react-native-safe-area-context";
import {  StatusBar } from "react-native";
import { StackNavigator } from "./src/navigation";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {useEffect} from "react";
import SplashScreen from "react-native-splash-screen";
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
export default () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={'white'}
                   barStyle={"dark-content" }
        />
        <BottomSheetModalProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </BottomSheetModalProvider>

        <Toast />

      </SafeAreaProvider>
    </Provider>
  );
};
