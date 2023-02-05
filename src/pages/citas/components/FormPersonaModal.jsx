import { FormPersona } from "../../personas/components/FormPersona"
import ModalMantenimiento from "../../../components/modals/mantenimientoModals"
import { useEffect, useState } from 'react';
import Personas from "../../../apis/Personas";
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
  const getNamePerson = async(nrDoc) => {
    return (await Personas.getPersonByDocument(nrDoc))?.data.shift()?.nombre
  }
  const closeModal = () =>{
    setClose(true)
  }
  useEffect(() => {
    (async function(){
      const nroDoc = props.nroDoc || props.options.rowData.doc
      const namePerson = await getNamePerson(nroDoc)
      if(namePerson){
        setnombre(namePerson)
        setIsTherePerson(true)
        // props.options.editorCallback(namePerson)
      }else setIsTherePerson(false) 
    })()
  }, [props.nroDoc])
  
  useEffect(() => {
		return setClose(false);
	}, [close])

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
            // isOpen={true}
          >
            <FormPersona
              nroDoc={props.nroDoc || props.options.rowData.doc}
              closeModal={closeModal}
            />
          </ModalMantenimiento>
        )
      
      }
        
    </div>
  )
}

export default FormPersonaModal
