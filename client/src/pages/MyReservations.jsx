import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";

export default function MyReservations() {
  const [listOfReservations, setListOfReservations] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    Axios.get(`http://localhost:3001/getMyReservations/${email}`).then(
      (response) => {
        setListOfReservations(response.data);
      }
    );
  }, []);

  const clickDelete = (id, group) => {
    let dialog = window.confirm(`Czy na pewno chcesz usunąć rezerwację na grupę ${group}?`);
    if (dialog) {
      Axios.delete(`http://localhost:3001/deleteReservation/${id}`);
    }
    };

  return (
    <div>
      <p></p>
      <h1>Moje rezerwacje</h1>
      <div className="reservationsDisplay">
        <table>
          <thead>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Telefon</th>
          <th>Forma płatności</th>
          <th>Grupa</th>
          <th></th>
          </thead>
        {listOfReservations.map((reservation) => {
          return (
            <Fragment>
              <tr>
                <td>{reservation.name}</td>
                <td>{reservation.surname}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.payment}</td>
                <td>grupa {reservation.group}</td>
                <td><button type="button">
                  <FontAwesomeIcon icon={faTimes} className="red" onClick={() => {
                  clickDelete(reservation._id, reservation.group);
                }}/></button>
                  </td>
              </tr>
            </Fragment>
          )
        })}
        </table>
        
        
      </div>
    </div>
  );
}
