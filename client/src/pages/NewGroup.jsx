import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NewGroup() {
  const [groupName, setGroupName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [hour, setHour] = useState("");
  const [weekday, setWeekday] = useState("");
  const [groupLevel, setGroupLevel] = useState("");

  const createGroup = () => {
    Axios.post("http://localhost:3001/createGroup", {
      groupName,
      groupLevel,
      capacity,
      weekday,
      hour,
    });
    alert("Grupa " + this.groupName + " została poprawnie dodana");
  };

  return (
    <div>
      <div>
        <Link to={"/NewGroup"} className="small-links">
          Nowa grupa
        </Link>
        <Link to={"/listGroups"} className="small-links">
          Lista grup
        </Link>
      </div>
      <div className="new-group-form">
        <h2>Nowa grupa</h2>
        <label htmlFor="groupName">Nazwa grupy</label>
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          type="text"
          placeholder="455"
          id="groupName"
          name="groupName"
          required
        />
        <label htmlFor="groupLevel">Poziom grupy</label>
        <input
          value={groupLevel}
          onChange={(e) => setGroupLevel(e.target.value)}
          type="text"
          placeholder="I stopień"
          id="groupLevel"
          name="groupLevel"
          required
        />
        <label htmlFor="capacity">Maksymalna liczba kursantów</label>
        <input
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          type="number"
          placeholder="Liczba osób"
          id="capacity"
          name="capacity"
        />
        <label htmlFor="weekday">Dzień tygodnia</label>
        <select
          className="classic"
          name="weekday"
          id="weekday"
          value={weekday}
          onChange={(e) => setWeekday(e.target.value)}
        >
          <option value="" disabled selected>
            Wybierz dzień tygodnia
          </option>
          <option value="poniedziałek">poniedziałek</option>
          <option value="wtorek">wtorek</option>
          <option value="środa">środa</option>
          <option value="czwartek">czwartek</option>
          <option value="piątek">piątek</option>
          <option value="sobota">sobota</option>
          <option value="niedziela">niedziela</option>
        </select>
        <label htmlFor="hour">Godzina</label>
        <input
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          type="text"
          placeholder="17:00"
          id="hour"
          name="hour"
          required
        />
        <p></p>
        <button
          onClick={createGroup}
          type="submit"
          className="acceptance-button"
        >
          Potwierdzam stworzenie nowej grupy
        </button>
      </div>
    </div>
  );
}
