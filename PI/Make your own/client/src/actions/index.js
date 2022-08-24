import axios from "axios"

export const actionTypes = {
    ORDER_BY_NAME: "ORDER_BY_NAME",
}


export function getCharacters(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemon");
        await dispatch({
            type: "GET_CHARACTERS",
            payload: json.data
        })
    }
}


export function filterCharactersByTypes(payload){
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}

export function filterCreated(payload){
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByDefault(payload) {
    return {
        type: "ORDER_BY_DEFAULT",
        payload
    };
};
export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    };
};

export function orderByAttack(payload) {
    return {
        type: "ORDER_BY_ATTACK",
        payload
    };
};


export function getNameCharacters(name){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/pokemon?name=${name}`)
            return dispatch({
                type: "GET_NAME_CHARACTERS",
                payload: json.data //json.data es lo que devuelve esta ruta una vez que le asigno por name
            })
        } catch (error){ 
            console.log(error)
        }
    }
}

export function getTypes(){
    return async function (dispatch) {
        var info = await axios.get ("http://localhost:3001/types", {
//se puede poner info o json
        })
        return dispatch({ type: "GET_TYPES", payload: info.data})//este types lo cambie a plural
    }
}

export function postCharacter(payload){
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/pokemon", payload)//en esta ruta quiero hacer el post del payload, ese payload es lo que me llega desde el front
        return response;
    }
}

export function getDetail (id){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/pokemon/${id}`)
            return dispatch({
                type:"GET_DETAILS",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function cleanFilter(){
    return {
        type: "CLEAN_FILTER",
        payload: []
    }
}


