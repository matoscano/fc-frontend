/*eslint-disable-next-line*/
import React from "react";
import Select from "react-select";
import { useField } from "formik";

function SelectField(props) {
  // eslint-disable-next-line
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = ({ value }) => {
    setValue(value);
  };

  return (
    <Select {...props} onChange={onChange} isSearchable onBlur={setTouched} />
  );
}

export default SelectField;
