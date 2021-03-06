import { select, call, put, all, takeLatest } from 'redux-saga/effects';
import { addReserveSuccess, updateAmountReserveSuccess} from './actions'
import api from '../../../services/api';
import history from '../../../services/history';

 
// O * e yield é como se fosse o Async Await mas dentro do Saga
// Esta funcão realiza uma requisição GET via Redux (tirando a necessidade de fazer a requisção toda hora do mesmo conteúdo);

function* addToReserve({ id }){
    const tripExists = yield select(
      state => state.reserve.find(trip => trip.id === id)
    );
  
    const myStock = yield call(api.get, `/stock/${id}`);
  
    const stockValue = myStock.data.amount;
    
    const atualStock = tripExists ? tripExists.amount : 0; 
  
    const amount = atualStock + 1;
  
    if(amount > stockValue){
      alert('Quantidade maxima atingida.');
      return;
    }
  
    if(tripExists){ 
  
      yield put(updateAmountReserveSuccess(id, amount));
  
    }else{
      const response = yield call(api.get, `trips/${id}` );
  
      const data = {
        ...response.data,
        amount: 1,
      };
  
      yield put(addReserveSuccess(data));
      history.push('/reservas');
    }
  
  } 

  function* updateAmount({ id, amount}){
      if(amount <= 0) return;

      const myStock = yield call(api.get, `/stock/${id}`);

      const stockValue = myStock.data.amount;

      if(amount > stockValue){
          alert('Quantidade máxima atingida!');
          return;
      }
      yield put(updateAmountReserveSuccess(id, amount));
  }

export default all([
    // Evita Várias requisicões ao mesmo tempo se clicar mais de uma vez no botão
    takeLatest('ADD_RESERVE_REQUEST', addToReserve),
    takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
]);