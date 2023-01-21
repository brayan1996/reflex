import { useEffect, useState } from "react"

export const useField = ({type = 'text',defaultValue=''}) => {
    const [value, setValue] = useState('')

    const onChange = (data) => {
        setValue(data)
    }
    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])
    
  return {
    type,
    value,
    onChange
  }
}
