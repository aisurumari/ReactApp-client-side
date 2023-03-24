import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function GroupList() {
  const [listOfGroups, setListOfGroups] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const role = localStorage.getItem("role") || null;
  const navigate = useNavigate();

  const deleteGroup = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  const showGroup = (groupName, groupLevel) => {
    localStorage.setItem("groupName", groupName);
    localStorage.setItem("groupLevel", groupLevel);
    navigate("/groupMembers");
  };

  const getGroupsDay = () => {
    Axios.get(
      `http://localhost:3001/getGroupsDay/${selectedDay}`
    ).then((response) => {
      setListOfGroups(response.data);
    });
  };

  const getGroupsLevel = () => {
    Axios.get(
      `http://localhost:3001/getGroupsLevel/${selectedLevel}`
    ).then((response) => {
      setListOfGroups(response.data);
    });
  };

  const editGroup = (id) => {
    const newLevel = prompt("Podaj obecny poziom grupy: ");
    Axios.put(`http://localhost:3001/edit`, {
      newLevel: newLevel,
      id: id,
    });
    setListOfGroups(
      listOfGroups.map((value) => {
        return value._id === id
          ? {
              _id: id,
              groupName: value.groupName,
              groupLevel: newLevel,
              weekday: value.weekday,
              hour: value.hour,
            }
          : value;
      })
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getGroups").then((response) => {
      setListOfGroups(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        <Link
          to={"/NewGroup"}
          className={role === "DanceSchoolOwner" ? "small-links" : "hide"}
        >
          Nowa grupa
        </Link>
        <Link
          to={"/listGroups"}
          className={role === "DanceSchoolOwner" ? "small-links" : "hide"}
        >
          Lista grup
        </Link>
      </div>

      <div className="sorting">
        <label htmlFor="groupListDay">Pokaż grupy z dnia:&nbsp;  </label>
        <select onChange={(e) => setSelectedDay(e.target.value)}>
          <option>Wszystkie</option>
          <option value="Poniedziałek">Poniedziałek</option>
          <option value="Wtorek">Wtorek</option>
          <option value="Środa">Środa</option>
          <option value="Czwartek">Czwartek</option>
          <option value="Piątek">Piątek</option>
          <option value="Sobota">Sobota</option>
          <option value="Niedziela">Niedziela</option>
        </select>
        <label htmlFor="groupListLevel">&nbsp;  Pokaż grupy na poziomie: &nbsp;  </label>
        <select onChange={(e) => setSelectedLevel(e.target.value)}>
          <option>Wszystkie</option>
          <option value="I stopień">I stopień</option>
          <option value="II stopień">II stopień</option>
          <option value="III stopień">III stopień</option>
          <option value="Środniozaawansowany">Średniozaawansowany</option>
          <option value="Zaawansowany brązowy">Zaawansowany brązowy</option>
          <option value="Zaawansowany srebrny">Zaawansowany srebrny</option>
          <option value="Zaawansowany złoty">Zaawansowany złoty</option>
          <option value="Miłośnicy">Miłośnicy</option>
        </select>
        <p></p>
        </div>

      <div className="flex-container">
        {listOfGroups.map((group) => {
          return (
            <div className="flex-child">
              <h3>
                Nazwa grupy: <br></br>
                {group.groupName}
              </h3>
              <h3>
                Poziom grupy: <br></br>
                {group.groupLevel}
              </h3>
              <h5>
                {group.weekday}
                <br></br>
                {group.hour}
              </h5>
              <button
                className={role === "DanceSchoolOwner" ? "nav-button" : "hide"}
                onClick={() => {
                  deleteGroup(group._id);
                }}
              >
                Usuń grupę
              </button>
              <button
                className={role === "DanceSchoolOwner" ? "nav-button" : "hide"}
                onClick={() => {
                  editGroup(group._id);
                }}
              >
                Edytuj grupę
              </button>
              <button
                className={
                  role === "DanceSchoolOwner" || role === "Employee"
                    ? "nav-button"
                    : "hide"
                }
                onClick={() => {
                  showGroup(group.groupName, group.groupLevel);
                }}
              >
                Pokaż uczestników
              </button>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
}
