import { InputTextarea } from 'primereact/inputtextarea';
import './index.css'

const InputTextArea = (props) => {
    function onChange(e) {    
        if (typeof props.onChange === "function") {
          props.onChange(e.target.value)
        }
    }
  return (
    <div className="w-full form__group field">
        <label
            className='form__label'
            title="titulo"
            style={{ "color": "black" }}
          >
            {props.label }
        </label>
        <InputTextarea 
            className='form__field'
            style={{ height: props.height ?? '80px', resize: props.resize ?? 'inherit' }}
            type="text"
            rows={props.rows ?? 5}
            cols={props.cols ?? 30}
            placeholder={props.placeholder ?? ""}
            ref={props.cref}
            readOnly={props.readOnly}
            value={props.value ?? ''}
            disabled={props.disabled}
            maxLength={props.maxLength}
            onChange={onChange}
            // onBlur={onBlur}
            autoFocus={props.autoFocus}
            onFocus={props.onFocus}
        />
    </div>
  )
}

export default InputTextArea