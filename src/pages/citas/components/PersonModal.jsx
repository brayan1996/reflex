import { InputText } from 'primereact/inputtext';
import { useState, useEffect } from 'react';
import ModalMantenimiento from '../../../components/modals/mantenimientoModals'
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)', // maxWidth: "max-content",
		height: '40%',
		width: '40%',
		boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)'
	},
	overlay: {
		zIndex: 1000,
		boxShadow: '5px 5px 15px 5px #000000'
	}
}
export const PersonModal = (props) => {
    const [value, setValue] = useState('')
    const [close, setClose] = useState(false)
    useEffect(() => {
		return setClose(false);
	}, [close])
  return (
    <ModalMantenimiento
        title={ props.title || 'Agregar Beneficiario'}
        customStyles={customStyles}
        label="Agregar Beneficiario"
        closeModal={close}
    >
        <span className="p-float-label">
            <InputText id="in" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="in">Username</label>
        </span>
    </ModalMantenimiento>
  )
}
