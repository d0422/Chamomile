import React from "react";
import data from "./contents/Result.json";
import Resultdetail from "./Resultdetail";
import styles from "./css/Result.module.css";
const Result = ({ mbti }) => {
  let selectedMbti;
  let result = "";
  mbti[0] > 0 ? add("E") : add("I");
  mbti[1] > 0 ? add("S") : add("N");
  mbti[2] > 0 ? add("T") : add("F");
  mbti[3] > 0 ? add("P") : add("J");
  function add(string) {
    result = result + string;
  }
  for (let x = 0; x < 16; x++) {
    if (data[x].cat === result) {
      selectedMbti = data[x];
    }
  }
  return (
    <div>
      <div className={styles.mbti}>{selectedMbti.cat}</div>
      <div className={styles.introduce}>{selectedMbti.introduce}</div>
      <div className={styles.data}>
        {selectedMbti.data.map((d, i) => (
          <Resultdetail data={d} key={i}></Resultdetail>
        ))}
      </div>
    </div>
  );
};

export default Result;
