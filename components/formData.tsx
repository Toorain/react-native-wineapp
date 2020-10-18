import { useState } from "react";

export const formData = (values : any) => {
  const [formValues, setFormValues] = useState({
    ...values
  });

  const handleFormValueChange = (key : any, value : any) => {
    setFormValues(
      {
        ...formValues,
        [key]: value
      }
    );
  };

  return [
    formValues,
    handleFormValueChange,
    setFormValues,
  ]
};