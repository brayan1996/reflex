import { Tablex } from "../components/tablex/Tablex"
import {  useSelector } from 'react-redux';

const columnConfig = [
    {
      key: "code",
      name: "Código"
    },
    {
      key: "name",
      name: "Nombre"
    }
  ]
export const EnfermedadesPage = () => {
    
  const { enfermedadesData } = useSelector( state=> state.enfermedades )
  const select = (selected) => {
    console.log("🚀 ~ file: EnfermedadesPage.jsx:18 ~ select ~ selected", selected)
  }
  return (
    <>
        <div className="w-2/5">
          <Tablex
              tableConfig={columnConfig}
              data={enfermedadesData}
              selectionRow={select}
          />
        </div>
    </>
  )
}
