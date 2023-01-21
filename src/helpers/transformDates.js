import  { DateObject } from "react-multi-date-picker";
export const transformDatesToCalendar = (fechas) =>(
    fechas.map((fecha) =>{
      const [day, month ,year] = fecha.split('-')
      return new DateObject().set({
        day: day,
        month: month,
        year:year
      })
  }))