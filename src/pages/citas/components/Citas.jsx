import React, { useEffect, useState, useRef }   from "react";
import { Checkbox }                             from 'primereact/checkbox';
import { InputText }                            from 'primereact/inputtext';
import { Button }                               from 'primereact/button';
import { ConfirmDialog, confirmDialog }         from 'primereact/confirmdialog';
import { useDispatch, useSelector }             from 'react-redux';
import { Toast }                                from 'primereact/toast';
import { requestDates, modifyDate, changeStateCitas, deleteDate, setCitasSelected, requestCitasTextSearch, createDate } from "../../../store/slices/citas";
import { setHistoryPersonSelected }             from "../../../store/slices/reactivos/reactivosSlice";
import { getHistorial }                         from "../../../store/slices/historial";
import { Tablex }                               from "../../../components/tablex/Tablex";
import { PersonModal }                          from "../components/PersonModal";
import FormPersonaModal                         from "./FormPersonaModal";
import TopNamedCombobox                         from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import { maximunNumberInArray }                 from "../../../helpers/transformArrays";
import { day }                                  from "../../../helpers/getDateNow";

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
      customComponent: "dateCheckComponent",
      editComponent: "dateCheckComponentEdit"
    },
     {
      key: "cTodoCheck",
      name: "CTodo",
      customComponent: "dateCheckComponent",
      editComponent: "dateCheckComponentEdit"
    },
    {
      key: "adelantoCheck",
      name: "Adelanto",
      customComponent: "dateCheckComponent",
      editComponent: "dateCheckComponentEdit"
    },
    {
      name: "Importe1",
      key: "advancement",
      editComponent:"editInput"
    },
    {
      key: "saldoCheck",
      name: "Saldo",
      customComponent: "dateCheckComponent",
      editComponent: "dateCheckComponentEdit"
    },
    {
      key: "balance",
      name: "Importe2", 
      editComponent:"editInput"
    },
    {
      key: "socialCheck",
      name: "Social",
      customComponent: "dateCheckComponent",
      editComponent: "dateCheckComponentEdit"
    },
    {
      name: "Operación",
      key: "op"
    },
    {
      name: "Observación",
      key: "obs"
    },
    {
      name: "#",
      key: "targetTicketNumber"
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
    
    const checksOperations = (key, citaData) =>{
      const operations = {
        'cTodoCheck': () => ({advancement:50, balance:0, op:'Cancelo todo'}),
        'adelantoCheck': () =>({advancement:30, balance:0, op:'Adelanto 30'}),
        'saldoCheck': () =>({balance:50 - parseInt(citaData.advancement || 0), op:'Saldo'}),
        'socialCheck': () =>({advancement:0, balance:0, op:'Operación social'}),
        'dateCheck':()=>({})
      }
      return operations[key]()
    }

    const updateData = async( newData, oldData ) => {
      newData.advancement = parseInt(newData.advancement) || 0
      newData.balance = parseInt(newData.balance) || 0
      newData.total =  newData.advancement + newData.balance
      if(newData.balance !== oldData.balance) newData.segundoPago = day()
      dispatch( modifyDate(newData) )
    }

    const createData = async(body) => {
      body.date = value
      dispatch(createDate(body))
    }

    const dateCheckComponent = ( row, _, key, setRow ) => {
      return(
        <Checkbox
        checked={row[key]}
        onChange={(e) => {
          if(row.action === 'add'){
            let newData = {...row, [key]:e.target.checked}
            if(e.target.checked) newData = {...newData,...checksOperations(key, row)}
            setRow(newData)
          }else{ 
            let newData = {...row,[key]:!row[key]}
            if(!row[key]) newData = {...newData,...checksOperations(key, row) }
            dispatch(modifyDate(newData))
          }
          }}
        />
      )
    }

    const dateCheckComponentEdit = ( options, setRow ) => {
      return(
        <Checkbox
        checked={options.rowData[options.field]}
        onChange={(e) => {
          let newData = {...options.rowData, [options.field]:e.target.checked}
          if(e.target.checked) newData = {...newData,...checksOperations(options.field, options.rowData)}
          setRow(newData)
          options.editorCallback(e.target.checked)
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
      const widthInput ={
        'doc':'w-9',
        'advancement':'w-5',
        'balance':'w-5'
      }
      return (
        <div className="sizes">
          <InputText 
            type="text"
            className={`block mb-2 ${widthInput[options.field]}`}
            value={options.value}
            onChange={(e) =>options.editorCallback(e.target.value)}
            onBlur={(e)=>{
              if(options.field === 'doc') setNroDoc(e.target.value)
            }}  
          />
        </div>
      )
    }

    const multiHourComponent = (options) => {
      return (
        <TopNamedCombobox
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

    const header = () =>{
      return (
        <div className="flex justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText 
                  onChange={e=>{
                     dispatch(requestCitasTextSearch(e.target.value, value))
                  }}
                  placeholder="DATO DE LA CITA" 
                />
            </span>
        </div>
      )
    }

    const select = (selected) => {
      if(selected){
        dispatch( setCitasSelected(selected) )
        dispatch( setHistoryPersonSelected(selected) )
        dispatch( getHistorial({nroDoc:selected.doc, name:selected.cliente}) )
      }
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
            dateCheckComponentEdit={dateCheckComponentEdit}
            personModal={personModal}
            editInput={editInput}
            multiHourComponent={multiHourComponent}
            modalInput={modalInput}
            ticketComponent={ticketComponent}
            reciboComponent={reciboComponent}
            rowEditable
            loading={isLoading}
            updateData={updateData}
            createData={createData}
            changeState={changeStateCitas}
            tableButtonDelete={tableButtonDelete}
            selectionRow={select}
            headerBuilder={header}
            addElement
            propsStyle={{fontSize:'13px'}}
          />
      </div>
    );
}
