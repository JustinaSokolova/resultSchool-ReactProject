import React, { useState, useEffect } from "react";
import TextField from "../form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../form/checkBoxField";

import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
// import * as yup from "yup";

const LoginForm = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Пароль обязателен для заполнения")
  //     .matches(
  //       /(?=.*[A-Z])/,
  //       "Пароль должен содержать хотя бы одну заглавную букву")
  //     .matches(
  //       /(?=.*[0-9])/,
  //       "Пароль должен содержать хотя бы одну цифру")
  //     .matches(
  //       /(?=.*[!@#$%&_*])/,
  //       "Пароль должен содержать хотя бы один специальный символ (!@#$%&_*)")
  //     .matches(
  //       /(?=.{8,})/,
  //       "Пароль должен содержать минимум 8 символов"),
  //   email: yup
  //     .string()
  //     .required("Email обязателен для заполнения")
  //     .email("Email введен некорректно"),
  // });

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email обязательно для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Пароль должен содержать минимум 8 символов",
        value: 8,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    // validateScheme.validate(data).then(() => setErrors({})).catch((err) => setErrors({ [err.path]: err.message }));
    setErrors(errors);
    return Object.keys(errors).length === 0; // вернет true - если нет ни одной ошибки, и false - если в объекте errors есть хотя бы одна ошибка
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate(); // записываем результат выполнения validate()
    if (!isValid) {
      return; // если false - останавливаем отправку формы
    }

    try {
      await signIn(data);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <TextField
        label="Email"
        type="text"
        name="email"
        value={data.value}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.value}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        className="btn btn-primary align-self-center"
        type="submit"
        disabled={!isValid}
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
