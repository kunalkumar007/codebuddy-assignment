import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export default function Form2({ onBack, onNext }) {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [address, setAddress] = useState("123 Main Street, City");

  const validateFirstName = () => {
    const nameRegex = /^[a-zA-Z]{2,50}$/;
    return nameRegex.test(firstName);
  };

  const validateLastName = () => {
    if (lastName.trim() === "") {
      return true; // Optional field; no validation required if empty
    }
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(lastName);
  };
  const validateAddress = () => {
    return address.length >= 10;
  };

  const handleSubmit = () => {
    if (!validateFirstName()) {
      Alert.alert(
        "Invalid First Name",
        "Please enter a valid first name (2-50 alphabetic characters)."
      );
      return;
    }

    if (!validateLastName()) {
      Alert.alert(
        "Invalid Last Name",
        "Please enter a valid last name (alphabetic characters)."
      );
      return;
    }

    if (!validateAddress()) {
      Alert.alert(
        "Invalid Address",
        "Address must be at least 10 characters long."
      );
      return;
    }
    const data = {
      firstName,
      lastName,
      address,
    };
    onNext(data);
  };

  const onSave = () => {
    if (!validateFirstName()) {
      Alert.alert(
        "Invalid First Name",
        "Please enter a valid first name (2-50 alphabetic characters)."
      );
      return;
    }

    if (!validateLastName()) {
      Alert.alert(
        "Invalid Last Name",
        "Please enter a valid last name (alphabetic characters)."
      );
      return;
    }

    if (!validateAddress()) {
      Alert.alert(
        "Invalid Address",
        "Address must be at least 10 characters long."
      );
      return;
    }
    const data = {
      firstName,
      lastName,
      address,
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
        <Text style={style.label}>First Name:</Text>
        <TextInput
          style={style.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="Enter your first name"
          placeholderTextColor="#C1C1C1"
        />
        <Text style={style.label}>Last Name:</Text>
        <TextInput
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Enter your last name (optional)"
          placeholderTextColor="#C1C1C1"
          style={style.input}
        />
        <Text style={style.label}>Address:</Text>
        <TextInput
          onChangeText={(text) => setAddress(text)}
          value={address}
          placeholder="Enter your address"
          multiline={true}
          placeholderTextColor="#C1C1C1"
          style={style.input}
        />
      </View>
      <View style={style.btnContainer}>
        <TouchableOpacity
          style={[style.btnStyle, style.grayBtn]}
          onPress={onBack}
        >
          <Text style={style.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnStyle} onPress={onSave}>
          <Text style={style.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.btnStyle]} onPress={handleSubmit}>
          <Text style={style.btnText}>Save & Next</Text>
        </TouchableOpacity>
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
  label: {
    color: "#010D4C",
    fontWeight: "bold",
    fontSize: "14@s",
  },
});
