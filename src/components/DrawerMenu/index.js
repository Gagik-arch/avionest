import {View} from "react-native";
import {Button, Icon, Text, Switch, Loader} from "../../core";
import s from './style'
import {Colors} from "../../resources";
import {SafeAreaView} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {useState} from "react";

export const DrawerMenu = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SafeAreaView>
            <View style={s.container}>
                <View style={{width: '100%', alignItems: 'flex-end'}}>
                    <Button style={s.b}
                            onPress={() => {
                                props.navigation.closeDrawer();
                            }}>
                        <Icon type={'X'} stroke={'#034168'}/>
                    </Button>
                </View>
                <Tab icon={<Icon type={'User'} fill={Colors.darkBlue} size={20}/>}
                     label={'Profile'}
                     right={<Icon type={'ChevronRight'} stroke={'#B2B2B2'} size={20}/>}
                     onPress={() => {
                         props.navigation.navigate('Profile')
                     }}
                />
                <Tab icon={<Icon type={'Lock'} stroke={Colors.darkBlue} size={20}/>}
                     label={'Settings'}
                     right={<Icon type={'ChevronRight'} stroke={'#B2B2B2'} size={20}/>}
                     containerStyle={s.tab_container}
                />
                <Tab icon={<Icon type={'Bell'} stroke={Colors.darkBlue} fill={'transparent'} size={20}/>}
                     label={'Notifications'}
                     right={<Switch/>}
                     containerStyle={{marginBottom: 10}}
                />
                <Text style={{color: 'rgba(20, 24, 31, 0.67)'}} size={'10_400'}>Help & Support</Text>
                <Tab icon={<Icon type={'File'} fill={Colors.darkBlue} size={20}/>}
                     label={'Payment'}
                     right={<Icon type={'ChevronRight'} stroke={'#B2B2B2'} size={20}/>}
                     onPress={() => {
                         props.navigation.navigate('Payments')
                     }}
                />
                <Tab icon={<Icon type={'Grid'} fill={Colors.darkBlue} size={20}/>}
                     label={'My bookings'}
                     right={<Icon type={'ChevronRight'} stroke={'#B2B2B2'} size={20}/>}
                     containerStyle={s.tab_container}
                     onPress={() => {
                         props.navigation.navigate('MyBookings')
                     }}
                />
                <Tab icon={<Icon type={'Circle'} fill={'transparent'} stroke={Colors.darkBlue} size={20}/>}
                     label={'Sign Out'}
                     right={<Icon type={'ChevronRight'} stroke={'#B2B2B2'} size={20}/>}
                     onPress={() => {
                         AsyncStorage.clear()
                             .then(() => {
                                 props.navigation.navigate('Signin')
                             })
                             .catch(() => {
                                 Toast.show({
                                     type: 'error',
                                     text1: `Something went wrong! <Logout>`,
                                 });
                             })
                             .then(() => {
                                 setIsLoading(false)
                             })

                     }}
                />
            </View>
            <Loader visible={isLoading}/>
        </SafeAreaView>
    )
}

const Tab = ({
                 icon,
                 right = <></>,
                 onPress = () => {
                 },
                 label = '',
                 containerStyle = {}
             }) => {

    return (
        <Button style={[s.tab, containerStyle]} onPress={onPress}>
            {icon}
            <Text>{label}</Text>
            <View style={{flex: 1}}/>
            {right}
        </Button>
    )
}
