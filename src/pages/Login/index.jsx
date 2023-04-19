import { useState }                                 from 'react';
import {  useSelector }                             from 'react-redux';
import { motion }                                   from "framer-motion";
import imageReflex                                  from '../../assets/logo.jpeg';
import Loading                                      from '../../components/loading/loading';
import FormComponent                                from './components/FormComponent';
import { useForm }                                  from '../../hooks/useForm';
import { itemVariantsLogin, itemVariantsRegister }  from '../../constants/itemsVariantsTransition';
import './Login.scss';

export default function Login() { 
  const { status } = useSelector( state=> state.users )
  const [isOpen, setIsOpen] = useState(false);

  const formValidations = {
      email:[(email) => (email.includes('@') || !email.length > 0),'EL EMAIL DEBE DE TENER @'],
      password:[(pass)=>pass, 'LA CONTRASEÑA NO DEBE ESTAR VACIA'],
      nameLogin:[(name)=>name || !name.length > 0, 'EL NOMBRE NO DEBE ESTAR VACIA']
  }

  const { formState:login, onInputChange, formErrorsValidation } = useForm({
      email: '',
      password: '',
      nameLogin :''
  }, formValidations)
  
  const { 
      formState:loginRegister,
      onInputChange:onInputChangeRegister,
      formErrorsValidation:formErrorsValidationRegister
     } = useForm({
          email: '',
          password: '',
          nameLogin :''
      }, formValidations)
  
  return (
    <div className={`containerLogin`}>
      <div className={`imgLogin`}>
        <div>
          <img
            src={imageReflex}
            alt='Image Text'
            className='imgscreem'
          />
        </div>
      </div>
      
      <div className={`formLogin`}>
        {
          status === 'checking'
            ? <Loading text='Verificando usuario'/>
            : <>
                <motion.div 
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  variants={itemVariantsLogin}
                  className='formChild'
                  style={{ zIndex: isOpen ? 0 : 1 }}
                >
                  <FormComponent 
                    typeComponent='login' 
                    setIsOpen={setIsOpen}
                    login={login}
                    onInputChange={onInputChange}
                    formErrorsValidation={formErrorsValidation}
                  />
                </motion.div>
                <motion.div 
                  initial={false}
                  animate={isOpen ? "open" : "closed"}
                  variants={itemVariantsRegister}
                  className='formChild'
                  style={{ zIndex: isOpen ? 1 : 0 }}
                >
                  <FormComponent 
                    typeComponent='register' 
                    setIsOpen={setIsOpen}
                    login={loginRegister}
                    onInputChange={onInputChangeRegister}
                    formErrorsValidation={formErrorsValidationRegister}
                  />
                </motion.div>
              </>
        }
        
      </div>
    </div>
  );
}
