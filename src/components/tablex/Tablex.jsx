import { useState, useEffect }                from 'react';
import { DataTable }                          from 'primereact/datatable';
import { Column }                             from 'primereact/column';
import { useDispatch }                        from 'react-redux';
import { Button }                             from 'primereact/button';
import { builObjectWithArrayKey }             from '../../helpers/transformArrays';


export const Tablex = (props) => {
    const [dataTablex, setData] = useState([])
    const [trigger, setTrigger] = useState(false);
    const dispatch = useDispatch(); 
    const updateTrigger = () => {
        setTrigger(!trigger);
      };

    const addElementButton = () =>{
      return(
        <Button
          label='Agregar Elemento'
          icon='pi pi-plus'
          className="p-button-success mr-2"
          onClick={()=>{
            const newObject = builObjectWithArrayKey(props.tableConfig, 'key')
            setData([{action:'add',...newObject},...dataTablex])
          }}
        />
      )
    }

    const renderHeader = () => {
      // Chequea si headerBuilder es una función
      let header = null;
      if (typeof props.headerBuilder === "function") {
        //n
        header = props.headerBuilder({
          data: dataTablex,
        });
      }
      //n
      return (
        <>
          {/* {props.addElement && props.addElement()} */}
          {props.addElement && addElementButton()}
          <div className="table-header mt-2">{props.title}</div>
          {header}
        </>
      );
    }
    const header = renderHeader();

    const columnFactory = () => {
        const  columnConfig  = props.tableConfig;
        // const columns = [];
        const columns = columnConfig?.map((columnConfig, i)=>{
            const column = columnConfig;
            const componentBody = props[column.customComponent]
              ? (rowData) => {
                  const index = dataTablex.indexOf(rowData);
                  return props[column.customComponent](
                    rowData,
                    updateTrigger,
                    column.key,
                    (newRowData) => {
                      const newData = [...dataTablex];
                      newData[index] = newRowData;
                      setData(newData);
                    },
                    () => {
                      const newData = [...dataTablex];
                      newData.splice(index, 1);
                      setData(newData);
                    },
                    index,
                    dataTablex
                  );
                }
              : (column.customComponent === 'tableButtonSave')
              ? tableButtonSave()
              : undefined
            const componentEdit = props[column.editComponent]
              ? (options) =>(
                props[column.editComponent](
                  options,
                  (newRowData) => {
                    const newData = [...dataTablex];
                    newData[options.rowIndex] = newRowData;
                    setData(newData);
                  }
                )
              )
              : undefined;

            const componentFilter = props[column.filterComponent]
              ? props[column.filterComponent](
                  lazyParams.filters[column.key]?.value,
                  (value) => {
                    dt.current.filter(
                      value,
                      column.key,
                      column.filterMatchMode ?? "equals"
                    );
                  }
                )
              : undefined;

            return(
                <Column
                    filter={column.filter}
                    filterElement={componentFilter}
                    filterMatchMode={column.filterMatchMode ?? "contains"}
                    key={`${column.key}${i}`}
                    field={column.key}
                    header={column.name}
                    sortable={column.sortable}
                    rowReorder={props.reorderableColumn ? column.rowReorder : false}
                    rowEditor={props.rowEditable ? column.rowEditor : false}
                    body={componentBody}
                    editor={componentEdit}
                    style={{
                      flexBasis: column.width,
                      fontSize: props.propsStyle?.fontSize || '10px'
                    }}
              />
            )
        })
        return columns;
      }
    
    const onRowEditComplete1 = (e) => {
      let _products2 = [...dataTablex];
      let { newData, index, data } = e;
      newData = {...newData, ...data}
      _products2[index] = newData
      if(!newData) return
      if(props.updateData || props.createData){
        if(newData.action){
          const {action, ...bodySinAction} = newData
          props.createData(bodySinAction)
        }else  props.updateData(newData, data)
      }
      setData(_products2);
    }
    
    useEffect(() => {
      if(props.changeState) dispatch(props.changeState(dataTablex))
    }, [dataTablex])
     
    useEffect(() => {
        setData(props.data)
    }, [props.data])
    
  return (
    <div>
      <div className="w-full">
        <div className="card">
          <DataTable
            value={dataTablex}
            loading={props.loading}
            emptyMessage="No hay datos para mostrar"
            header={header}
            selectionMode={props.selectionRow ? "single" : false}
            onSelectionChange={e => props.selectionRow(e.value)}
            editMode={props.rowEditable ? "row" : undefined}
            onRowEditComplete={props.rowEditable ? onRowEditComplete1 : undefined}
            scrollable={props.scrollable}
            scrollHeight={props.heightScroll}
            filterDisplay={props.filterDisplay}
          >
            {columnFactory()}
          </DataTable>
        </div>
      </div>
    </div>
  )
}
