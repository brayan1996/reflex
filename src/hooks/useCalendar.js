import { useState } from "react"


export const useCalendar = () => {
    const [value, setValue] = useState('')

    const getNormalDate = (datesEvent) => {
        const lasteDay = Array.isArray(datesEvent) ? datesEvent.pop() : datesEvent
        const getDate = `${('0'+ lasteDay.day).slice(-2)}-0${lasteDay.month?.number}-${lasteDay.year}`
        setValue(getDate)
      }
  return {
    value,
    getNormalDate
  }
}
