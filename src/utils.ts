import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

export const promptForAuth = async () => {
  try {
    const rnBiometrics = new ReactNativeBiometrics({
      allowDeviceCredentials: true,
    });
    const response = await rnBiometrics.isSensorAvailable();
    if (response.available) {
      const res = await rnBiometrics.simplePrompt({
        promptMessage: "Authenticate to use wallet",
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


const ALCHEMY_URL = 'https://polygon-amoy.g.alchemy.com/v2/Q19FeX_OTRO0E9xhDAr5rr5vMwCgakyt'; // replace with your real API key
const COMMON_PARAMS = {
  fromBlock: '0x0',
  toBlock: 'latest',
  category: ['external', 'erc20'],
  order: 'asc',
  withMetadata: true,
  excludeZeroValue: true,
  maxCount: '0x3e8',
};

export const fetchTransfersFrom = async (fromAddress: string) => {
  return fetchAlchemyTransfers({ fromAddress });
};

export const fetchTransfersTo = async (toAddress: string) => {
  return fetchAlchemyTransfers({ toAddress });
};


export const fetchAlchemyTransfers = async (addressObj: { fromAddress?: string; toAddress?: string }) => {
  try {
    const response = await fetch(ALCHEMY_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getAssetTransfers',
        params: [{ ...COMMON_PARAMS, ...addressObj }],
      }),
    });

    const data = await response.json();
    
    return data?.result?.transfers || [];
  } catch (err) {
    console.error('Error fetching transfers:', err);
    return [];
  }
};

