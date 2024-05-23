import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";



const ForgotPw = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // 비밀번호 찾기 로직 처리
    try {
      const response = await fetch("/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, managerID: id }),
      });

      if (response.ok) {
        window.alert("임시 비밀번호가 이메일로 전송되었습니다.");
        navigate("/user/login");
      } else {
        const errorResult = await response.json();
        window.alert(errorResult.message);
      }
    } catch (error) {
      console.error("Error during resetting password:", error);
      window.alert("비밀번호 찾기 중 오류가 발생했습니다.");
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
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
              placeholder="UserId"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            비밀번호 찾기
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

export default ForgotPw;
  