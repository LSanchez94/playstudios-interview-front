"use client";
import Image from "next/image";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserIcon from "../assets/img/user-solid.svg";
import PasswordIcon from "../assets/img/lock-solid.svg";
import { resolveSoa } from "dns";
export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const login = () => {
    axios
      .post(
        `https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/login?username=${formData.username}&passwd=${formData.password}`
      )
      .then((res) => {
        if (res.status == 200) {
          if (
            res.data.data.username != undefined &&
            res.data.data.passwd != undefined
          ) {
            localStorage.setItem("u", res.data.data.username);
            localStorage.setItem("Bearer", res.data.data.passwd);
            router.push("/manage");
          } else {
            alert("No user found");
          }
        } else {
          alert("Error Try Again");
        }
      })
      .catch((err) => {
        alert("Error in Login");
      });
  };

  return (
    <main className={styles.main}>
      <form className={styles.loginForm}>
        <b>Playstudios Technical Interview</b>
        <h4 style={{ textAlign: "center", marginBottom: "15px" }}>
          Luis Antonio Sánchez Pérez
        </h4>
        <section>
          <div className={styles.input_container}>
            <label>
              <Image src={UserIcon} alt="" width={15} />
            </label>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.input_container}>
            <label>
              <Image src={PasswordIcon} alt="" width={15} />
            </label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button type="button" onClick={() => login()}>
            Login
          </button>
        </section>
      </form>
    </main>
  );
}
