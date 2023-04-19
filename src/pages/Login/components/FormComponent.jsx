
import { useState }                                 from 'react';
import { useDispatch }                              from 'react-redux';
import { Button }                                   from 'primereact/button';
import { Checkbox }                                 from 'primereact/checkbox';
import Toastr                                       from '../../../components/toast/toastr';
import { startLoginWithName, startLoginWithEmail, createANewUser }  from '../../../store/slices/users/thunks';
import InputsLoginRegister                          from './InputsLoginRegister';

const FormComponent = ({typeComponent, setIsOpen, login, onInputChange, formErrorsValidation}) => {
    const [isWithNameLogin, setIsWithNameLogin] = useState(false)
    const dispatch = useDispatch()

    
    const actionSubmit = (typeProcess) =>{
        const actionSubmitOptions = {
            "login": () =>{
                isWithNameLogin 
                ? dispatch(startLoginWithName(login)) 
                : dispatch(startLoginWithEmail(login))
            },
            "register":()=>{
                dispatch(createANewUser(login))
            }
        }
        return actionSubmitOptions[typeProcess]()
    }

    const onSubmit = ( event ) =>{
        event.preventDefault()
        if(formErrorsValidation.length > 0){
            for (const messageError of formErrorsValidation) {
                Toastr.warn(messageError)
            }
            return
        }
        actionSubmit(typeComponent)
    }

  return (
    <form action='/citas' className='p-fluid' onSubmit={ onSubmit }>
        <InputsLoginRegister
            typeComponent={typeComponent}
            isWithNameLogin={isWithNameLogin}
            login={login}
            onInputChange={onInputChange}
        />
        <Button type='submit' label={typeComponent==='login'? 'Ingresar' : 'Registarse'} className='mt-5 mb-2' />
        {
            typeComponent==='login' 
            ?   <div className="flex justify-around items-center">
                    <Checkbox 
                        onChange={()=>setIsWithNameLogin( !isWithNameLogin )} 
                        checked={isWithNameLogin}
                        tooltip='¿Desea registrase con su nombre?'
                        />
                    <p onClick={()=>setIsOpen( old =>!old )} className='form_register'>Registrarse</p>
                </div>
            :   <div className='flex justify-center'>
                    <p onClick={()=>setIsOpen( old =>!old )} className='form_register'>Regresar al login</p>
                </div>
        }
    </form>
  )
}

export default FormComponent