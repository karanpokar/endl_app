import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = "Your16CharSecret";

const skipEncryptionEndpoints = [
  "/api/v1/user/profilePicture",
  "/api/v1/user/uploadProfilePicture",
  "/api/v1/recipient/generate/document",
  "/api/v1/txn/invoiceUpload",
  "/api/v1/txn/generate/document",
  "/api/v1/accounts/deposit_address/qr",
  "/api/v1/csp-report",
  "/api/v1/test/health",
  "/health",
  "/api/v1/test/ping",
  "/ping",
  "/api/v1/hooks/l2",
  "/version",
  "/post/",
  "msg-test",
];

const getKey = (secretKey) => {
  return CryptoJS.enc.Hex.parse(
    CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Hex).substring(0, 32)
  );
};

const encryptData = (payload, secretKey) => {
  try {
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = getKey(secretKey);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const encryptedDataHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    const combined = CryptoJS.enc.Hex.parse(
      iv.toString(CryptoJS.enc.Hex) + encryptedDataHex
    );

    return CryptoJS.enc.Base64.stringify(combined);
  } catch {
    return null;
  }
};

const decryptData = (encryptedPayload, secretKey) => {
  try {
    const combinedBytes = CryptoJS.enc.Base64.parse(encryptedPayload);
    const combinedHex = combinedBytes.toString(CryptoJS.enc.Hex);
    const iv = CryptoJS.enc.Hex.parse(combinedHex.substring(0, 32));
    const encryptedData = CryptoJS.enc.Hex.parse(combinedHex.substring(32));
    const key = getKey(secretKey);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
};

const apiService = axios.create({
  baseURL: "https://qa-api.endl.xyz/api/v1/",
  headers: { "Content-Type": "application/json" },
});

apiService.interceptors.request.use((config) => {
  const requestUrl = config.url;
  const shouldSkipEncryption = skipEncryptionEndpoints.some((endpoint) =>
    requestUrl.includes(endpoint)
  );

  if (shouldSkipEncryption || !config.data) return config;

  const encryptedPayload = encryptData(config.data, SECRET_KEY);
  if (!encryptedPayload) throw new Error("Encryption failed.");

  config.data = { encryptedPayload };
  return config;
}, Promise.reject);

apiService.interceptors.response.use((response) => {
  const responseUrl = response.config.url;
  const shouldSkipDecryption = skipEncryptionEndpoints.some((endpoint) =>
    responseUrl.includes(endpoint)
  );

  if (shouldSkipDecryption) return response;

  const encryptedResponse = response.data.response;
  if (!encryptedResponse) return response;

  const decryptedResponse = decryptData(encryptedResponse, SECRET_KEY);
  if (!decryptedResponse) return response;

  try {
    response.data = JSON.parse(decryptedResponse);
  } catch {
    response.data = decryptedResponse;
  }

  return response;
}, Promise.reject);

export default apiService;
