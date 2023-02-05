import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { requestDates, modifyDate, changeStateCitas, deleteDate } from "../../../store/slices/citas";
import { setHistoryPersonSelected } from "../../../store/slices/reactivos/reactivosSlice";
import { getHistorial } from "../../../store/slices/historial";
import { Tablex } from "../../../components/tablex/Tablex";
import { PersonModal } from "../components/PersonModal";
import FormPersonaModal from "./FormPersonaModal";

const columnConfig = [
    {
      key: "id",
      name: "Registro"
    },
    {
      key: "hour",
      name: "Hora",
      editComponent:"editInput"
    },
    {
      name: "Nro.Doc",
      key: "doc",
      editComponent:"editInput"
    },
    {
      key: "cliente",
      name: "Cliente",
      editComponent:"modalInput"
    },
    {
      key: "dateCheck",
      name: "Cita",
      customComponent: "dateCheckComponent"
    },
    {
      name: "Adelanto",
      key: "advancement"
    },
    {
      key: "balance",
      name: "Saldo"
    },
    {
      name: "op",
      key: "Op"
    },
    {
      name: "Observación",
      key: "obs"
    },
    {
      "name": "Editar",
      "rowEditor": true,
    },
    {
      name: "Elimnar",
      customComponent: "tableButtonDelete"
    },
    {
      name: "Ticket",
      customComponent: "ticketComponent"
    }
  ]

export const Citas = ({value}) => {
    const [nroDoc, setNroDoc] = useState()
    const { citasData, isLoading } = useSelector( state=> state.citas )
    const dispatch = useDispatch(); 
    const toast = useRef(null);

    
    const confirm1 = (data) => {
      confirmDialog({
        message: 'Esta seguro que desea eliminar?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => dispatch( deleteDate(data) ),
      });
    };
    
    const updateData = async( newData ) => {
      dispatch( modifyDate(newData) )
    }

    const dateCheckComponent = ( row ) => {
      return(
        <Checkbox
          checked={row.dateCheck}
          onChange={()=>{
            const newData = {...row,dateCheck:!row.dateCheck}
            dispatch(modifyDate(newData))
          }}
        />
      )
    }

    const tableButtonDelete = (rowData) => {
      return (
        <div className='actions'>
          <Button
            icon='pi pi-trash'
            className='p-button-rounded p-button-danger'
            onClick={() => {
              confirm1(rowData);
            }}
          />
        </div>
      );
    };
    
    const personModal = (row) =>{
      return (
        <PersonModal
          title={row.code}
        />
      )
    }
    const modalInput = (options) => {
      return(
        <FormPersonaModal
          options={options}
          nroDoc={nroDoc}
        />
      )
    }

    const editInput = (options) => {
      return (
        <InputText 
          type="text"
          value={options.value}
          onChange={(e) => options.editorCallback(e.target.value)}
          onBlur={(e)=>{
            if(options.field === 'doc') setNroDoc(e.target.value)
          }}
          
        />
      )
    }

    const ticketComponent = (rowData) => {
      return(
        <Button
          icon='pi pi-file-pdf'
          className="p-button-rounded p-button-text"
          onClick={()=>console.log(rowData)}
        />
      )
    }
    const select = (selected) => {
      dispatch( setHistoryPersonSelected(selected) )
      dispatch( getHistorial({nroDoc:selected.doc, name:selected.cliente}) )
    }

    useEffect(() => {
      dispatch( requestDates(value) )   
    }, [value])
    
    return (
      <div className="w-full card">
        <Toast ref={toast} position="bottom-right"/>
        <ConfirmDialog />
        <div className="w-4/12 mx-auto mb-10">
          </div> 
          <Tablex
            tableConfig={columnConfig}
            data={citasData}
            dateCheckComponent={dateCheckComponent}
            personModal={personModal}
            editInput={editInput}
            modalInput={modalInput}
            ticketComponent={ticketComponent}
            rowEditable
            loading={isLoading}
            updateData={updateData}
            changeState={changeStateCitas}
            tableButtonDelete={tableButtonDelete}
            selectionRow={select}
          />
      </div>
    );
}
