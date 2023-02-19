import React, { useState, useEffect } from "react";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import RadioField from "../../form/radioField";
import MultiSelectField from "../../form/multiSelectField";
import BackHistoryButton from "../../common/backHistoryButton";

const UserEditPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
  };
  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }));
  };
  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id,
      }))
    );
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);
  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Введите ваше имя",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return !isLoading && Object.keys(professions).length > 0 ? (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-md-4 shadow p-4">
        <div className="pb-4">
          <BackHistoryButton />
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <TextField
            label="Имя:"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label="Email:"
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <SelectField
            label="Выберите Вашу профессию: "
            name="profession"
            options={professions}
            defaultOption="Choose..."
            value={data.profession}
            onChange={handleChange}
            error={errors.profession}
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
          <button
            className="btn btn-primary align-self-center"
            type="submit"
            disabled={!isValid}
          >
            Обновить
          </button>
        </form>
      </div>
    </div>
  ) : (
    <p className="d-flex justify-content-center fs-4 m-4">Loading...</p>
  );
};

export default UserEditPage;
