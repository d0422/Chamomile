import Back from "../back/Back";
import styles from "./css/Login.module.css";
import Input from "./Input";
function Login(){
    return(
        <div className={styles.container}>
            <div className={styles.head}>
            <Back></Back>
            <div className={styles.text}><p>맛있는 디저트와</p><p>더 가까워져요 :)</p></div>
            </div>
            <hr></hr>
            <div className={styles.startemail}>
            <div className={styles.text}>이메일로 시작하기</div>
            <Input data="nickname"></Input>
            <Input data="email"></Input>
            <Input data="password"></Input>
            <Input data="check"></Input>
            </div>
        </div>
    )

}

export default Login;
