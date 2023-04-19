import { checkingCredentials, login, logout }   from './userSlice'
import Users                                    from '../../../apis/Users'

export const startLoginWithName = ( {  nameLogin, password } ) => async(dispatch) =>{
    dispatch(checkingCredentials())
    try {
        const { data:user } = await Users.getUserWithNameAndPassword({nameLogin, password})
        console.log("🚀 ~ file: thunks.js:8 ~ startLoginWithName ~ user:", user)
        if(user.length > 0) dispatch( login(user[0]) )
        else dispatch(logout({messageError:'Usuario o contraseña erroneo'}))
        
    } catch (error) {
        dispatch(logout({messageError:error}))
    }
}

export const startLoginWithEmail = ( {  email, password } ) => async(dispatch) =>{
    dispatch(checkingCredentials())
    try {
        const { data:user } = await Users.getUserWithEmailAndPassword({email, password})
        if(user.length > 0) dispatch( login(user[0]) )
        else dispatch(logout({messageError:'Usuario o contraseña erroneo'}))
        
    } catch (error) {
        dispatch(logout({messageError:error}))
    }
    
}

export const createANewUser = (body) => async(dispatch, /* getState */) =>{
    dispatch(checkingCredentials())
    try {
        await Users.createUser(body)
        dispatch( login(body) )
    } catch (error) {
        dispatch(logout({messageError:error}))
    }
}