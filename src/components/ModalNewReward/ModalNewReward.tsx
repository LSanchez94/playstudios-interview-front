import styles from "./modalNewReward.module.css";
import Modal from "../Modal/Modal";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ModalNewReward(props: any) {
  interface RewardI {
    name: string;
    desc: string;
    price: number;
    category: string;
    image: string;
  }
  const { modal, closeModal, reload, mode, currentReward } = props;

  const [reward, setReward] = useState<RewardI>({
    name: "",
    desc: "",
    price: 0,
    category: "",
    image: "",
  });

  const [modalActive, setModalActive] = useState(false);
  const [message, setMessage] = useState(0);

  useEffect(() => {
    setModalActive(modal);
    mode ? setMessage(4) : setMessage(0);
    mode
      ? setReward(currentReward)
      : setReward({
          name: "",
          desc: "",
          price: 0,
          category: "",
          image: "",
        });
  }, [modal]);

  const addReward = () => {
    setMessage(1);
    axios
      .post(
        `https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/rewards?name=${reward.name}&desc=${reward.desc}&price=${reward.price}&category=${reward.category}&image=${reward.image}`
      )
      .then((res) => {
        if (res.status == 200) {
          setMessage(2);
          setTimeout(() => {
            closeModal(false);
            reload();
            setReward({
              name: "",
              desc: "",
              price: 0,
              category: "",
              image: "",
            });
            setMessage(0);
          }, 500);
        }
      })
      .catch((err) => {
        setMessage(3);
      });
  };

  const updateReward = () => {
    setMessage(7);
    axios
      .post(
        `https://b9gkqkdh2m.execute-api.us-east-1.amazonaws.com/Prod/rewardupdate?name=${reward.name}&desc=${reward.desc}&price=${reward.price}&category=${reward.category}&image=${reward.image}&sname=${currentReward.name}&sdesc=${currentReward.desc}&sprice=${currentReward.price}&scategory=${currentReward.category}&simage=${currentReward.image}`
      )
      .then((res) => {
        if (res.status == 200) {
          setMessage(5);
          setTimeout(() => {
            closeModal(false);
            reload();
            setReward({
              name: "",
              desc: "",
              price: 0,
              category: "",
              image: "",
            });
            setMessage(0);
          }, 500);
        }
      })
      .catch((err) => {
        setMessage(6);
      });
  };

  return (
    <Modal activeModal={modalActive}>
      <div className={styles.container}>
        {message != 4 && message != 5 && message != 6 && message != 7 ? (
          <h3>New Reward</h3>
        ) : (
          <h3>Update Reward</h3>
        )}

        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={reward.name}
              onChange={(e) =>
                setReward((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={reward.desc}
              onChange={(e) =>
                setReward((prevState) => ({
                  ...prevState,
                  desc: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={reward.price}
              onChange={(e) =>
                setReward((prevState) => ({
                  ...prevState,
                  price: parseFloat(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={reward.category}
              onChange={(e) =>
                setReward((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              value={reward.image}
              onChange={(e) =>
                setReward((prevState) => ({
                  ...prevState,
                  image: e.target.value,
                }))
              }
            />
          </div>
        </form>
        {message == 0 && (
          <div className={styles.buttons}>
            <button type="button" onClick={() => addReward()}>
              Add Reward
            </button>
            <button
              type="button"
              onClick={() => {
                closeModal(false), setModalActive(false);
              }}
            >
              Close
            </button>
          </div>
        )}
        {message == 1 && <p>Creating New Reward</p>}

        {message == 2 && <p>New Reward Created</p>}

        {message == 3 && (
          <p style={{ color: "red" }}>Error Creating New Reward</p>
        )}
        {message == 5 && <p>Reward Updated</p>}
        {message == 6 && <p style={{ color: "red" }}>Error Updating Reward</p>}
        {message == 7 && <p>Updating Reward</p>}
        {message == 4 && (
          <div className={styles.buttons}>
            <button type="button" onClick={() => updateReward()}>
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                closeModal(false), setModalActive(false);
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
