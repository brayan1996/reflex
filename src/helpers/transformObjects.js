//value:OBJECT => object with the data to adapt, example:{code:'AH', name:'Sida'}
//keysChange:OBJECT =>OBJECT containing the key conversion, example:{code:'CODIGO', name:'DESCRIP1'}
export const adaptKeys = (value, keysChange) => (Object.entries(value).reduce((acc, curr) =>( {...acc, [keysChange[curr[0]] || [curr[0]]]:curr[1] }),{})) 
