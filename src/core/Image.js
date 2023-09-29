import * as RN from "react-native";
import {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet} from "react-native";
import {padding} from "../resources";

const Image = ({uri, style = {}}) => {
    const [size, setSize] = useState(null);
    const [dim, setDim] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        RN.Image.getSize(uri, async (width, height) => {
                setSize({width, height});
            },
            (e) => {
                // console.log(e);
            });
    }, []);

    return (
        <RN.View style={[s.container, {height: size && dim ? (dim.width / (size.width / size.height)) : 0}]}
                 onLayout={({nativeEvent}) => {
                     setDim(nativeEvent.layout);
                 }
                 }
        >
            <RN.Image source={{uri}}
                      style={[{
                          width: "100%",
                          height: size && dim ? (dim.width / (size.width / size.height)) : 0,
                      }, style]}
                      onLoadEnd={() => {
                          setIsLoading(false);
                      }}/>
            {isLoading && <RN.View style={s.loader}>
                <ActivityIndicator/>
            </RN.View>}
        </RN.View>
    );
};

const s = StyleSheet.create({
    container: {
        width: "100%",
        position:
            "relative"
    },
    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center"
    }
});
export default Image;
