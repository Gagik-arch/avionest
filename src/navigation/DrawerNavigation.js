import {createDrawerNavigator} from "@react-navigation/drawer";
import {Location} from "../screens";
import {DrawerMenu} from "../components";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    return (
        <Drawer.Navigator initialRouteName={"Location"}
                          screenOptions={{drawerPosition:"right"}}
                          drawerContent={props => <DrawerMenu {...props} />}
        >
            <Drawer.Screen name={"Location"}
                           component={Location}
                           options={{header: () => null}}
            />

        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
