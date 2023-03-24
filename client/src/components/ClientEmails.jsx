import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function ClientPhones() {
  const [listOfClients, setListOfClients] = useState([]);

  const getEmails = () => {
    Axios.get(`http://localhost:3001/getClient`).then((response) => {
      setListOfClients(response.data);
    });
  };

  return (
    <div>
      <div className="group-links">
        <Link to={"/Client/phones"} className="small-links">
          Pokaż listę telefonów
        </Link>
      </div>
      <button onClick={getEmails} className="acceptance-button" type="submit">
        Pokaż emaile
      </button>
      <div className="emailListDisplay">
        <h1>Lista emaili klientów:</h1>
        {listOfClients.map((emailList) => {
          return (
            <tr>
              <td>{emailList.email}</td>
            </tr>
          );
        })}
        ;
      </div>
    </div>
  );
}
