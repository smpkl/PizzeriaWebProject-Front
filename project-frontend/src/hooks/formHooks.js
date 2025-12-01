import {useState} from 'react';

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);
  const [checkbox, setCheckbox] = useState(initState);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback(inputs);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckBox = (event) => {
    event.persist();
    const {value, checked} = event.target;
    setCheckbox((prev) => {
      if (checked) {
        if (prev.includes(value)) {
          return prev;
        }
        return [...prev, value];
      } else {
        return prev.filter((tag) => tag !== value);
      }
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    handleCheckBox,
    inputs,
    checkbox,
  };
};

export default useForm;
