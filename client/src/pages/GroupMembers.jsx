import React, { useEffect, useState, Fragment } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes
} from "@fortawesome/free-solid-svg-icons";

export default function GroupMembers() {
  const [GroupList, setGroupList] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const role = localStorage.getItem("role") || null;
  let emailString = "";
  const group =
    localStorage.getItem("groupName") +
    " " +
    localStorage.getItem("groupLevel");
  const clickDelete = (id, name, surname) => {
  let dialog = window.confirm(`Czy na pewno chcesz usunąć rezerwację uczestnika ${name} ${surname}?`);
  if (dialog) {
    Axios.delete(`http://localhost:3001/deleteReservation/${id}`);
  }
  };

  useEffect(() => {
    let group =
      localStorage.getItem("groupName") +
      " " +
      localStorage.getItem("groupLevel");
    Axios.get(`http://localhost:3001/show/${group}`).then((response) => {
      setGroupList(response.data);
      setEmailList(response.data.map((val) => val.email));
    });
  }, [GroupList]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      emailList.forEach((val) => {
        emailString += val + ", ";
      });
      setLoading(true);
      await Axios.post(`http://localhost:3001/email/${group}`, {
        emailString,
        subject,
        message,
      });
      setLoading(false);
      setSubject("");
      setMessage("");
      alert("Email został wysłany");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Lista uczestników grupy {localStorage.getItem("groupName")}</h1>
      <table>
        <thead>
          <th>Lp.</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Telefon</th>
          <th>Email</th>
          <th>Opłata</th>
          <th> </th>
        </thead>
      <tbody>
        {GroupList.map((val, index) => {
          return (
            <Fragment>
              <tr>
                <td>{index+1}</td>
                <td>{val.name}</td>
                <td>{val.surname}</td>
                <td>{val.phone}</td>
                <td>{val.email}</td>
                <td>{val.payment}</td>
                <td><button type="button">
                  <FontAwesomeIcon icon={faTimes} className="red" onClick={() => {
                  clickDelete(val._id, val.name, val.surname);
                }}/></button>
                  </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
      </table>

      <form onSubmit={submitHandler}>
        <h1>Wyślij maila do uczestników</h1>

        <div>
          <label htmlFor="subject">Temat</label>
          <input
            id="subject"
            type="text"
            value={subject}
            size={100}
            onChange={(e) => setSubject(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="message">Wiadomość</label>
          <textarea
            id="message"
            value={message}
            rows={15}
            cols={100}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label></label>
          <button
            disabled={loading}
            type="submit"
            className="acceptance-button"
          >
            {loading ? "Trwa wysyłanie..." : "Wyślij email"}
          </button>
        </div>
      </form>
    </div>
  );
}
