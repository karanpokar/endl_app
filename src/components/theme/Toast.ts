import Toast from 'react-native-toast-message';

export const successToast = (message:string) => {
    Toast.show({
      type: 'success',
      text1: `${message} ✅`,
    });
  }

 export const showFailure = (message:string) => {
    Toast.show({
      type: 'success',
      text1: `${message} 😩`,
    });
  }