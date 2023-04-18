import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { validator } from "../../../utils/validator";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import RadioField from "../../form/radioField";
import MultiSelectField from "../../form/multiSelectField";
import BackHistoryButton from "../../common/backHistoryButton";

import {
  getQualities,
  // eslint-disable-next-line comma-dangle
  getQualitiesLoadingStatus,
} from "../../../store/qualities";
import {
  getProfessions,
  // eslint-disable-next-line comma-dangle
  getProfessionsLoadingStatus,
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const UserEditPage = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUserData());

  const [data, setData] = useState();

  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser && !professionLoading && !qualitiesLoading && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
      });
    }
  }, [currentUser, professionLoading, qualitiesLoading, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
  }));

  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const handleChange = (target) => {
    if (target.name === "qualities") {
      const newValue = target.value.map((q) => q.value);
      setData((prevState) => ({ ...prevState, qualities: newValue }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  function transformData(data) {
    return getQualitiesListByIds(data).map((el) => ({
      label: el.name,
      value: el._id,
    }));
  }

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
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  // useEffect(() => {
  //   if (userId !== currentUser.id) {
  //     history.replace(`/users/${currentUser._id}/edit`);
  //   }
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(data));
    history.push("/users/" + currentUser._id);
  };

  return !isLoading ? (
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
            options={professionsList}
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
            options={qualitiesList}
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
