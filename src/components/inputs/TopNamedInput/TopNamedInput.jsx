import { useState, useEffect } from "react";
import './input.css'
const TopNamedInput = (props) => {
  const [hasError, setError] = useState(false);
  if (props.isError && (!props.value || props.value === '')) {
    props.isError(props.label)
  }
  useEffect(() => {
    if (props.state !== null) {
      setError(props.state);
    }
  }, [props.state]);

  const errorClass =
    `appearance-none block w-full h-4/6 text-gray-700 border border-red-300 rounded py-3 ${props.classInputPxProps ?? "px-4"} leading-tight focus:outline-none focus:bg-white focus:border-red-500 hover:border-red-500 transition-colors`;

  const normalClass =
    `appearance-none block w-full h-4/6 text-gray-700 border border-gray-300 rounded py-3 ${props.classInputPxProps ?? "px-4"} leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-500 transition-colors`;

  function onBlur(e) {
    // Ejecuta props.onBlurCheck si es una funcion
    if (typeof props.onBlurCheck === "function") {
      const state = props.onBlurCheck(e.target.value);
      if (state === true) {
        setError(true);
      } else {
        setError(false);
      }
    }

    // Chequea si props.onBlur es una función
    if (typeof props.onBlur === "function") {
      props.onBlur(e);
    }
  }

  function onChange(e) {    
    setError(false);
    if (typeof props.onChange === "function") {
      props.onChange(props.type === "file" ? e.target.files : e.target.value);
    }
  }

  return (
    <>
      <div className={` ${props.classContainerProps || 'w-full px-3 mb-5'}`}>
        <div className="w-full form__group field">
          <label
            className='form__label'
            title="titulo"
            style={{ "color": "black" }}
          >
            {props.label}
          </label>
          <input
              style={{ height: '37px' }}
              className={`${hasError ? errorClass : normalClass} ${props.classInputProps || ''}` + 'form__field'}
              type={props.type || "text"}
              placeholder={props.placeholder ?? ""}
              disabled={props.disabled}
              id={props.id}
              ref={props.cref}
              onBlur={onBlur}
              defaultValue={props.defaultValue}
              readOnly={props.readOnly}
              value={props.value ?? undefined}
              // valueAsDate={props.type === "date" ? props.value ?? "" : ""}
              onChange={onChange}
              autoFocus={props.autoFocus}
              max={props.max}
              maxLength={props.maxLength}
              min={props.min}
              accept={props.accept}
              onFocus={props.onFocus}
              name={props.name}
              step={props.step}
            />
          
        </div>
        {hasError ? (
          <p className="relative top-0 text-red-500 text-xs italic mt-1">
            {props.errorMsg ? props.errorMsg : ""}
          </p>
        ) : null}
      </div>
    </>
  );
}
export default TopNamedInput;
