import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^[0-9]{9}$/;

export const Register = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [danceSchoolName, setDanceSchoolName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("not_given");
  const [gender, setGender] = useState("not_given");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    const v3 = PHONE_REGEX.test(phone);
    if (!v1 || !v2 || !v3) {
      setErrorMessage("Invalid Entry");
      return;
    }
    try {
      const user = {
        email: email,
        password: password,
        name: name,
        surname: surname,
        danceSchoolName: danceSchoolName,
        role: role,
        phone: phone,
        gender: gender,
        age: age,
      };
      setSuccess(true);
      const response = await Axios.post("//localhost:3001/register", user);
      console.log(JSON.stringify(response?.data));
      setEmail("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMessage("Username Taken");
      } else {
        setErrorMessage("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Rejestracja pomyślna!</h1>
          <Link to={"/login"}>Zaloguj się</Link>
        </section>
      ) : (
        <div className="auth-form">
          <p
            ref={errRef}
            className={errorMessage ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>

          <h2>Rejestracja</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              value={email}
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="twojemail@gmail.com"
              id="email"
              name="email"
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && email && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Wpisz prawidłowy adres email
            </p>
            <label htmlFor="password">
              Hasło
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
            />
            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Hasło musi zawierać
              <br />
              - 8-24 znaków
              <br />
              - małą i wielką literę
              <br />
              - cyfrę
              <br />
              - znak specjalny
              <br />
              Dozwolone znaki specjalne:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
            <label htmlFor="matchPassword">
              Potwierdź hasło
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              />
            </label>
            <input
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="matchPassword"
              name="matchPassword"
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              required
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Musi być takie samo jak pierwsze hasło!
            </p>
            <label htmlFor="name">Imię</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Imię"
              id="name"
              name="name"
              required
            />
            <label htmlFor="surname">Nazwisko</label>
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
              placeholder="500123456"
              id="phone"
              name="phone"
              required
            />
            <label htmlFor="age">Wiek</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              id="age"
              name="age"
            />

            <label htmlFor="gender">Płeć</label>
            <select
              name="gender"
              id="gender"
              className="classic"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled selected>
                Płeć
              </option>
              <option value="woman">Kobieta</option>
              <option value="man">Mężczyzna</option>
              <option value="other">Inna</option>
            </select>
            <label htmlFor="role">Kim jesteś?</label>
            <div onChange={(e) => setRole(e.target.value)}>
              <input type="radio" value="Client" name="role" /> Klientem
              <input type="radio" value="Employee" name="role" /> Pracownikiem
              <input type="radio" value="DanceSchoolOwner" name="role" />{" "}
              Właścicielem
            </div>

            <label
              htmlFor="danceSchoolName"
              className={
                role === "Employee" || role === "DanceSchoolOwner" ? "" : "hide"
              }
            >
              Nazwa szkoły tańca
            </label>
            <input
              className={
                role === "Employee" || role === "DanceSchoolOwner" ? "" : "hide"
              }
              value={danceSchoolName}
              onChange={(e) => setDanceSchoolName(e.target.value)}
              type="text"
              placeholder="nazwa szkoły tańca"
              id="danceSchoolName"
              name="danceSchoolName"
            />

            <button
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
              className="acceptance-button"
              type="submit"
            >
              Zarejestruj się
            </button>
          </form>
          <Link to={"/login"}>Masz konto? Zaloguj się</Link>
        </div>
      )}
    </>
  );
};

export default Register;
