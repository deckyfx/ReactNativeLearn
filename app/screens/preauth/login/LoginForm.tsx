import React from 'react';

import { StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';

import { Icon, Input, Layout } from '@ui-kitten/components';

import FloatingLabelUIKittenInput from '../../../components/FloatingLabelUIKittenInput';


type Style = {
    container: ViewStyle;
};

const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const LoginForm = ({ }) => {
    const renderIcon = (props: any) => (
        <TouchableWithoutFeedback>
            <Icon {...props} name={'eye'} />
        </TouchableWithoutFeedback>
    );

    return (
        <Layout style={styles.container}>
            <Input
                placeholder='Place your Text'
                value={"0"}
            />
            <FloatingLabelUIKittenInput
                label="Hello"/>
        </Layout>
    );
};

export default LoginForm;
