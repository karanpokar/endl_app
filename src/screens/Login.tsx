import {
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../context/useUserContext";
import Button from "../components/theme/Button";
import Input from "../components/theme/Input";

const Login = () => {
  const { userLogin }: any = useUser();
  const { width, height } = Dimensions.get("window");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ width: "100%" }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flex: 1,
              width: width,
              paddingTop: 40,
              flexDirection: "column",
              backgroundColor: "#fff",
              height: height,
              position: "relative",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              borderRadius={32}
              style={{
                width: "80%",
                borderRadius: 32,
                height: 300,
                resizeMode: "cover",
                marginBottom: 20,
              }}
              source={require("../assets/onboarding.webp")}
            />
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "900",
                marginTop: 20,
                marginBottom: 8,
                textAlign: "left",
              }}
            >
              Login to Continue
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Input
                value={email}
                setValue={setEmail}
                placeHolder={"Enter email"}
              />
              <Input
                value={password}
                setValue={setPassword}
                placeHolder={"Enter password"}
                secureTextEntry={true}
              />
            </View>
            <Button
              text={"Login"}
              onClick={() => {
                userLogin(email, password);
              }}
              style={{
                marginTop: 20,
                marginBottom: 40,
                backgroundColor: "#b4f9f4",
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
