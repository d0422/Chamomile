import { useParams } from "react-router-dom";
import Back from "../back/Back";
import products from "./products.json";
import styles from "./css/Detail.module.css";
import Tag from "./Tag";
import LocationMap from "../location/LocationMap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../nav/Navbar";
import Review from "../result/Review";
function Detail() {
  const path = "./img/";
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const getproducts = async () => {
    const response = await fetch(`http://api-chamomile.kro.kr/products/${id}`);
    const json = await response.json();
    const response2 = await fetch(
      `http://api-chamomile.kro.kr/products/?name=`
    );
    const json2 = await response2.json();
    let arr = json2.data.concat();
    let newarr = [];
    for (let x = 0; x < arr.length; x++) {
      if (arr[x].name.length > 7) {
        arr[x].name = arr[x].name.substring(0, 6) + "...";
      }
      arr[x]["distance"] = (arr.length - x) * 10;
      arr[x]["reviewnum"] = x * 10;
      if (arr[x].shop === json.data.shop) {
        newarr.push(arr[x]);
      }
    }
    setdata(json.data);
    setkeyword(newarr);
  };
  const [keyword, setkeyword] = useState([]);
  useEffect(() => getproducts, [id]);
  const [location, setLocation] = useState([]);
  const copy = () => {
    navigator.clipboard.writeText(D[0].address_name);
  };
  const [color, setcolor] = useState("white");
  const [like, islike] = useState(false);
  const [D, setD] = useState([]);
  useEffect(() => {
    like ? setcolor("#F9E183 ") : setcolor("white");
  }, [like]);
  return (
    <div className={styles.background}>
      <Navbar></Navbar>
      <div className={styles.container}>
        <div className={styles.fix}>
          <div
            className={styles.likebutton}
            style={{ backgroundColor: `${color}` }}
            onClick={() => {
              like ? islike(false) : islike(true);
            }}
          >
            <img src={require(`./img/heart.png`)} alt="tal"></img>
          </div>
        </div>
        <header className={styles.header}>
          <Back></Back>
          <div className={styles.name}>{data && data.name}</div>
          <Link to="/search" className={styles.search}>
            <img src={require("./img/search.png")} alt="alt"></img>
          </Link>
        </header>

        <img className={styles.menuimg} src={data && data.img} alt="alt"></img>

        <div className={styles.mainbox}>
          <div className={styles.box}>
            <div className={styles.pricetext}>가격</div>
            <div className={styles.price}>{data && data.price}원</div>
          </div>

          <div className={styles.box}>
            <div className={styles.keyword}>키워드</div>
            <div className={styles.tags}>
              
              {data.tag_set
                ? data.tag_set.map((t, i) => <Tag key={i} tag={t.name}></Tag>)
                : ""}
            </div>
          </div>

          <div className={styles.box}>
            <div className={styles.liketext}>찜</div>
            <div className={styles.like}>
              <img
                src={require(`${path}colored-heart.png`)}
                className={styles.himg}
                alt="noimg"
              ></img>
              <div className={styles.likenum}>{data && data.likenum}</div>
            </div>
          </div>
        </div>
        {/* 메인박스 끝 */}

        <div className={styles.productinfo}>
          <div className={styles.introduce}>
            {data && data.description}
            <div className={styles.line1}></div>
          </div>
          <br></br>

          <div className={styles.section}>
            <div className={styles.marketname}>🏠 {data && data.shop}</div>
            <div className={styles.map}>
              <LocationMap
                setData={setD}
                setLocation={setLocation}
              ></LocationMap>
            </div>
            <div className={styles.phone}>📞 {D[0] && D[0].phone}</div>
            <div className={styles.address}>
              📍{D[0] && D[0].address_name}
              <button
                className={styles.copy}
                onClick={() => {
                  alert("복사완료!");
                  copy();
                }}
              >
                <img src={require(`./img/copy.png`)} alt="alt"></img>
              </button>
            </div>
          </div>
        </div>
        <Review tag={data.tag_set} shop={keyword}></Review>
      </div>
    </div>
  );
}
export default Detail;
