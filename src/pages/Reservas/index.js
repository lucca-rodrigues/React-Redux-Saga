import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeReserve, updateAmountReserveRequest } from '../../store/modules/reserve/actions';
import { MdDelete, MdRemoveCircle, MdAddCircle } from 'react-icons/md';
import './style.css';


export default function Reservas() {
  const dispatch = useDispatch();
  const reserves = useSelector(state => state.reserve);

  function handleRemove(id){
    dispatch(removeReserve(id));
  }

  // Diminui a quantidade da reserva
  function decrementReserve(trip){
    dispatch(updateAmountReserveRequest(trip.id, trip.amount - 1));
  }
  // Aumenta a quantidade da reserva
  function incrementReserve(trip){
    dispatch(updateAmountReserveRequest(trip.id, trip.amount + 1));
  }
  return (
    <div>
      {reserves && reserves >=1 ? (<h1 className="title">Voce solicitou {reserves.length} reservas</h1>): ('')}
      {reserves.map(reserve => (
          <div className="reservas" key={reserve.id}>
            <img
              src={reserve.image}
              alt={reserve.title}
            />
            <strong>{reserve.title}</strong>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <buton type="button" onClick={() => decrementReserve(reserve)}>
                <MdRemoveCircle size={20} color="#191919"/>
              </buton>
              <input type="text" readOnly value={reserve.amount} style={{width: 30}}/>
              <buton type="button" onClick={() => incrementReserve(reserve)}>
                <MdAddCircle size={20} color="#191919"/>
              </buton>
            </div>

            <button
              type="button"
              onClick={() => handleRemove(reserve.id)}
            >
              <MdDelete size={20} color="#191919" />
            </button>
          </div>
        ))}
      <footer>
        <button type="button">Solicitar Reservas</button>
      </footer>

    </div>
  );
}