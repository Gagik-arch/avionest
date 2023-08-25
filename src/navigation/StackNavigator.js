import {useEffect} from "react";
import {
    ForgotPassword, NoNetwork, Signin, Signup, OTP, NewPassword
} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                                    navigation.reset({index: 0, routes: [{name: "Signin"}]});
                                }
                            }
                        }).catch(() => {
                        navigation.reset({index: 0, routes: [{name: "Signin"}]});
                    });
                } else {
                    navigation.reset({index: 0, routes: [{name: "NoNetwork"}]});
                }
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <Stack.Navigator initialRouteName={"Signin"}
                         screenOptions={{
                             // navigationBarColor: scheme === "light" ? "white" : "black"
                         }}>
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
                <Stack.Screen name={"OTP"}
                              component={OTP}
                              options={{header: () => null}}
                />
                <Stack.Screen name={"NewPassword"}
                              component={NewPassword}
                              options={{header: () => null}}
                />
            </Stack.Group>

        </Stack.Navigator>
    );
};

export default StackNavigator;
