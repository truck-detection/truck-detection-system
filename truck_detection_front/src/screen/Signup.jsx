import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Signup = () => {
  const [id, setId] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // 이메일 형식 검사 정규 표현식
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 회원가입 로직 처리
    if (!emailPattern.test(email)) {
      window.alert("이메일 형식으로 입력해주세요.");
      return;
    }

    if (pw1 === pw2) {
      try {
        const response = await fetch("/user/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            managerID: id,
            password: pw1,
            confirm_password: pw2,
            name,
            email,
          }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          window.alert(errorResult.message);
        } else {
          const result = await response.json();
          window.alert(result.message);
          navigate("/user/confirm-sign-up");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        window.alert("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      window.alert("비밀번호를 확인해주세요.");
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
          height: "600px",
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
            height: "250px",
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
              type="password"
              style={{
                width: "calc(100% - 40px)",
                height: "36px",
                padding: "0px",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              placeholder="Password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
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
              type="password"
              style={{
                width: "calc(100% - 40px)",
                height: "36px",
                padding: "0px",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              placeholder="Confirm Password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            Verify your email
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




export default Signup;
  