import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { requestDates, modifyDate, changeStateCitas, deleteDate } from "../../../store/slices/citas";
import { updateOnePerson, createPerson } from "../../../store/slices/personas";
import { Tablex } from "../../../components/tablex/Tablex";
import { PersonModal } from "../components/PersonModal";
import Personas from "../../../apis/Personas";

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
      editComponent:"editInput"
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
    }
  ]

export const Citas = ({value}) => {
    // const { value, getNormalDate } = useCalendar()
    const [nroDoc, setNroDoc] = useState()
    const { citasData, isLoading } = useSelector( state=> state.citas )
    const dispatch = useDispatch(); 
    const toast = useRef(null);

    const getNamePerson = async(nrDoc, options) => {
      const nombre = (await Personas.getPersonByDocument(nrDoc))?.data.shift()?.nombre || ''
      options.editorCallback(nombre)
      if(!nombre) toast.current.show({
        severity: 'warn',
        detail: 'El cliente no existe, en caso de que escriba un nombre se guardará un nuevo cliente al confirmar la edición ',
        life: 5000,
      });
    }
    
    const confirm1 = (data) => {
      confirmDialog({
        message: 'Esta seguro que desea eliminar?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => dispatch( deleteDate(data) ),
      });
    };
    
    const updateData = async( newData, oldData ) => {
      dispatch( modifyDate(newData) )
      if((oldData.doc !== newData.doc || oldData.cliente !== newData.cliente) && newData.cliente !== ''){
        const person = (await Personas.getPersonByDocument(newData.doc))?.data?.shift()
        let newPerson = { nroDoc:newData.doc, nombre:newData.cliente }
        if(person){
          newPerson.id = person.id
          dispatch( updateOnePerson( newPerson.id ,newPerson) )
        }
        else dispatch( createPerson(newPerson) ) 
      }
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

    const editInput = (options) => {
      return (
        <InputText 
          type="text"
          value={options.value}
          onChange={(e) => options.editorCallback(e.target.value)}
          onBlur={(e)=>{
            if(options.field === 'doc') setNroDoc(e.target.value)
          }}
          onFocus={()=>{
            if(options.field === 'cliente') getNamePerson(nroDoc, options)
          }}
          
        />
      )
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
            rowEditable
            loading={isLoading}
            updateData={updateData}
            changeState={changeStateCitas}
            tableButtonDelete={tableButtonDelete}
          />
      </div>
    );
}
