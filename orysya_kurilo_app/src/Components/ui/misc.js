import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { scroller } from "react-scroll";

export const Tag = props => {
  const template = (
    <div
      className={props.className}
      style={{
        background: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: props.padding,
        display: "inline-block",
        fontFamily: "Nunito",
        ...props.add
      }}
    >
      {props.text}
    </div>
  );

  if (props.link) {
    return (
      <Link className={props.className} to={props.linkto}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export const MyButton = props => {
  return (
    <Button
      href={props.link}
      variant={props.var}
      size={props.size}
      style={{
        background: props.bck,
        color: props.color,
        fontSize: props.font,
        padding: props.padding,
        ...props.add
      }}
    >
      {props.text}
    </Button>
  );
};

export const scrollToElement = element => {
  scroller.scrollTo(element, {
    duration: 1500,
    delay: 100,
    smooth: true,
    offset: -150
  });
};

export const formatMoney = (
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

export const firebaseLooper = snapshot => {
  let data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export const reverseArray = actualArray => {
  let reversedArray = [];

  for (let i = actualArray.length - 1; i >= 0; i--) {
    reversedArray.push(actualArray[i]);
  }
  return reversedArray;
};

export const validate = element => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.minLength) {
    const valid = element.value.length >= element.validation.minLength;
    const message = `${
      !valid ? `Must be greater than ` + element.validation.minLength : ""
    }`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};
