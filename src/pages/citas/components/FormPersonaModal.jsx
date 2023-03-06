import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { createPatient } from "../../../store/slices/pacientes";
import { setVistaPagina } from '../../../store/slices/reactivos';
import Pacientes from "../../../apis/Pacientes";
import { FormPersona } from "../../personas/components/FormPersona"
import ModalMantenimiento from "../../../components/modals/mantenimientoModals"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "70vh",
    boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
  },
  overlay: { zIndex: 1000, boxShadow: "5px 5px 15px 5px #000000" },
};
const FormPersonaModal = (props) => {
	const [close, setClose] = useState(false)
  const [nombre, setnombre] = useState('')
  const [isTherePerson, setIsTherePerson] = useState(true)
  const {loadingPatients} = useSelector( state=> state.pacientes )
  const dispatch = useDispatch()
  
  const closeModal = () =>{
    setClose(true)
  }

  const getAName = async() =>{
    const nroDoc = props.nroDoc || props.options?.rowData.doc
    return (await Pacientes.requestAPatient(nroDoc))?.data.shift()?.NOMBRE || ''
  }

  const setAName = async() =>{
    const namePerson = await getAName()
    if(namePerson){
      setnombre(namePerson)
      setIsTherePerson(true)
    }else setIsTherePerson(false) 
  }
  useEffect(() => {
    setAName()
  }, [props.nroDoc, loadingPatients])
  
  useEffect(() => {
		return setClose(false);
	}, [close])

  useEffect(() => {
    dispatch(setVistaPagina('registro_paciente'))
  }, [])
  return (
    <div>
      {
      isTherePerson
        ? nombre
        : (
          <ModalMantenimiento
            customStyles={customStyles}
            closeModal={close}
            label='Agregar Persona'
            title='Agregar Persona'
            icon='pi pi-user-plus'
            isOpen={props.isOpen}
            afterCloseModal={async()=>{
              if(props.setIsOpen) props.setIsOpen(false)
            }}
          >
            <FormPersona
              action='Crear'
              numeroDocumento={props.nroDoc || props.options?.rowData.doc}
              closeModal={closeModal}
              createPerson={createPatient}
            />
          </ModalMantenimiento>
        )
      
      }
        
    </div>
  )
}

export default FormPersonaModal
