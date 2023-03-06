
import { InputText }                            from 'primereact/inputtext';
import { Checkbox }                             from 'primereact/checkbox';
import { Button }                               from 'primereact/button';
import ModalMantenimiento                       from "../../../components/modals/mantenimientoModals";
import { Tablex }                               from "../../../components/tablex/Tablex";
import TopNamedCombobox                         from "../../../components/inputs/TopNamedCombobox/TopNamedCombobox";
import FormPersonaModal                         from "./FormPersonaModal";

const columnConfig2 = [
    {
      key: "hour",
      name: "Hora",
      customComponent:"multiHourComponent"
    },
    {
      name: "Nro.Doc",
      key: "doc",
      customComponent:"editInput"
    },
    {
      key: "cliente",
      name: "Cliente",
      customComponent:"modalInput"
    },
    {
      key: "dateCheck",
      name: "Cita",
      customComponent: "dateCheckComponent"
    },
     {
      key: "cTodoCheck",
      name: "CTodo",
      customComponent: "dateCheckComponent"
    },
    {
      key: "adelantoCheck",
      name: "Adelanto",
      customComponent: "dateCheckComponent"
    },
    {
      name: "Importe1",
      key: "advancement", //imp1
      customComponent:"editInput"
    },
    {
      key: "saldoCheck",
      name: "Saldo",
      customComponent: "dateCheckComponent"
    },
    {
      key: "balance",
      name: "Importe2", //imp2
      customComponent:"editInput"
    },
    {
      key: "socialCheck",
      name: "Social",
      customComponent: "dateCheckComponent"
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
      name: "Guardar",
      customComponent: "saveComponent"
    },
  ]
  
const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "70vw",
      height: "20vh",
      boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
    },
    overlay: { zIndex: 1000, boxShadow: "5px 5px 15px 5px #000000" },
  };

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
  
  const ModalAddCita = (props) => {
    const saveComponent = (rowData) =>{
        return (
          <div className='actions'>
            <Button
              icon='pi pi-save'
              className='p-button-rounded p-button-info'
              onClick={() => {
                console.log(rowData)
              }}
            />
          </div>
        )
    }
      
      const modalInput = (rowData) => {
        return(
          <FormPersonaModal
            // options={options}
            // nroDoc={nroDoc}
          />
        )
      }
  
      const editInput = (rowData) => {
        return (
          <InputText 
            type="text"
            // value={options.value}
            // onChange={(e) => options.editorCallback(e.target.value)}
            // onBlur={(e)=>{
            //   if(options.field === 'doc') setNroDoc(e.target.value)
            // }}
            
          />
        )
      }

      const dateCheckComponent = ( row, _, key, setRow ) => {
        console.log("🚀 ~ file: ModalAddCita.jsx:157 ~ dateCheckComponent ~ row:", row)
        //advancement
        return(
          <Checkbox
            checked={row[key]}
            onChange={()=>{
              let newData = {...row,[key]:!row[key]}
              if(!row[key]) newData = {...newData,...props.checksOperations(key, row) }
              console.log("🚀 ~ file: ModalAddCita.jsx:166 ~ dateCheckComponent ~ newData:", newData)
              setRow(newData)
            }}
          />
        )
      }
    const multiHourComponent = (row) => {
        return (
          <TopNamedCombobox
              // label='Terapeuta'
              data={hoursDate}
              dataKey="value"
              textField="hour"
            //   value={options.value}
            //   onSelect={ e => options.editorCallback(e.value) }
          />
        )
    }



  return (
    <ModalMantenimiento
        icon="pi pi-plus"
        className="p-button-success mr-2"
        customStyles={customStyles}
    >
        <div className="w-11/12 mx-auto shadow-sm border-2 py-3 px-3 flex">
        <Tablex
            tableConfig={columnConfig2}
            dateCheckComponent={dateCheckComponent}
            editInput={editInput}
            multiHourComponent={multiHourComponent}
            modalInput={modalInput}
            saveComponent={saveComponent}
            data={[{}]}
            // changeState={changeStateCitas}
            // selectionRow={select}
        />
        </div>
    </ModalMantenimiento>
  )
}

export default ModalAddCita