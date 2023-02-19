import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const Tablex = (props) => {
    const [dataTablex, setData] = useState([])
    const [trigger, setTrigger] = useState(false);
    const dispatch = useDispatch(); 
    const updateTrigger = () => {
        setTrigger(!trigger);
      };

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
                    index
                  );
                }
              : undefined;
            const componentEdit = props[column.editComponent]
              ? (options) => 
              props[column.editComponent](
                options
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
                      // padding: `${props.verticalPadding ?? 12}px 5px`,
                      // paddingLeft: i === 0 ? "20px" : "5px",
                      //ocultar todo el column sugun se requiera
                      // display: column.hidden ? "none" : "table-cell",
                    }}
              />
            )
        })
        return columns;
      }
      const onRowEditComplete1 = (e) => {
        let _products2 = [...dataTablex];
        let { newData, index, data } = e;

        _products2[index] = newData
        if(props.updateData) props.updateData(newData, data)
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
      <div className="">
        <div className="card">
          <DataTable
            value={dataTablex}
            loading={props.loading}
            emptyMessage="No hay datos para mostrar"
            selectionMode={props.selectionRow ? "single" : false}
            onSelectionChange={e => props.selectionRow(e.value)}
            editMode={props.rowEditable ? "row" : undefined}
            onRowEditComplete={props.rowEditable ? onRowEditComplete1 : undefined}
            scrollable={props.scrollable}
            scrollHeight={props.heightScroll}
          >
            {columnFactory()}
          </DataTable>
        </div>
      </div>
    </div>
  )
}
