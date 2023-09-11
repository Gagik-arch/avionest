import {createDrawerNavigator} from "@react-navigation/drawer";
import {Location, Payments} from "../screens";
import {DrawerMenu} from "../components";
import {Profile} from "../screens/Home/Profile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator initialRouteName={"Location"}
                          screenOptions={{drawerPosition: "right"}}
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
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
