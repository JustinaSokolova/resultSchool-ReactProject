import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../form/textField";
import SelectField from "../../form/selectField";
import RadioField from "../../form/radioField";
import MultiSelectField from "../../form/multiSelectField";

const UserEdit = () => {
  const [user, setUser] = useState();
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const params = useParams();
  const { userId } = params;
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
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
      setUser((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

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

  const getDefaultQualities = () => {
    return user.qualities.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userUpdated = {
      ...user,
      profession: getProfessionById(user.profession),
      qualities: getQualities(user.qualities),
    };
    api.users.update(userId, userUpdated);
    history.push("/users/" + userId);
  };

  return user
    ? (
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-md-4 shadow p-4">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <TextField
              label="Имя:"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              label="Email:"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <SelectField
              label="Выберите Вашу профессию: "
              name="profession"
              options={professions}
              defaultOption="Choose..."
              value={user.profession._id}
              onChange={handleChange}
            />
            <RadioField
              label="Выберите Ваш пол:"
              options={[{ name: "Male", value: "male" }, { name: "Female", value: "female" }, { name: "Other", value: "other" }]}
              name="sex"
              value={user.sex}
              onChange={handleChange}
            />
            <MultiSelectField
              label="Выберите Ваши качества:"
              options={qualities}
              name="qualities"
              defaultValue={getDefaultQualities()}
              onChange={handleChange}
            />
            <button className="btn btn-primary align-self-center" type="submit">Обновить</button>
          </form>
        </div>
      </div>
    )
    : (<p className="d-flex justify-content-center fs-4 m-4">Loading...</p>
    );
};

export default UserEdit;
