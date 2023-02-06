import { Button } from "primereact/button";

const SaveAndCancelButtons = ({handleSave, handleCancel ,loadingSave = false}) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-1/2 mx-auto">
            <Button
                label="Cancelar"
                className="p-button-outlined p-button-danger"
                icon="pi pi-times"
                onClick={handleCancel}
            />
            <Button
                label="Guardar"
                className="p-button-outlined"
                icon="pi pi-check"
                loading={loadingSave}
                onClick={handleSave}
            />
    </div>
  )
}

export default SaveAndCancelButtons