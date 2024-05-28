import { useEffect, useState } from "react";

import styled from "styled-components";
import Modal from "../component/Modal";

const List = () => {
  

  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/images");
      const data = await response.json();
      setList(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  // 이미지 학습 버튼을 눌렀을 때 수행할 작업
  const handleFileButtonClick = () => {
    fetch('/run-detection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // 서버에 전달할 데이터가 있다면 여기에 추가
    })
    .then(response => response.json())
    .then(data => {
      console.log('서버 응답:', data);
    })
    .catch(error => {
      console.error('오류 발생:', error);
    });
  };

  return (
    <Container>
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
        <div style={{ overflow: 'auto', width: '100%' }}>
          {list.map((item, index) => (
            <div
              key={item.filename}  // key 속성 추가
              style={{ position: 'relative', display: 'flex', width: '100%', padding: '0px 10px', boxSizing: 'border-box', alignItems: 'center', gap: '10px', marginBottom: '10px' }}
              onClick={() => handleClick(item)}
            >
              <img style={{ width: "100px", height: "100px" }} src={`/uploads/${item.filename}`} alt="" /> {item.filename}
              <span
                style={{
                  width: "10px", height: "10px", borderRadius: "50%", backgroundColor: item.isOverload ? "red" : "green", position: 'absolute', right: '16px'
                }}>
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        style={{
          width: "80%",
          height: "44px",
          borderRadius: "24px",
          border: "none",
          outline: "none",
          backgroundColor: "#1C99DB",
          color: "#ffffff",
          letterSpacing: "4px",
          cursor: "pointer",
        }}
        className="Btn"
        onClick={handleFileButtonClick}
      >
        이미지 학습
      </button>
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
