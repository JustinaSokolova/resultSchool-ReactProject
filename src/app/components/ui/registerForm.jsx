import React, { useState, useEffect } from "react";
import TextField from "../form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../form/selectField";
import RadioField from "../form/radioField";
import MultiSelectField from "../form/multiSelectField";
import CheckBoxField from "../form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState([]);
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfessions(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);

  const handleChange = (target) => {
    if (target) {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const isValid = validate(); // записываем результат выполнения validate()
  //   if (!isValid) {
  //     return; // если false - останавливаем отправку формы
  //   }
  // };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }
    return qualitiesArray;
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
      <SelectField
        label="Выберите Вашу профессию: "
        name="profession"
        options={professions}
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
        options={qualities}
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
