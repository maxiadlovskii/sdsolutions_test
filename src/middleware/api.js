import {START, SUCCESS, FAIL, LOAD_EMPLOYEES, CHANGE_EMP_DATA} from "../constants";
import reqwest from 'reqwest';
export default store => next => action =>{
    const {callAPI, type, payload, ...rest} = action;
    if(!callAPI) return next(action);

    next({
        ...rest, type:  type + START
    })
    const pagination = {};
    switch (callAPI){
        case LOAD_EMPLOYEES:
            let params = {}
            reqwest({
                url: '/api/employees',
                method: 'get',
                data: {
                    ...params
                },
                type: 'json',
            }).then((data) => {
                 // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.len;
                next({
                    type:  type + SUCCESS, payload: {entities: data.entities, pagination}
                })
            });
            break
        case CHANGE_EMP_DATA:
            let param = (payload.param) ? payload.param : {}
            reqwest({
                url: '/api/employees',
                method: 'get',
                data: {
                    ...param
                },
                type: 'json',
            }).then((data) => {
                if(param.filter){
                    pagination.total = data.len;
                }
                next({
                    type:  type + SUCCESS, payload: {entities: data.entities, pagination: payload.pagination || {}}
                })
            });


    }
}