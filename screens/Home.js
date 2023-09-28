import React, { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Stepper from "../components/Stepper";

export default function Home() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState([0]);
  const [data, setdata] = useState({});

  const pushData = (val, stepData) => {
    setdata({ ...data, ...stepData });
    setStep((prev) => [...prev, val]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };

  const onNext = (userdata, saveData = false) => {
    if (saveData) {
      setdata({ ...data, ...userdata });
    } else {
      pushData(active + 1, userdata);
      setActive((p) => p + 1);
    }
  };
  const onBack = () => {
    removeData();
    setActive((p) => p - 1);
  };

  console.log({ data });

  const content = [
    <Form1 onNext={onNext} />,
    <Form2 onNext={onNext} onBack={onBack} />,
    <Form3 onBack={onBack} data={data} />,
  ];

  return (
    <SafeAreaView style={style.container}>
      <Text style={style.heading}>Register</Text>
      <Stepper
        active={active}
        content={content}
        onBack={onBack}
        step={step}
        onFinish={() => console.log("Finish")}
        onNext={onNext}
        wrapperStyle={style.stepperWrapper}
        buttonStyle={style.btnStyle}
        buttonTextStyle={style.btnText}
        stepStyle={style.stepStyle}
        showButton={false}
      />
    </SafeAreaView>
  );
}

const style = ScaledSheet.create({
  container: {
    // borderWidth: 1,
    flex: 1,
    paddingHorizontal: "24@s",
  },
  heading: {
    fontSize: 32,
    textAlign: "center",
    marginVertical: "12@vs",
    fontWeight: "bold",
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  btnStyle: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: "#010D4C",
  },
  stepperWrapper: {
    // borderWidth: 1,
    // height: Dimensions.get("window").height / 1.2,
  },
  stepStyle: {
    backgroundColor: "#010D4C",
  },
});
