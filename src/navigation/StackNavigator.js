import {useEffect} from "react";
import {
    ForgotPassword, NoNetwork, Signin, Signup,  NewPassword, Steps, UserInfo, Welcome,
    YourQualifications, PaymentDetails,YourAircraft
} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNavigation from './DrawerNavigation'
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const navigation = useNavigation();

    useEffect(() => {
        let currentState;
        const currentRoute = navigation.getCurrentRoute();

        const unsubscribe = NetInfo.addEventListener((state) => {
            if (currentState !== state.isConnected) {
                currentState = state.isConnected;
                if (state.isConnected) {
                    AsyncStorage.getItem("token")
                        .then(token => {
                            if (token) {
                                navigation.reset({index: 0, routes: [{name: "Home"}]});
                            } else {
                                if (currentRoute?.name !== "Signin") {
                                    navigation.reset({index: 0, routes: [{name: "Steps"}]});
                                }
                            }
                        }).catch(() => {
                        navigation.reset({index: 0, routes: [{name: "Steps"}]});
                    });
                } else {
                    navigation.reset({index: 0, routes: [{name: "NoNetwork"}]});
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Stack.Navigator initialRouteName={"Steps"}
            // screenOptions={{
            //     navigationBarColor: "white"
            // }}
        >
            <Stack.Group>
                <Stack.Screen name={"Steps"}
                              component={Steps}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"Welcome"}
                              component={Welcome}
                              options={{header: () => null}}
                />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name={"Signin"}
                              component={Signin}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"Signup"}
                              component={Signup}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"ForgotPassword"}
                              component={ForgotPassword}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"NewPassword"}
                              component={NewPassword}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"UserInfo"}
                              component={UserInfo}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"YourAircraft"}
                              component={YourAircraft}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"YourQualifications"}
                              component={YourQualifications}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"PaymentDetails"}
                              component={PaymentDetails}
                              options={{header: () => null}}
                />
            </Stack.Group>
            <Stack.Screen name={"Home"}
                          component={DrawerNavigation}
                          options={{header: () => null}}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;
