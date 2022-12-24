import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const InputDatepicker = (props) => {
  const { control } = useFormContext();

  // Customized input for the component library datepicker
  // Is passed to the component by props "customInput"
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      name={props.itemId}
      id={props.itemId}
      onClick={onClick}
      defaultValue={value}
      ref={ref}
      className={"employeeFormItem-input"}
      placeholder={props.itemPlaceholder}
      autoComplete="off"
    />
  ));

  return (
    <div className="newEmployeeForm_item" key={props.itemId}>
      <label htmlFor={props.itemId}>{props.itemLabel + " : "}</label>
      <Controller
        control={control}
        name={props.itemId}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker
            name={props.itemId}
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            dateFormat="MM/dd/yyyy"
            placeholderText="mm/dd/yyyy"
            strictParsing
            isClearable
            todayButton="Today"
            peekNextMonth
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            customInput={<ExampleCustomInput />}
          >
            <div className={"legend-calendar"}>
              {"Choose the employee " + props.itemLabel}
            </div>
          </ReactDatePicker>
        )}
      />
      <p className="input-error-message">
        <ErrorMessage errors={props.itemErrors} name={props.itemId} />
      </p>
    </div>
  );
};

InputDatepicker.propTypes = {
  itemId: PropTypes.string,
  itemLabel: PropTypes.string,
  itemPlaceholder: PropTypes.string,
};

export default InputDatepicker;
