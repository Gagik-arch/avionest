import React, {useState} from "react";
import {Image, View} from "react-native";
import s from "./style";
import PagerView from "react-native-pager-view";

export const Slider = ({data}) => {
    const [selected, setSelected] = useState(0)

    return (
        <View style={s.pager_view_container}>
            <PagerView style={s.pager_view} initialPage={selected}
                       onPageSelected={({nativeEvent}) => {
                           setSelected(nativeEvent.position)
                       }}>
                {data.map((item, index) => {
                    return (
                        <Image key={index} source={item} style={s.image}/>
                    )
                })}
            </PagerView>
            <View style={s.slider_markers}>
                {
                    data.map((_, index) => {
                        return (
                            <View key={index} style={[
                                s.marker,
                                {
                                    backgroundColor: selected === index ?
                                        'rgba(3, 65, 104, 0.80)' :
                                        'rgba(255, 255, 255, 0.80)'
                                }
                            ]}/>
                        )
                    })
                }
            </View>
        </View>
    )
}
