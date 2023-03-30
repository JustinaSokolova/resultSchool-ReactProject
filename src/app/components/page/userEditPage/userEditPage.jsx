import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import RadioField from "../../form/radioField";
import MultiSelectField from "../../form/multiSelectField";
import BackHistoryButton from "../../common/backHistoryButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = () => {
  const { professions } = useProfessions();
  const { qualities } = useQualities();
  const { currentUser, updateUserData } = useAuth();

  const [data, setData] = useState({
    _id: currentUser._id,
    name: currentUser.name,
    email: currentUser.email,
    profession: currentUser.profession,
    qualities: currentUser.qualities,
    sex: currentUser.sex,
  });

  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser && professions && qualities) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId !== currentUser.id) {
      history.replace(`/users/${currentUser._id}/edit`);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUserData(data);
    history.push("/users/" + currentUser._id);
  };

  function transformData(array) {
    return array.map((el) => ({ label: el.name, value: el._id }));
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
  useEffect(() => {
    validate();
  }, [data]);

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
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const defaultQualities = () => {
    if (isLoading) {
      return currentUser.qualities.map((q) => {
        const qualitieData = qualities.find((i) => i._id === q);
        return {
          label: qualitieData.name,
          value: qualitieData._id,
        };
      });
    }
  };

  return isLoading ? (
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
            options={transformData(professions)}
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
            options={transformData(qualities)}
            name="qualities"
            defaultValue={qualities && defaultQualities()}
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
