export const data =[
    {
        date:'01-01-2023 09:00:00',
        citas:[
            {
                register:'01',
                code:'01',
                Cliente:'Enrique Iglesias',
                dateCheck:true,
                advancement:'100',
                balance:'200',
                obs:'test1'
            }
        ]
    },
    {
        date:'01-01-2023 09:30:00',
        citas:[
           {
            register:'02',
            code:'02',
            Cliente:'Julio Cesar',
            dateCheck:false,
            advancement:'130',
            balance:'230',
            obs:'test2'
           }
        ]
    },
    {
        date:'01-01-2023 10:30:00',
        citas:[
            {
                register:'03',
                code:'03',
                Cliente:'Lionel Messi',
                dateCheck:true,
                advancement:'200',
                balance:'240',
                obs:'test3'
            }
        ]
    },{
        date:'11-01-2023 11:00:00',
        citas:[
           {
            register:'04',
            code:'04',
            Cliente:'Jesús de Nazaret',
            dateCheck:true,
            advancement:'110',
            balance:'290',
            obs:'dia2'
           }
        ]
    },
    {
        date:'11-01-2023 12:30:00',
        citas:[
            {
                register:'05',
                code:'05',
                Cliente:'Isaac Newton',
                dateCheck:false,
                advancement:'130',
                balance:'230',
                obs:'test2'
            }
        ]
    },
    {
        date:'11-01-2023 13:30:00',
        citas:[
            {
                register:'06',
                code:'06',
                Cliente:'Albert Einstein',
                dateCheck:true,
                advancement:'200',
                balance:'240',
                obs:'test3'
            }
        ]
    },
    {
        date:'11-01-2023 10:30:00',
        citas:[
            {
                register:'07',
                code:'07',
                Cliente:'Lionel Messi',
                dateCheck:true,
                advancement:'200',
                balance:'240',
                obs:'test3'
            }
        ]
    },{
        date:'21-01-2023 11:00:00',
        citas:[
           {
            register:'08',
            code:'08',
            Cliente:'Charles Darwin',
            dateCheck:true,
            advancement:'110',
            balance:'290',
            obs:'dia2'
           }
        ]
    },
    {
        date:'21-01-2023 12:30:00',
        citas:[
           {
            register:'09',
            code:'09',
            Cliente:'Martin Luther King',
            dateCheck:false,
            advancement:'130',
            balance:'230',
            obs:'test2'
           }
        ]
    },
    {
        date:'21-01-2023 13:30:00',
        citas:[
            {
                register:'10',
                code:'10',
                Cliente:'Adolf Hitler',
                dateCheck:true,
                advancement:'200',
                balance:'240',
                obs:'test3'
            }
        ]
    },
]

export const getCitasByDate = async(dateFilters=[]) => {
    const allCitas=dateFilters
                    .map( dateFilter =>{
                        const citas = data
                                        .filter( dateCita =>dateCita.date.includes(dateFilter) )
                                        .map( dataCita =>{
                                            const date = dataCita.date?.split(' ')[0]
                                            const hour = dataCita.date?.split(' ')[1].slice(0,-3)
                                           return {...dataCita.citas[0], date,hour }
                                        } )
                        return citas
                    } )
                    .flat()
                    .sort((a, b) => a.code - b.code)
    return allCitas
}