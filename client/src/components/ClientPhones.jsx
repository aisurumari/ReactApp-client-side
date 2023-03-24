import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function ClientPhones() {
  const [listOfClients, setListOfClients] = useState([]);

  const getPhones = () => {
    Axios.get(`http://localhost:3001/getClient`).then((response) => {
      setListOfClients(response.data);
    });
  };

  return (
    <div>
      <div className="group-links">
        <Link to={"/Client/emails"} className="small-links">
          Pokaż listę emaili
        </Link>
      </div>

      <button onClick={getPhones} className="acceptance-button" type="submit">
        Pokaż numery telefonów
      </button>
      <div className="phoneListDisplay">
        <h1>Lista numerów telefonu klientów:</h1>
        {listOfClients.map((phoneList) => {
          return (
            <tr>
              <td>{phoneList.phone}</td>
            </tr>
          );
        })}
        ;
      </div>
    </div>
  );
}
