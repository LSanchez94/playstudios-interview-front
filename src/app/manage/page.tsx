"use client";
import styles from "./manage.module.css";
import Image from "next/image";
import axios from "axios";
import TopMenu from "@/components/TopMenu/TopMenu";
import ModalNewReward from "@/components/ModalNewReward/ModalNewReward";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import EditIcon from "../../assets/img/pen-solid.svg";
import DeleteIcon from "../../assets/img/trash-solid.svg";
import CaretIcon from "../../assets/img/caret-solid.svg";
export default function ManagePage() {
  interface RewardI {
    name: string;
    desc: string;
    price: number;
    category: string;
    image: string;
  }
  const router = useRouter();

  const [modalNewReward, setModalNewReward] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<boolean>(false);
  const [currentReward, setCurrentReward] = useState<RewardI>();
  const [nameSort, setNameSort] = useState<boolean>(false);
  const [categorySort, setCategorySort] = useState<boolean>(false);
  const [priceSort, setPriceSort] = useState<boolean>(false);
  const [rewards, setRewards] = useState<[RewardI] | []>([]);

  useEffect(() => {
    checkToken();
    fetchData();
  }, []);

  const checkToken = () => {
    let user = localStorage.getItem("u");
    let token = localStorage.getItem("Bearer");

    axios
      .post(
        `https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/token?username=${user}&passwd=${token}`
      )
      .then((res) => {})
      .catch((err) => {
        console.log("err");
        router.push("/rewards");
      });
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/rewards"
    );

    setRewards(data.data);
  };

  const nameOrder = () => {
    let names: [RewardI] | [] = rewards;
    let result;
    if (nameSort) {
      result = names.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result = names.sort((a, b) => b.name.localeCompare(a.name));
    }
    setNameSort(!nameSort);

    setRewards([...result]);
  };

  const categoryOrder = () => {
    let category: [RewardI] | [] = rewards;
    let result;
    if (categorySort) {
      result = category.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      result = category.sort((a, b) => b.category.localeCompare(a.category));
    }
    setCategorySort(!categorySort);

    setRewards([...result]);
  };

  const priceOrder = () => {
    let prices: [RewardI] | [] = rewards;
    let result;
    if (priceSort) {
      result = prices.sort((a, b) => a.price - b.price);
    } else {
      result = prices.sort((a, b) => b.price - a.price);
    }
    setPriceSort(!priceSort);

    setRewards([...result]);
  };

  const deleteReward = (rewardData: RewardI) => {
    axios
      .post(
        `https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/rewarddelete?name=${rewardData?.name}&desc=${rewardData?.desc}&price=${rewardData?.price}&category=${rewardData?.category}&image=${rewardData?.image}`
      )
      .then((res) => {
        if (res.status == 200) {
          alert("Reward Deleted");
          fetchData();
        }
      })
      .catch((err) => {
        alert("Error Deleting Reward");
      });
  };

  return (
    <main className={styles.main}>
      <ModalNewReward
        modal={modalNewReward}
        closeModal={setModalNewReward}
        reload={fetchData}
        mode={modalMode}
        currentReward={currentReward}
      />
      <TopMenu />
      <h1>Manage Page</h1>

      <button
        type="button"
        className={styles.addButton}
        onClick={() => {
          setModalNewReward(true), setModalMode(false);
        }}
      >
        New Reward
      </button>

      <table className={styles.contentTable}>
        <thead>
          <tr>
            <th>
              <div onClick={() => nameOrder()}>
                Name{" "}
                <Image
                  src={CaretIcon}
                  alt=""
                  width={8}
                  className={nameSort ? styles.rotate : undefined}
                />
              </div>
            </th>
            <th>Description</th>
            <th>
              <div onClick={() => priceOrder()}>
                Price{" "}
                <Image
                  src={CaretIcon}
                  alt=""
                  width={8}
                  className={priceSort ? styles.rotate : undefined}
                />
              </div>
            </th>
            <th>
              <div onClick={() => categoryOrder()}>
                Category{" "}
                <Image
                  src={CaretIcon}
                  alt=""
                  width={8}
                  className={categorySort ? styles.rotate : undefined}
                />
              </div>
            </th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward, index) => (
            <tr key={index}>
              <td>{reward.name}</td>
              <td>{reward.desc}</td>
              <td>${reward.price}</td>
              <td>{reward.category}</td>
              <td>{reward.image}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    setModalNewReward(true),
                      setModalMode(true),
                      setCurrentReward(reward);
                  }}
                >
                  <Image src={EditIcon} alt="" width={10} />
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    deleteReward(reward);
                  }}
                >
                  <Image src={DeleteIcon} alt="" width={10} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
