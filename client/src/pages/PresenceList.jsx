import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function PresenceList() {
  const [listOfPresences, setListOfPresences] = useState([]);
  const [listOfGroups, setListOfGroups] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [group, setGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(20);

  let dates = new Date();
  let month = dates.getUTCMonth() + 1;
  let day = dates.getUTCDate();
  let year = dates.getUTCFullYear();
  let hour = dates.getUTCHours() + 1;
  let minute = dates.getUTCMinutes();

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentList = listOfPresences.slice(indexOfFirstReservation, indexOfLastReservation); 
   const totalPages = Math.ceil(listOfPresences.length / reservationsPerPage);
   const previousEnabled = currentPage > 1;
   const nextEnabled = currentPage < totalPages;
   const setPreviousPage = () => setCurrentPage(currentPage - 1);
   const setNextPage = () => setCurrentPage(currentPage + 1);


  useEffect(() => {
    Axios.get(`http://localhost:3001/getPresences`).then((response) => {
      setListOfPresences(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getGroups").then((response) => {
      setListOfGroups(
        response.data.map((group) => ({
          label: group.groupName + " " + group.groupLevel,
          value: group.groupName + " " + group.groupLevel,
        }))
      );
    });
  }, []);

  const createPresence = () => {
    Axios.post("http://localhost:3001/addPresence", {
      name,
      surname,
      group,
      day,
      month,
      year,
      hour,
      minute,
    });
  };

  return (
    <div>
      <div>
        <Link to={"/presenceList"} className="small-links">
          Lista obecności
        </Link>
        <Link to={"/presenceListHistory"} className="small-links">
          Historia obecności
        </Link>
      </div>
      <form className="presence-form" onSubmit={createPresence}>
        <label htmlFor="name">Imię klienta</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Imię"
          id="name"
          name="name"
          required
        />
        <label htmlFor="surname">Nazwisko klienta</label>
        <input
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          placeholder="Nazwisko"
          id="surname"
          name="surname"
          required
        />
        <label htmlFor="group">Numer grupy</label>
        <select
          className="classic"
          value={group}
          onChange={(event) => setGroup(event.target.value)}
        >
          <option>Numer grupy</option>
          {listOfGroups.map(({ label, value }) => (
            <option id={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <p></p>
        <div>
        <button className="acceptance-button" type="submit">
          Dodaj obecność
        </button>
        </div>
      </form>
      <div className="presenceListDisplay">
        <table>
          <thead>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Grupa</th>
            <th>Data</th>
          </thead>
        {listOfPresences.map((presenceList) => {
          return (
            <tr>
              <td>{presenceList.name}</td>
              <td>{presenceList.surname}</td>
              <td>grupa {presenceList.group}</td>
              <td>
                {presenceList.day}.{presenceList.month}.{presenceList.year}{" "}
                {presenceList.hour}:{presenceList.minute}
              </td>
            </tr>
          )
        })}
        <tfoot>
            <td colSpan={6}>
              <span>
              &nbsp; Wszystkie obecności: {listOfPresences.length}  &nbsp;  
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
