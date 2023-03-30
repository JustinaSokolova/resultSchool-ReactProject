import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfessionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);

  async function getProfessionsList() {
    try {
      const { content } = await ProfessionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    getProfessionsList();
  }, []);

  function getProfession(id) {
    return professions.find((p) => p._id === id);
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <ProfessionContext.Provider
      value={{
        isLoading,
        professions,
        getProfession,
        getProfessionsList,
        setProfessions,
      }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
