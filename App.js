import {SafeAreaProvider} from "react-native-safe-area-context";
import {AppState, StatusBar} from "react-native";
import { StackNavigator } from "./src/navigation";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {enableLatestRenderer} from 'react-native-maps';
import {useEffect} from "react";

enableLatestRenderer();
export default () => {
  //
  // useEffect(()=>{
  //   const handleAppStateChange = (nextAppState) => {
  //     console.log(nextAppState)
  //   }
  //   console.log(AppState.currentState)
  //     AppState.addEventListener('change', handleAppStateChange);
  //
  // },[])

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
