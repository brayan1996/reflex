/* eslint-disable react-hooks/exhaustive-deps */
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import "./TopNamedCombobox.css";
const textSpecial = {color:'rgb(30 64 175)' , fontSize:'1.15rem' ,fontWeight: 700}
function TopNamedCombobox(props) {
  const [hasError, setError] = useState(false);
  const [filtered, setFiltered] = useState(Array.isArray(props.data) ? props.data : []);
  const [value, setValue] = useState();
  if (props.isError && !props.value) {
    props.isError(props.label)
  }

    /* Filtrado por backend si tiene props.search, en otro caso un filtro contains en frontend */
  const search = async (value) => {
    if (props.search) {
      const result = await props.search(value.query);
      setFiltered(result);
    } else {
      // Internal filter if contains
      const query = value.query;
      let filteredItems = [];

      for (let i = 0; i < props.data?.length ?? 0; i++) {
        let item = props.data[i];
        if (props.textField) {
          const dataNoseque = item?.[props.textField]?.toLowerCase() || ''
          if (dataNoseque.indexOf(query.toLowerCase()) >= 0) {
            filteredItems.push(item);
          }
        } else {
          if (item.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
            filteredItems.push(item);
          }
        }
      }
    setFiltered(filteredItems);
    }
  }

  useEffect(() => {
    if (props.state !== null) {
      setError(props.state);
    }
  }, [props.state]);


  useEffect(() => {
    setFiltered(Array.isArray(props.data) ? props.data : [])
  }, [props.data])
  // Configura el valor inicial
  useEffect(() => {
    const v = props.value ?? props.defaultValue
    if (filtered !== []) {
      const filterKey = props.filterBy || props.dataKey
      const match = filtered.find((item) => item[filterKey] === v);
      if (!match) {
        setValue(oldValue=> v ? v :  oldValue);
      } else {        
        setValue(match);
      }
    } else {
      setValue(v);
    }
  }, [props.value, filtered]);
  
  useEffect(() => {
    (async function(){
      if (props.search) {
        const result = await props.search(props.value);
        setFiltered(result);
      }
    })()
  }, [])
  
 
  return (
    <div className={`${props.ContainerClass ?? 'w-full px-3 mb-5 mt-4'} `}>
      <div className="w-full">
        <label
          className={
            props.classLabel || "block uppercase tracking-wide text-xs font-bold mb-2 " +
            (props.color || "text-gray-700")
          }
          style={{ "color": "black" }}
        >
          {props.label || (props.color ? "invisible" : "")}
        </label>

        <AutoComplete
          inputStyle={props.textSpecial && textSpecial}
          inputClassName={(hasError ? "p-inputtext-error w-full " : "w-full ") + " uppercase"}
          className="w-full h-4/6 p-inputtext-error"
          panelClassName="text-color-black"
          forceSelection={!props.noForceSelection && !props.multiple}
          multiple={props.multiple}
          dropdown={!props.hideCaret}
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder ?? "--Seleccionar--"}
          filter={props.filter ?? "contains"}
          field={props.textField ?? undefined}
          value={value ?? undefined}
          suggestions={filtered}
          completeMethod={search}
          onChange={(e) => {
            if (e.value !== null) {
              setValue(e.value);
            }

            if (props.required === true && (!e.value || e.value === "")) {
              setError(true);
            } else {
              setError(false);
            }

            if (e.value === "" && props.onSelect) {
              props.onSelect(e.value || "")
            }
          }}
          onSelect={props.onSelect ? v => props.onSelect(v.value) : null}
          delay={props.delay ?? 250}
          autoFocus={props.autoFocus}
          onBlur={async(e)=>{
            try {
              if(!e.target.value && filtered?.length === 0 && props.search){
                const result = await props.search(props.value)
                if (result) {
                  const resp = result.find( res => res.name === props.value )
                  setValue(resp)
                }
              }
            } catch (e) {
              console.log({ e })
            }
          }}
          optionGroupLabel={props.optgroup ? 'label' : false}
          optionGroupChildren={props.optgroup ? 'items' : false}
          scrollHeight={props.scrollHeight || '200px'}
        />
      </div>
      {hasError ? (
        <p className="relative top-0 text-red-500 text-xs italic mt-1">
          {props.errorMsg ? props.errorMsg : ""}
        </p>
      ) : null}
    </div>
  );
}

export default TopNamedCombobox;
