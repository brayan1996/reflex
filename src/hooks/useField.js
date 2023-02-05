import { useEffect, useState } from "react"

export const useField = ({type = 'text',defaultValue='', keySelect='code'}) => {
    const [value, setValue] = useState('')
    const onChange = (data) => setValue(data)
    const onSelect = (data) => setValue(data[keySelect])

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])
    
  return {
    type,
    value,
    onChange,
    onSelect
  }
}
