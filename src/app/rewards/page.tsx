"use client";
import styles from "./rewards.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import TopMenu from "@/components/TopMenu/TopMenu";

export default function RewardsPage() {
  interface RewardI {
    name: string;
    desc: string;
    price: number;
    category: string;
    image: string;
  }

  const [rewards, setRewards] = useState<[RewardI] | []>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/rewards"
    );

    setRewards(data.data);
  };

  return (
    <main className={styles.main}>
      <TopMenu />
      <h1 style={{ marginBottom: "15px" }}>Rewards Page</h1>

      <div className={styles.container}>
        {rewards.map((reward, index) => (
          <div key={index}>
            <figure>
              <Image src={reward.image} alt="" width={100} height={100} />
            </figure>
            <b>
              {reward.name} - ${reward.price}
            </b>
            <p style={{ marginBottom: "10px" }}>{reward.category}</p>
            <p>{reward.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
