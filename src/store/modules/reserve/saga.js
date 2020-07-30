import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess, updateAmountReserve} from './actions'
import api from '../../../services/api';
 
// O * e yield é como se fosse o Async Await mas dentro do Saga
// Esta funcão realiza uma requisição GET via Redux (tirando a necessidade de fazer a requisção toda hora do mesmo conteúdo);

function* addToReserve({ id }){
    const tripExist = yield select(
        state => state.reserve.find(trip => trip.id === id )
    ); 
    if(tripExist){
        const amount = tripExist.amount +1;
        yield put(updateAmountReserve(id, amount));
    }else{
        const response = yield call(api.get, `/trips/${id}`);
        const data = {
            ...response.data,
            amount: 1,
        }; 
        yield put(addReserveSuccess(data));
    }

}  

export default all([
    // Evita Várias requisicões ao mesmo tempo se clicar mais de uma vez no botão
    takeLatest('ADD_RESERVE_REQUEST', addToReserve)
])