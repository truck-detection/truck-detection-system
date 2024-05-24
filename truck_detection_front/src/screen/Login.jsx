import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerID: id, password: pw }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        window.alert(errorResult.message);
      } else {
        const result = await response.json();
        window.alert(result.message);
        navigate("/main");
      }
    } catch (error) {
      console.error("Error during login:", error);
      window.alert("로그인 중 오류가 발생했습니다.");
    }
  };
  const signupHandler = () => {
    navigate("/user/sign-up");
  };
  const forgotidHandler = () => {
    navigate("/user/find-id");
  };
  const forgotpwHandler = () => {
    navigate("/user/reset-password");
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
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          loginHandler();
        }
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
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
              type="Password"
              style={{
                width: "calc(100% - 40px)",
                height: "36px",
                padding: "0px",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
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
            marginTop: "48px",
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
            onClick={loginHandler}
            >
            LOGIN
          </button>
          <div style={{ display: "flex", gap: "16px", fontSize: "14px" }}>
            <span 
              style= {{
                cursor: "pointer"
              }}
              onClick={signupHandler}
            >
                회원가입
            </span>
            <span
              style= {{
                cursor: "pointer"
              }}
              onClick={forgotidHandler}
            >
              아이디 찾기
            </span>
            <span
              style= {{
                cursor: "pointer"
              }}
              onClick={forgotpwHandler}
            >
              비밀번호 찾기
            </span>
          </div>
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

export default Login;
