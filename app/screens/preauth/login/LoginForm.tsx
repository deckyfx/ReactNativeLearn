import React, {
    useRef
} from 'react';

import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    ViewStyle
} from 'react-native';

import {
    Icon,
    Layout,
    Button,
} from '@ui-kitten/components';

import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'

import FloatingLabelUIKittenInput, { RefAction } from '../../../components/FloatingLabelUIKittenInput';

export type FormValues = {
    username: string;
    password: string;
};
type Style = {
    container: ViewStyle;
    layoutContainer: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    layoutContainer: {
        backgroundColor: 'transparent'
    },
});

const LoginForm = ({ }) => {
    const usernameInput = useRef<RefAction>(null);

    const passwordInput = useRef<RefAction>(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormValues>({ mode: 'onBlur' });

    

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    };

    const onInvalid: SubmitErrorHandler<FormValues> = (data) => {
        console.log(data)
    };

    const submitLogin = () => {
        console.log(errors)
        handleSubmit(onSubmit, onInvalid)();
    }

    const renderIcon = (props: any) => (
        <TouchableWithoutFeedback>
            <Icon {...props} name={'eye'} />
        </TouchableWithoutFeedback>
    );

    return (
        <KeyboardAvoidingView
            behavior="position"
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Layout style={styles.layoutContainer}>
                    <FloatingLabelUIKittenInput
                        name="username"
                        control={control}
                        rules={{
                            required: "Username is Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        }}
                        errorText={errors?.username?.message}
                        label="Username"
                        ref={usernameInput}
                        returnKeyType="next"
                        onSubmitEditing={passwordInput.current?.focus} />
                    <FloatingLabelUIKittenInput
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is Required",
                        }}
                        errorText={errors?.password?.message}
                        label="Password"
                        ref={passwordInput}
                        returnKeyType="done"
                        onSubmitEditing={submitLogin} />
                    <Button
                        appearance='filled'
                        style={{
                            marginBottom: 12
                        }}
                        onPress={submitLogin}>
                        LOGIN
                    </Button>
                    <Button appearance='outline'>
                        REGISTER
                    </Button>
                </Layout>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LoginForm;
