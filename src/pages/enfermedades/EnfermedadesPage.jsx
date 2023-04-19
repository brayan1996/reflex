import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Tablex } from '../../components/tablex/Tablex';
import CreateAndUpdateEnfermedad from './components/CreateAndUpdateEnfermedad';

export const EnfermedadesPage = ({
  diseasesAllData,
  columnConfig,
  setDiseasesSelected,
  deleteDisease,
  selectedDiseases,
  isLoadingDiseases,
  updateDisease,
  createDisease
}) => {
  const dispatch = useDispatch(); 
  const select = (selected) => {
    dispatch( setDiseasesSelected(selected) )
  }

  const confirm1 = (id) => {
    confirmDialog({
      message: 'Esta seguro que desea eliminar?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => dispatch( deleteDisease(id) ),
    });
  };

  const tableButtonDelete = (rowData) => {
    return (
      <div className='actions'>
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger'
          onClick={() => {
            confirm1(rowData.id);
          }}
        />
      </div>
    );
  };

  
  return (
    <>
        <div className='w-4/5 grid grid-cols-2 gap-4 mx-auto'>
        <ConfirmDialog />
          <div className="w-full form1">
            <Tablex
                tableConfig={columnConfig}
                tableButtonDelete={tableButtonDelete}
                data={diseasesAllData}
                selectionRow={select}
                scrollable
                heightScroll='380px'
                filterDisplay='row'
            />
          </div>
          <CreateAndUpdateEnfermedad
            selectedDiseases={selectedDiseases}
            isLoadingDiseases={isLoadingDiseases}
            updateDisease={updateDisease}
            createDisease={createDisease}
          />
        </div>
    </>
  )
}

export default EnfermedadesPage
