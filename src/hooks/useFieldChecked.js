import { useEffect, useState } from "react"

const useFieldChecked = ({defaultChecked = false}) => {
    const [checked, setChecked] = useState(false)
    const onChange = (check) => setChecked(check)
    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked])
    
    return{
        checked,
        onChange
    }
}

export default useFieldChecked