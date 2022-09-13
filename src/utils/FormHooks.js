import React, { useCallback } from "react";

//хук управления формой
export function useForm(initValues) {
  const [values, setValues] = React.useState(initValues ? {...initValues} : {});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  }

  return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation(initValues) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect (
    ()=>{
      if (initValues) setValues(initValues);
    },
    []
  )

  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage});
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}