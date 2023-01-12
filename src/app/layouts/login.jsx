import React, { useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/valodator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

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
        message: "Password обязательно для заполнения",
      },
      isCapitalSymbol: {
        message: "Password должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Password должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Password должен содержать минимум 8 символов",
        value: 8,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0; // вернет true - если нет ни одной ошибки, и false - если в объекте errors есть хотя бы одна ошибка
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(); // записываем результат выполнения validate()
    if (!isValid) {
      return; // если false - останавливаем отправку формы
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-4 shadow p-4">
        <h4 className="mb-4">Login</h4>
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
            label="Password"
            type="password"
            name="password"
            value={data.value}
            onChange={handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary align-self-center" type="submit" disabled={!isValid}>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
