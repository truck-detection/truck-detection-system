import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../component/Modal";

const dummyData = [
  {
    number:"서울 가 1234",
    imgUrl : "https://img0.yna.co.kr/etc/inner/KR/2021/07/27/AKR20210727005551075_01_i_P4.jpg",
    isOverload  : true
  },
  {
    number:"서울 가 5678",
    imgUrl : "https://img0.yna.co.kr/etc/inner/KR/2021/07/27/AKR20210727005551075_01_i_P4.jpg",
    isOverload  : false
  },
  {
    number:"서울 가 7891",
    imgUrl : "https://images.chosun.com/resizer/pt-G6H_euWA7EUwLi9Sb8_9UJBs=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/PY3GN55EJVED7DUPZICQ3PC57U.jpg",
    isOverload  : true
  },
  {
    number:"서울 가 2356",
    imgUrl : "https://img0.yna.co.kr/etc/inner/KR/2021/07/27/AKR20210727005551075_01_i_P4.jpg",
    isOverload  : false
  },
  {
    number:"서울 가 8953",
    imgUrl : "https://images.chosun.com/resizer/pt-G6H_euWA7EUwLi9Sb8_9UJBs=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/PY3GN55EJVED7DUPZICQ3PC57U.jpg",
    isOverload  : false
  },
]

const List = () => {

  const navigate = useNavigate();

  const [list,setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setList(dummyData);
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1c99db",
        backgroundImage:
          "linear-gradient(43deg, #1c99db 0%, #d6eaff 70%, #ffffff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "720px",
          backgroundColor: "#ffffff88",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: "24px",
          boxShadow: "rgba(0, 0, 0, 0.133) 0px 0px 10px 6px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "24px"
          }}
        >
          <img src="./logo.png" alt="logo" />
          <h1 style={{ margin: "0px", color: "#0A6294" }}>Bad Truck Detection</h1>
        </div>
        <div style={{overflow:'auto',width:'100%'}}>
        {list.map((item)=><div 
        style={{position:'relative', display:'flex',width:'100%',padding:'0px 10px',boxSizing:'border-box',alignItems:'center',gap:'10px',marginBottom:'10px'}} 
        onClick={() => handleClick(item)}>
          <img style={{ width: "100px", height: "100px",}}
        src={item.imgUrl} alt="" />{item.number} 
        <span 
        style={{
          width: "10px", height: "10px",borderRadius: "50%", backgroundColor:item.isOverload ?"red" : "green",position:'absolute',right:'16px'}}>
        </span>
          </div>)}
        </div>
      </div>
      <Modal show={selectedItem !== null} item={selectedItem} onClose={handleClose} />
    </Container>
  );
};

const Container = styled.div`
& .Btn:hover {
  background-color: #1c99db88 !important;
}
`;

export default List;
