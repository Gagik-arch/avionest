import {createDrawerNavigator} from "@react-navigation/drawer";
import {Location, Payments, MyBookings, Aeroclub, Settings} from "../screens";
import {DrawerMenu} from "../components";
import {Profile} from "../screens/Home/Profile";
import {useNavigation} from "@react-navigation/native";

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
            <Drawer.Screen name={"Aeroclub"}
                          component={Aeroclub}
                          options={{header: () => null}}
            />
            <Drawer.Screen name={"Settings"}
                          component={Settings}
                          options={{header: () => null}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
