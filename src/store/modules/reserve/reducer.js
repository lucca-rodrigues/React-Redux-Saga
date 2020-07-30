import produce from 'immer';
export default function reserve(state = [], action){
  console.log(state);

  // FAZ A CHAMADA PARA A AÇÃO DO BOTÃO
  switch (action.type) {
    case 'ADD_RESERVE_SUCCESS':
      return produce(state, draft => {
        draft.push(action.trip);  
      });

    case 'REMOVE_RESERVE':
      return produce(state, draft =>{
         const tripIndex = draft.findIndex(trip => trip.id === action.id);

         if(tripIndex >= 0){
           draft.splice(tripIndex, 1);
         }
      });
    case 'UPDATE_RESERVE':
      if(action.amount <= 0){
        return state;
      }
      return produce (state, draft => {
        const tripIndex = draft.findIndex(trip => trip.id === action.id);

        if(tripIndex >= 0){
          draft[tripIndex].amount = Number(action.amount);
        }
      });
    default:
      return state;
  }
}