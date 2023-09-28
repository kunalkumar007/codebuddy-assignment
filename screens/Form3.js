import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function Form3({ onBack, data }) {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("2225550909");
  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(false);

  const validateCountryCode = () => {
    // Check if countryCode is either +91 (India) or +1 (America)
    return countryCode === "+91" || countryCode === "+1";
  };

  const validatePhoneNumber = () => {
    // Check if phoneNumber is a 10-digit numeric value
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSubmit = () => {
    if (!validateCountryCode()) {
      alert("Please select a valid country code.");
      return;
    }

    if (!validatePhoneNumber()) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!acceptTermsAndCondition) {
      alert("Please accept the terms and conditions.");
      return;
    }

    const userData = {
      ...data,
      countryCode,
      phoneNumber,
    };
    const userDataString = JSON.stringify(userData, null, 2); // Convert the object to a formatted JSON string
    Alert.alert("User Data", userDataString);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}
    >
      <View />
      <View>
        <Text style={style.label}>Country Code:</Text>
        {/* <TextInput
          style={style.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="Enter your first name"
          placeholderTextColor="#C1C1C1"
        /> */}
        <Picker
          selectedValue={countryCode}
          onValueChange={(value) => setCountryCode(value)}
          style={style.picker}
        >
          <Picker.Item label="Select Country Code" value="" />
          <Picker.Item label="India (+91)" value="+91" />
          <Picker.Item label="America (+1)" value="+1" />
        </Picker>
        <Text style={style.label}>Phone Number:</Text>
        <TextInput
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
          placeholder="Enter your phone number"
          placeholderTextColor="#C1C1C1"
          style={style.input}
        />
      </View>
      <View>
        <View style={style.termsContainer}>
          <Checkbox
            value={acceptTermsAndCondition}
            onValueChange={(value) => setAcceptTermsAndCondition(value)}
          />
          <Text style={style.termsTxt}>
            Please Accept Terms and Conditions.
          </Text>
        </View>
        <View style={style.btnContainer}>
          <TouchableOpacity
            style={[style.btnStyle, style.grayBtn]}
            onPress={onBack}
          >
            <Text style={style.btnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.btnStyle} onPress={handleSubmit}>
            <Text style={style.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: "24@vs",
    height: Dimensions.get("window").height / 1.5,
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
  input: {
    borderWidth: 2,
    padding: "4@s",
    marginVertical: "12@vs",
    borderRadius: 5,
    borderColor: "#010D4C",
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
  picker: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
  label: {
    color: "#010D4C",
    fontWeight: "bold",
    fontSize: "14@s",
  },
  termsTxt: {
    color: "gray",
    fontSize: "12@s",
    marginLeft: "12@s",
  },
  termsContainer: {
    // borderWidth: 1,
    flexDirection: "row",
    marginBottom: "12@vs",
  },
});
