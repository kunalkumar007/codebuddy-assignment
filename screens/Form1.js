import {
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";

export default function Form1({ onNext }) {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("*rn3{;3E9X$t");

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:\D*\d){2})(?=(?:[^\W_]*[\W_]){2})[A-Za-z\d\W_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    if (!validateEmail()) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!validatePassword()) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 2 special characters, and be at least 8 characters long."
      );
      return;
    }
    const data = {
      emailId: email,
      password,
    };
    onNext(data);
  };

  const onSave = () => {
    if (!validateEmail()) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!validatePassword()) {
      Alert.alert(
        "Invalid Password",
        "Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 digits, and 2 special characters, and be at least 8 characters long."
      );
      return;
    }
    const data = {
      emailId: email,
      password,
    };
    onNext(data, true);
    alert("Data saved Successfully!!");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <View />
      <View>
        <Text style={style.label}>Email</Text>
        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor="#C1C1C1"
          style={style.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={style.label}>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
          placeholderTextColor="#C1C1C1"
          style={style.input}
        />
      </View>
      <View style={style.btnContainer}>
        <TouchableOpacity
          style={[style.btnStyle, style.grayBtn]}
          onPress={onSave}
        >
          <Text style={style.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnStyle} onPress={handleSubmit}>
          <Text style={style.btnText}>Save & Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = ScaledSheet.create({
  container: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: "24@vs",
    // height: "100%",
    height: Dimensions.get("window").height / 1.5,
  },
  label: {
    color: "#010D4C",
    fontWeight: "bold",
    fontSize: "14@s",
  },
  input: {
    borderWidth: 2,
    padding: "4@s",
    marginVertical: "12@vs",
    borderRadius: 5,
    borderColor: "#010D4C",
  },
  btnStyle: {
    // borderWidth: 1,
    flex: 1,
    backgroundColor: "#010D4C",
    padding: "10@s",
    borderRadius: 5,
    marginRight: 4,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  btnContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grayBtn: {
    backgroundColor: "#C1C1C1",
  },
});
