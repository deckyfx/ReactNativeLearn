// https://snack.expo.dev/@iaminarush/floating-label
// https://gist.github.com/halilb/9ac8e43e95ffbda42d52c34d420e78a4#file-textfield-tsx
// Cobine with UIKitten as base

import React, {
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react'

import {
    ImageProps,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextInputProps, ViewStyle
} from 'react-native';

import {
    Text,
    StyleSheet,
    View,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native'

import { Input } from '@ui-kitten/components';

import { RenderProp } from '@ui-kitten/components/devsupport';

import { Control, FieldName, FieldValues, RegisterOptions, useController } from 'react-hook-form';

interface Props extends TextInputProps {
    name: FieldName<FieldValues>,
    control?: Control<any>,
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
    label?: string,
    errorText?: string,
    style?: ViewStyle,
    onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    accessoryLeft?: RenderProp<Partial<ImageProps>>,
};

export type RefAction = {
    focus: () => void;
    blur: () => void;
}

const FloatingLabelUIKittenInput = forwardRef<RefAction, Props>((props: Props, ref: Ref<RefAction>) => {
    const {
        name,
        control,
        rules,
        label,
        errorText,
        style,
        onBlur,
        onFocus,
        accessoryLeft,
        ...restOfProps
    }: Props = props;

    const { field } = useController({
        name,
        control,
        defaultValue: '',
        rules
    })

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
            fontSize: 12,
            color: '#B00020',
            fontFamily: 'Avenir-Medium',
        },
    });

    const focus = () => inputRef.current?.focus();

    const blur = () => inputRef.current?.blur();

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!field.value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, field.value]);

    useImperativeHandle(ref, () => ({
        focus,
        blur
    }));

    return (
        <View style={[{
            minWidth: 200,
            marginBottom: 12
        }, style]}>
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
                value={field.value}
                onChangeText={field.onChange}
                onBlur={(event) => {
                    field.onBlur()
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
                                        outputRange: [8, -14],
                                    }),
                                },
                                {
                                    translateX: focusAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [accessoryLeft ? 40 : 6, 6 - (props.label?.length || 0)],
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
        </View>
    )
});

export default FloatingLabelUIKittenInput;