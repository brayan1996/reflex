
export const changeKeysLocaltionToInteger = (arrayValue,keyDist) => 
    (arrayValue.
            map( location=>
            (
                {...location,
                DPTO:parseInt(location.DPTO) || location.DPTO,
                PROV:parseInt(location.PROV) || location.DPTO,
                [keyDist]:String(location[keyDist]) || location[keyDist]}
            ))
    )

export const maximunNumberInArray = (arrayData, keyName) =>(
    arrayData.reduce((acc, curr)=>{  
        if(curr[keyName] > acc)   return curr[keyName]    
        else return acc       
    },0)
)

export const builObjectWithArrayKey = (arrayData, key) =>(
    arrayData.reduce((acc, curr)=>{
        if(curr[key]) return {...acc, [curr[key]]:''}
        return acc
    },{})
)

export const deleteElementsDuplicateArrayOfObjects = ( arrayData ) =>{
      let set = new Set( arrayData.map( JSON.stringify ) )
      return Array.from( set ).map( JSON.parse );
}