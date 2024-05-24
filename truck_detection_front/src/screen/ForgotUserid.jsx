import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



const ForgotUserid = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // 아이디 찾기 로직 처리
    try {
      const response = await fetch("/user/find-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        window.alert(result.message);
        navigate("/user/login");
      } else {
        const errorResult = await response.json();
        window.alert(errorResult.message);
      }
    } catch (error) {
      console.error("Error during finding ID:", error);
      window.alert("아이디 찾기 중 오류가 발생했습니다.");
    }
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
          height: "540px",
          backgroundColor: "#ffffff88",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          }}
        >
          <img src="../logo.png" alt="logo" />
          <h1 style={{ margin: "0px", color: "#0A6294" }}>Bad Truck Detection</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "44px",
              backgroundColor: "#00000011",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "24px",
            }}
          >
            <input
              type="text"
              style={{
                width: "calc(100% - 40px)",
                height: "36px",
                padding: "0px",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "24px",
          }}
        >
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
            className="loginBtn"
            onClick={handleSubmit}
          >
            아이디찾기
          </button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
& .loginBtn:hover {
  background-color: #1c99db88 !important;
}
`;

export default ForgotUserid;
  