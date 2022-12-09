import {useWindowDimensions} from 'react-native';

const useSharkLogoDimension = () => {
  const {height: windowHeight, width: windowWidth} = useWindowDimensions();

  const logoWidth = 160;
  const logoHeight = 160;

  const getBackdropDimensions = () => {
    return {
      x: windowWidth / 2,
      y: windowHeight / 2,
      rx: logoWidth * 2,
      ry: logoHeight * 2,
    };
  };

  return {
    windowHeight,
    windowWidth,
    logoHeight,
    logoWidth,
    getBackdropDimensions,
  };
};

export default useSharkLogoDimension;
