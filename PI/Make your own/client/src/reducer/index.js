const initialState = {
    characters: [],
    charactersFilter: [],
    types: [],
    detail: []
}




function rootReducer (state = initialState, action){
switch(action.type){
    case "GET_CHARACTERS":  
    return  {
        ...state,
        characters: action.payload,
        charactersFilter: action.payload
    }
    case "GET_NAME_CHARACTERS":
        return {
            ...state,
            charactersFilter: action.payload 
        }
    case "FILTER_BY_TYPES":
        const allCh = state.characters
        const filterAllCh = action.payload === "Types"? allCh: allCh.filter(e => e.types.map((el) => el.name).includes(action.payload))
          return {
                ...state,
                charactersFilter: filterAllCh
                
          }  

    case "FILTER_CREATED": 

    var filterCreatedDB; 
    if (action.payload === "all"){
        filterCreatedDB = state.characters
    }
    else if (action.payload === "api"){
        filterCreatedDB = state.characters.filter(poke => !poke.createdInDb)
    }
    else if (action.payload === "db"){
        filterCreatedDB = state.characters.filter(poke => poke.createdInDb)
    }

    return{
     ...state,
     charactersFilter: filterCreatedDB
    }


    case "POST_CHARACTER": 
        return{
            ...state,
        }
    
    case "GET_TYPES":
        return {
            ...state,
            types: action.payload
        }


    case "ORDER_BY_NAME":
        var uno = [...state.charactersFilter]
        action.payload === "asc"? uno.sort(function(a,b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
             return 1
            }
            if(b.name.toLowerCase() > a.name.toLowerCase()){
             return -1
            }
            return 0
         }):
         uno.sort(function(a,b){
           if(a.name.toLowerCase() > b.name.toLowerCase()){
             return -1
            }
            if(b.name.toLowerCase() > a.name.toLowerCase()){
             return 1
            }
            return 0
         })
         return {
           ...state,
           charactersFilter:uno
           }
 

    case "ORDER_BY_ATTACK":
 
        let sortedArr1 = action.payload === 'attackMin' ?
            state.charactersFilter.sort(function(a,b){
                if (a.attack > b.attack){
                    return 1;
                }
                if (b.attack > a.attack){
                    return -1;
                }
                return 0;
            }):
            state.charactersFilter.sort(function(a,b){
                if (a.attack > b.attack){
                    return -1;
                }
                if (b.attack > a.attack){
                    return 1;
                }
                return 0;
            })
        return {
            ...state,
            charactersFilter: sortedArr1
        }

        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }
        case "CLEAN_FILTER":
            return {
                ...state,
                charactersFilter: action.payload,
                detail: action.payload
            }

   

  
        default: return state;
    }
}


export default rootReducer

