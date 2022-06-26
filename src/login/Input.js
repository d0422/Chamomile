import styles from "./css/Input.module.css"
function Input({data}){
    let place="";
    if (data==="nickname"){
        place="닉네임";
    }
    else if(data==="email"){
        place="이메일";
    }
    else if(data==="password"){
        place="비밀번호(영문+숫자+특수문자 8~15자)";
    }
    else if(data==="check"){
        place="비밀번호 확인";
    }
    return(
        <div>
            <input
            placeholder={place}
            className={styles.inputdata}></input>
        </div>
    );
}
export default Input;