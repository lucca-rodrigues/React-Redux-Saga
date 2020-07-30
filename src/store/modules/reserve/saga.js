import { call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess} from './actions'
import api from '../../../services/api';
 
// O * e yield é como se fosse o Async Await mas dentro do Saga
// Esta funcão realiza uma requisição GET via Redux (tirando a necessidade de fazer a requisção toda hora do mesmo conteúdo);

function* addToReserve({ id }){
    const response = yield call(api.get, `/trips/${id}`); 

    yield put(addReserveSuccess(response.data));
}  

export default all([
    // Evita Várias requisicões ao mesmo tempo se clicar mais de uma vez no botão
    takeLatest('ADD_RESERVE_REQUEST', addToReserve)
])