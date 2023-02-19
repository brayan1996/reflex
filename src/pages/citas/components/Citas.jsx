import React, { useEffect, useState, useRef }   from "react";
import { Checkbox }                             from 'primereact/checkbox';
import { InputText }                            from 'primereact/inputtext';
import { Button }                               from 'primereact/button';
import { ConfirmDialog, confirmDialog }         from 'primereact/confirmdialog';
import { useDispatch, useSelector }             from 'react-redux';
import { Toast }                                from 'primereact/toast';
import { requestDates, modifyDate, changeStateCitas, deleteDate, setCitasSelected } from "../../../store/slices/citas";
import { setHistoryPersonSelected }             from "../../../store/slices/reactivos/reactivosSlice";
import { getHistorial }                         from "../../../store/slices/historial";
import { Tablex }                               from "../../../components/tablex/Tablex";
import { PersonModal }                          from "../components/PersonModal";
import FormPersonaModal                         from "./FormPersonaModal";
import TopNamedCombobox                         from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import { maximunNumberInArray }                 from "../../../helpers/transformArrays";


const columnConfig = [
    {
      key: "id",
      name: "Registro"
    },
    {
      key: "hour",
      name: "Hora",
      editComponent:"multiHourComponent"
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
      name: "#",
      key: "targetTicketNumber"
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
    },
    {
      name: "Recibo",
      customComponent: "reciboComponent"
    }
  ]
const hoursDate = [
  {hour:'7:00 AM', value:'7:00'},
  {hour:'7:30 AM', value:'7:30'},
  {hour:'8:00 AM', value:'8:00'},
  {hour:'8:30 AM', value:'8:30'},
  {hour:'9:00 AM', value:'9:00'},
  {hour:'9:30 AM', value:'9:30'},
  {hour:'10:00 AM', value:'10:00'},
  {hour:'10:30 AM', value:'10:30'},
  {hour:'11:00 AM', value:'11:00'},
  {hour:'11:30 AM', value:'11:30'},
  {hour:'12:00 M', value:'12:00'},
  {hour:'12:30 PM', value:'12:30'},
  {hour:'1:00 PM', value:'13:00'},
  {hour:'1:30 PM', value:'13:30'},
  {hour:'2:00 PM', value:'14:00'},
  {hour:'2:30 PM', value:'14:30'},
  {hour:'3:00 PM', value:'15:00'},
  {hour:'3:30 PM', value:'15:30'},
  {hour:'4:00 PM', value:'16:00'},
  {hour:'4:30 PM', value:'16:30'},
  {hour:'5:00 PM', value:'17:00'},
  {hour:'5:30 PM', value:'17:30'},
  {hour:'6:00 PM', value:'18:00'},
  {hour:'6:30 PM', value:'18:30'},
  {hour:'7:00 PM', value:'19:00'},
  {hour:'7:30 PM', value:'19:30'},
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

    const multiHourComponent = (options) => {
      return (
        <TopNamedCombobox
            // label='Terapeuta'
            data={hoursDate}
            dataKey="value"
            textField="hour"
            value={options.value}
            onSelect={ e => options.editorCallback(e.value) }
        />
      )
    }

    const ticketComponent = (rowData, _, __, setRowData, ___, ____, allData) => {
      return(
        <Button
          icon='pi pi-file-pdf'
          className="p-button-rounded p-button-text"
          onClick={()=>{
            if(!rowData.targetTicketNumber){
              const maxNumber = maximunNumberInArray(allData, 'targetTicketNumber')
              setRowData({...rowData,targetTicketNumber:maxNumber + 1 })
            }
          }}
        />
      )
    }

    const reciboComponent = (rowData) => {
      return(
        <Button
          icon='pi pi-book'
          className="p-button-rounded p-button-text"
          onClick={()=>console.log(rowData)}
        />
      )
    }
    const select = (selected) => {
      dispatch( setCitasSelected(selected) )
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
            multiHourComponent={multiHourComponent}
            modalInput={modalInput}
            ticketComponent={ticketComponent}
            reciboComponent={reciboComponent}
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
