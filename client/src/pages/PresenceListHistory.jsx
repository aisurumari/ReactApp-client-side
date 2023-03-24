import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function PresenceList() {
  const [listOfPresences, setListOfPresences] = useState([]);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSurname, setSelectedSurname] = useState("");

  const getPresencesDate = () => {
    Axios.get(
      `http://localhost:3001/getPresences/${selectedDay}/${selectedMonth}/${selectedYear}`
    ).then((response) => {
      setListOfPresences(response.data);
    });
  };

  const getPresencesSurname = () => {
    Axios.get(
      `http://localhost:3001/getPresencesSurname/${selectedSurname}`
    ).then((response) => {
      setListOfPresences(response.data);
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
      <div>
        <label htmlFor="presenceListDate">Pokaż obecności z dnia:</label>
        <input
          type="number"
          placeholder="31"
          value={selectedDay}
          id="selectedDay"
          name="selectedDay"
          min="1"
          max="31"
          onChange={(event) => {
            setSelectedDay(event.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="12"
          value={selectedMonth}
          id="selectedMonth"
          name="selectedMonth"
          min="1"
          max="12"
          onChange={(event) => {
            setSelectedMonth(event.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="2023"
          value={selectedYear}
          id="selectedYear"
          name="selectedYear"
          min="2023"
          max="2023"
          onChange={(event) => {
            setSelectedYear(event.target.value);
          }}
        ></input>
      </div>
      <button onClick={getPresencesDate} className="small-links" type="submit">
        Pokaż obecności z tego dnia
      </button>
      <div>
        <label htmlFor="surname">Nazwisko klienta</label>
        <input
          type="text"
          id="surname"
          name="surname"
          onChange={(event) => {
            setSelectedSurname(event.target.value);
          }}
        ></input>
      </div>
      <button
        onClick={getPresencesSurname}
        className="small-links"
        type="submit"
      >
        Pokaż obecności tego klienta
      </button>
      <div className="presenceListDisplay">
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
          );
        })}
        ;
      </div>
    </div>
  );
}
