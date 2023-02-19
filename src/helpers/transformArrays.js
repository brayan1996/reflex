
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
