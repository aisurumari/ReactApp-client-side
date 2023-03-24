import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function NewReservation() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [group, setGroup] = useState("");
  const [listOfGroups, setListOfGroups] = useState([]);

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

  const createReservation = () => {
    Axios.post("http://localhost:3001/createReservation", {
      email,
      name,
      surname,
      phone,
      group,
      payment,
    });
    Axios.post(`http://localhost:3001/createClient/${email}`, {
      email,
      name,
      surname,
      phone,
      payment,
    });
  };

  return (
    <div>
      {localStorage.getItem("role") === "Client" ? (
        <></>
      ) : (
        <div>
          <Link to={"/NewReservation"} className="small-links">
            Nowa rezerwacja
          </Link>
          <Link to={"/Reservations"} className="small-links">
            Lista rezerwacji
          </Link>
        </div>
      )}

      <div className="reservation-form">
        <h2>Rezerwacja</h2>
        <form className="reservation-form" onSubmit={createReservation}>
          <label htmlFor="email">Email</label>
          <input
            defaultValue={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@gmail.com"
            id="email"
            name="email"
          />

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
          <label htmlFor="phone">Numer telefonu</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="500000000"
            id="phone"
            name="phone"
            required
          />
          <label htmlFor="payment">Rodzaj opłaty</label>
          <select
            className="classic"
            name="payment"
            id="payment"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="" disabled selected>
              Karta/gotówka
            </option>
            <option value="multisport">Multisport PLUS</option>
            <option value="medicover">Medicover SPORT</option>
            <option value="fitprofit">Fitprofit</option>
            <option value="money">Gotówka</option>
          </select>
          <label htmlFor="group">Numer grupy</label>
          <select
            className="classic"
            value={group}
            onChange={(event) => setGroup(event.target.value)}
          >
            <option value="" disabled selected>
              Numer grupy
            </option>
            {listOfGroups.map(({ label, value }) => (
              <option id={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <p></p>
          <button className="acceptance-button" type="submit">
            Potwierdzam rezerwację
          </button>
        </form>
      </div>
    </div>
  );
}
