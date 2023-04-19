import { useState, useMemo, useEffect } from "react"
import { deleteFalsys } from "../helpers/transformObjects"

export const useForm = ( initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})

    const onInputChange = ( { target } ) => {
        const { name, value } = target
        setFormState(
            { 
                ...formState,
                [name]:value
            } 
        )

    }

    const formErrorsValidation = useMemo(() =>Object.values(deleteFalsys(formValidation)),[formValidation])

    const validations = () =>{
        const messagesErrorToValidations = {}
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMesagge] =   formValidations[formField]
            messagesErrorToValidations[`${formField} validation`] = fn(formState[formField]) ? null : errorMesagge
        }
        setFormValidation(messagesErrorToValidations)
    }

    useEffect(() => {
      validations()
    }, [formState])
    
  return {
    formState,
    onInputChange,
    formErrorsValidation
  } 
}
