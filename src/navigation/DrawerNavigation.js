import {createDrawerNavigator} from "@react-navigation/drawer";
import {Location, Payments, MyBookings} from "../screens";
import {DrawerMenu} from "../components";
import {Profile} from "../screens/Home/Profile";
import {Button, Icon} from "../core";
import {Colors, padding} from "../resources";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const navigation = useNavigation()

    return (
        <Drawer.Navigator initialRouteName={"Location"}
                          screenOptions={{drawerPosition: "right",}}
                          drawerContent={props => <DrawerMenu {...props} />}
        >
            <Drawer.Screen name={"Location"}
                           component={Location}
                           options={{header: () => null}}
            />
            <Drawer.Screen name={"Payments"}
                           component={Payments}
                           options={{header: () => null}}
            />
            <Drawer.Screen name={"Profile"}
                           component={Profile}
                           options={{header: () => null}}
            />
            <Drawer.Screen name={"MyBookings"}
                           component={MyBookings}
                           options={{header: () => null}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
