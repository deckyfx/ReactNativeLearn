import { useColorScheme, ViewStyle } from 'react-native';

import { SafeAreaView as MasterSafeAreaView } from 'react-native-safe-area-context';

import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
    styles?: ViewStyle,
    children?: JSX.Element | JSX.Element[],
};


const SafeAreaView = ({ styles, children }: Props) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        flex: 1,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <MasterSafeAreaView style={[backgroundStyle, styles ? styles : {}]}>
            {children}
        </MasterSafeAreaView >
    )
}

export default SafeAreaView 