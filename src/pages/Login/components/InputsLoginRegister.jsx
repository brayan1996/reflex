
import { InputText }                                from 'primereact/inputtext';
import { Password }                                 from 'primereact/password';

const InputsLoginRegister = ({typeComponent, isWithNameLogin, login, onInputChange}) => {
  return (
    <div>
       <h2 className='text-center'>BIENVENIDO</h2>
        {
            typeComponent==='login' 
                ?
                    <div className='field'>
                        <label htmlFor='Correo electronico'>{isWithNameLogin ? 'Nombre' :'Correo electronico'}</label>
                        <InputText
                            name={isWithNameLogin ? 'nameLogin' :'email'}
                            value={isWithNameLogin ? login.nameLogin :login.email}
                            onChange={onInputChange}
                            placeholder={isWithNameLogin ? 'Carlos Correa' :'example@gmail.com'}
                        />
                    </div>
                :<>
                    <div className='field'>
                        <label>Correo electronico</label>
                        <InputText
                            name='email'
                            value={login.email}
                            onChange={onInputChange}
                            placeholder='example@gmail.com'
                        />
                    </div>
                    <div className='field'>
                        <label>Nombre</label>
                        <InputText
                            name='nameLogin'
                            value={login.nameLogin}
                            onChange={onInputChange}
                            placeholder='Carlos Correa'
                        />
                    </div>
                </>
        }
        <div className='field'>
          <label htmlFor='Contraseña'>Contraseña</label>
          <Password
            name='password'
            value={login.password}
            onChange={onInputChange}
            feedback={false}
          />
      </div>
    </div>
  )
}

export default InputsLoginRegister