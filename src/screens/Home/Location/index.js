import React, {useRef, useState} from 'react'
import s from './style'
import {Button, Icon, NavigationHeader, Screen, Text} from "../../../core";
import {PixelRatio, View} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import env from "../../../env";
import {SelectLocation} from "../../../sheets";
import {SafeAreaView} from "react-native-safe-area-context";

export const Location = (props) => {
    const sheetRef = useRef()
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
       <>
           <Screen
               header={<NavigationHeader style={s.header}
                                         title={<></>}
                                         buttons={
                                             <Button onPress={() => {
                                                 props.navigation.openDrawer();
                                             }}>
                                                 <Icon type={'Bars'} fill={'white'}/>
                                             </Button>
                                         }
                                         {...props}/>}
           >
               <View style={s.top}>
                   <Button style={s.top_btn}>
                       <Icon type={'Mark'} size={16} fill={'#F4909E'}/>
                       <Text size={'10_400'}>No space available</Text>
                   </Button>
                   <View style={s.divider}/>
                   <Button style={s.top_btn}>
                       <Icon type={'Mark'} size={16} fill={'#67E0D4'}/>
                       <Text size={'10_400'}>No space available</Text>
                   </Button>
                   <View style={s.divider}/>
                   <Button style={s.top_btn}>
                       <Icon type={'Mark'} size={16} fill={'#FFDF7A'}/>
                       <Text size={'10_400'}>No space available</Text>
                   </Button>
               </View>
               <MapView key={env.GOOGLE_MAP_KEY}
                        provider={PROVIDER_GOOGLE}
                        style={s.map}
                        region={region}
                        mapType={'standard'}
                        showsCompass={true}
               >
                   <Marker
                       coordinate={{
                           latitude: +region.latitude,
                           longitude: +region.longitude,
                       }}
                       title={'region.name'}
                       description={'description'}
                       onPress={() => {
                           sheetRef.current.snapToIndex(0)
                       }}
                   >
                       <Icon type={'Mark'}/>
                   </Marker>
               </MapView>
           </Screen>
           <SelectLocation ref={sheetRef}/>
       </>
    )
}
