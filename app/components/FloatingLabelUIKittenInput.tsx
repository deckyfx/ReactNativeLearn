// https://snack.expo.dev/@iaminarush/floating-label
// https://gist.github.com/halilb/9ac8e43e95ffbda42d52c34d420e78a4#file-textfield-tsx
// Cobine with UIKitten as base

import React, { useEffect, useRef, useState } from 'react'

import { ImageProps, NativeSyntheticEvent, TextInputFocusEventData, ViewStyle } from 'react-native';

import {
    Text,
    StyleSheet,
    View,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native'

import { Input, Layout } from '@ui-kitten/components';

import { RenderProp } from '@ui-kitten/components/devsupport';

type Props = {
    label?: string,
    errorText?: string,
    value?: string,
    style?: ViewStyle,
    onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    accessoryLeft?: RenderProp<Partial<ImageProps>>,
    [x: string]: any;
};

const FloatingLabelUIKittenInput = (props: Props) => {
    const {
        label,
        errorText,
        value,
        style,
        onBlur,
        onFocus,
        accessoryLeft,
        ...restOfProps
    } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const inputRef = useRef<Input | null>(null);

    const focusAnim = useRef(new Animated.Value(0)).current;

    let color = isFocused ? '#080F9C' : '#B9C4CA'
    let width = isFocused ? 2 : 1
    if (errorText) {
        color = '#B00020'
    }

    const styles = StyleSheet.create({
        input: {
            padding: 10,
            borderWidth: width,
            borderRadius: 4,
            fontFamily: 'Avenir-Medium',
            fontSize: 16,
        },
        labelContainer: {
            position: 'absolute',
            paddingHorizontal: 8,
            backgroundColor: 'white',
        },
        label: {
            fontFamily: 'Avenir-Heavy',
            fontSize: 16,
        },
        error: {
            marginTop: 4,
            marginLeft: 12,
            fontSize: 12,
            color: '#B00020',
            fontFamily: 'Avenir-Medium',
        },
    });

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, value]);

    return (
        <Layout style={{
            width: 200,
        }}>
            <Input
                style={[
                    styles.input,
                    {
                        borderColor: color,
                    },
                ]}
                ref={inputRef}
                accessoryLeft={accessoryLeft}
                {...restOfProps}
                value={value}
                onBlur={(event) => {
                    setIsFocused(false)
                    onBlur?.(event)
                }}
                onFocus={(event) => {
                    setIsFocused(true)
                    onFocus?.(event)
                }}
            />
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <Animated.View
                    style={[
                        styles.labelContainer,
                        {
                            transform: [
                                {
                                    scale: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0.75],
                                    }),
                                },
                                {
                                    translateY: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [18, 0],
                                    }),
                                },
                                {
                                    translateX: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [accessoryLeft ? 50 : 16, 16 - (props.label?.length || 0)],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.label,
                            {
                                color,
                            },
                        ]}
                    >
                        {label}
                        {errorText ? '*' : ''}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </Layout>
    )
};

export default FloatingLabelUIKittenInput;