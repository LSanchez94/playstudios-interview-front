import Image from "next/image";
import styles from "./topMenu.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function TopMenu() {
  const router = useRouter();

  const [data, setData] = useState(false);
  useEffect(() => {
    let user = localStorage.getItem("u");
    let token = localStorage.getItem("Bearer");

    if (user == undefined || token == undefined) {
      setData(true);
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <nav className={styles.menu}>
      <div>
        <Link href="/manage">Manage</Link>
        <Link href="/rewards">Rewards</Link>
      </div>
      {data ? (
        <b onClick={() => router.push("/")}>Login</b>
      ) : (
        <b onClick={() => logout()}>Logout</b>
      )}
    </nav>
  );
}
