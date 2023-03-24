import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function Reservations() {
  const [listOfReservations, setListOfReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(20);

  useEffect(() => {
    Axios.get("http://localhost:3001/getReservations").then((response) => {
      setListOfReservations(response.data);
    });
  }, []);

  const indexOfLastReservation = currentPage * reservationsPerPage;
   const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
   const currentList = listOfReservations.slice(indexOfFirstReservation, indexOfLastReservation); 
    const totalPages = Math.ceil(listOfReservations.length / reservationsPerPage);
    const previousEnabled = currentPage > 1;
    const nextEnabled = currentPage < totalPages;
    const setPreviousPage = () => setCurrentPage(currentPage - 1);
    const setNextPage = () => setCurrentPage(currentPage + 1);

  return (
    <div>
      <div>
        <Link to={"/NewReservation"} className="small-links">
          Nowa rezerwacja
        </Link>
        <Link to={"/Reservations"} className="small-links">
          Lista rezerwacji
        </Link>
      </div>
      <p></p>

      <div className="reservationsDisplay">
        <table>
          <thead>
            <th>Lp.</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Telefon</th>
            <th>Płatność</th>
            <th>Grupa</th>
          </thead>
          
        {currentList.map((reservation, index) => {
          return (
            <Fragment>
              <tr>
                <td>{index+indexOfFirstReservation+1}</td>
                <td>{reservation.name}</td>
                <td>{reservation.surname}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.payment}</td>
                <td>grupa {reservation.group}</td>
              </tr>
            </Fragment>
          );
        })}
        <tfoot>
            <td colSpan={6}>
              <span>
              &nbsp; Wszystkie rezerwacje: {listOfReservations.length}  &nbsp;  
              </span>
            <button onClick={setPreviousPage} className={previousEnabled ? "" : "hide"}>
                Poprzednia
            </button>
          <span>
          &nbsp;  Strona: {currentPage} z {totalPages} &nbsp; 
            </span>
            <button onClick={setNextPage} className={nextEnabled ? "" : "hide"}>
                Następna
            </button>
            </td>
        </tfoot>
        </table>
      </div>
    </div>
  );
}
