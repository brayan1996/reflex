import { Checkbox } from 'primereact/checkbox';
import '../TopNamedInput/input.css'
const CheckedComponent = (props) => {
    const onChange = (e) =>{
        props.onChange(e.checked)
    }
  return (
    <div className='w-full px-3 mb-5'>
        <div className="w-full form__group field">
          <label
            className='form__label'
            title="titulo"
          >
            {props.label}
          </label>
          <Checkbox
              className={props.className + 'form__field' + 'text-black'}
              disabled={props.disabled}
              id={props.id}
              checked={props.checked}
              onChange={onChange}
            />
          
        </div>
      </div>
  )
}

export default CheckedComponent