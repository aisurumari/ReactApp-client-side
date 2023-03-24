import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function Reports() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [averageAge, setAverageAge] = useState(false);
  const [manCount, setManCount] = useState(0);
  const [womanCount, setWomanCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [raportGenerate, setRaportGenerate] = useState(false);

  const createReport = () => {
    Axios.get("http://localhost:3001/getUser")
      .then((response) => {
        setListOfUsers(response.data);
      })
      .then(() => {
        let finalAge = 0;
        let sumAge = 0;
        listOfUsers.forEach((user) => {
          sumAge = sumAge + user.age;
        });
        finalAge = sumAge / listOfUsers.length;
        let genderMan = 0;
        let genderWoman = 0;
        let genderOther = 0;
        listOfUsers.forEach((user) => {
          if (user.gender === "man") {
            genderMan = genderMan + 1;
          } else if (user.gender === "woman") {
            genderWoman = genderWoman + 1;
          } else {
            genderOther = genderOther + 1;
          }
        });
        setAverageAge(finalAge);
        setManCount(genderMan);
        setWomanCount(genderWoman);
        setOtherCount(genderOther);
        setRaportGenerate(true);
      });

  };

  return (
    <div>
      {raportGenerate && (
        <>
          <p>Średnia wieku: {averageAge}</p>
          <p>Liczba mężczyzn: {manCount}</p>
          <p>Liczba kobiet: {womanCount}</p>
          <p>Liczba osób niebinarnych: {otherCount}</p>
        </>
      )}
      <button
        onClick={createReport}
        className="acceptance-button"
        type="submit"
      >
        Pokaż statystyki
      </button>

      <div>
        <Link to={"/Client/phones"} className="small-links">
          Pokaż numery telefonów
        </Link>
        <Link to={"/Client/emails"} className="small-links">
          Pokaż emaile
        </Link>
      </div>
    </div>
  );
}
