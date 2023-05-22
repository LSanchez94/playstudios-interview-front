import styles from "./modal.module.css";
import { useState } from "react";

export default function BaseModal({ children, activeModal }: any) {
  return (
    <div
      className={`${activeModal ? "" : styles.closeModal} ${styles.modalBG}`}
    >
      {children}
    </div>
  );
}
