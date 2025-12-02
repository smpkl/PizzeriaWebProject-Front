import {useState} from 'react';

const useForm = (callback, callback2, initState, initStateCheckbox) => {
  const [inputs, setInputs] = useState(initState);
  const [checkbox, setCheckbox] = useState(initStateCheckbox);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback(inputs, checkbox);
  };

  //decides type by elements type attribute.
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]:
        event.target.type === 'number'
          ? event.target.value === ''
            ? ''
            : Number(event.target.value)
          : event.target.value,
    }));
  };

  //saves checkbox values as a list which are checked (checked === true)
  const handleCheckBox = (event) => {
    event.persist();
    const {value, checked} = event.target;
    setCheckbox((prev) => {
      if (prev) {
        if (checked) {
          if (prev.includes(value)) {
            return prev;
          }
          return [...prev, value];
        } else {
          return prev.filter((tag) => tag !== value);
        }
      } else {
        return [value];
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
