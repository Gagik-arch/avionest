import {useEffect} from "react";
import {
    ForgotPassword, NoNetwork, Signin, Signup, OTP, NewPassword, Steps, UserInfo, Welcome,
    YourQualifications, PaymentDetails
} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {YourAircraft} from "../screens/Auth/YourAircraft";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Location} from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator initialRouteName={"Location"}>
            <Drawer.Screen name={"Location"}
                           component={Location}
                           options={{header: () => null}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
