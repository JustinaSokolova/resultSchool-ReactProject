import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from "../form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../form/selectField";
import RadioField from "../form/radioField";
import MultiSelectField from "../form/multiSelectField";
import CheckBoxField from "../form/checkBoxField";

import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });

  const qualities = useSelector(getQualities());

  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

  const professions = useSelector(getProfessions());
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email обязателен для заполнения",
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
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должно содержать минимум 3 символов",
        value: 3,
      },
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию",
      },
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
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

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    dispatch(signUp(newData));
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
      <TextField
        label="Имя"
        type="name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <SelectField
        label="Выберите Вашу профессию: "
        name="profession"
        options={professionsList}
        defaultOption="Choose..."
        error={errors.profession}
        value={data.profession}
        onChange={handleChange}
      />
      <RadioField
        label="Выберите Ваш пол:"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        name="sex"
        value={data.sex}
        onChange={handleChange}
      />
      <MultiSelectField
        label="Выберите Ваши качества:"
        options={qualitiesList}
        name="qualities"
        defaultValue={data.qualities}
        onChange={handleChange}
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтвердить{" "}
        <a className="text-reset" type="button">
          лицензионное соглашение
        </a>
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

export default RegisterForm;
