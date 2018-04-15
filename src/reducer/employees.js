import {
    FAIL,
    SUCCESS,
    START,
    LOAD_COSTS,
    DELETE_TYPE_AND_COSTS, DELETE_COST,ADD_COST,
    LOAD_EMPLOYEES,
    CHANGE_EMP_DATA
} from '../constants'
import {arrToMap} from "../helpers";
import {OrderedMap,  Record} from 'immutable'

const EmployeesRecord = Record({
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: null,
    company: null,
    adress: null,
    phone: null

})
const ReducerState = Record({
    loading: false,
    loaded: false,
    pagination: {},
    entities: [],
})

const defaultState = new ReducerState();
export default (state = defaultState, action)=>{
    const {type, payload, response, randomId, error} = action
    switch (type){
        case LOAD_EMPLOYEES + START:
            return state
                .set('loading', true);
        case LOAD_EMPLOYEES + SUCCESS:
            return state
                .set( 'entities', payload.entities )
                .set( 'pagination', payload.pagination )
                .set('loading', false);
        case CHANGE_EMP_DATA + START:
            return state
                .set('loading', true);
        case CHANGE_EMP_DATA + SUCCESS:
            return state
                .set( 'entities', payload.entities )
                .set( 'pagination', payload.pagination )
                .set('loading', false);

    }
    return state
}