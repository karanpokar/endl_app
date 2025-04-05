import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

export const promptForAuth = async () => {
  try {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const response = await rnBiometrics.isSensorAvailable();
    if (response.available) {
      const res = await rnBiometrics.simplePrompt({
        promptMessage: "Authenticate to use Nuchain Wallet",
      });
      //console.log(res)
      return res;
    }
  } catch (err) {
    console.log("Biom", err);
  }
};

export const checkForBiometricAvailability = async () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const response = await rnBiometrics.isSensorAvailable();
  if (response?.available) {
    return response;
  } else {
    return {
      available: false,
    };
  }
};


export function validateEmail(email:string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const trimAddress = (address: string, startLen = 6, endLen = 4): string => {
  if (!address) return '';
  return `${address.slice(0, startLen)}...${address.slice(-endLen)}`;
};

