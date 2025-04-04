import { Alert } from 'react-native';
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

  export const showAlert = (onPress:any) =>
    Alert.alert(
      'Do you want to logout',
      'This will disconnect your wallets and session',
      [
        {
          text: 'Logout',
          onPress: () => {
            onPress()
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
        {}
      },
    );