import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {

  const navigate = useNavigate();

  const Logout = async(e) => {
    e.preventDefault();
    // 로그아웃 로직 처리
    try {
      const response = await fetch("/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        window.alert("로그아웃 성공!");
        navigate("/user/login");
      } else {
        const errorResult = await response.json();
        window.alert(errorResult.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      window.alert("로그아웃 중 오류가 발생했습니다.");
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
          <img src="../logo.png" alt="logo" />
          <h1 style={{ margin: "0px", color: "#0A6294" }}>Bad Truck Detection</h1>
        </div>
        
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop: "24px",
            justifyContent: "space-between"
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
            className="Btn"
          >
            이미지 업로드
          </button>
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
          >
            적재 불량 트럭 확인
          </button>
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
          >
            실시간 모니터링
          </button>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "30px",
            marginRight: "24px",
            justifyContent: "end"
          }}
        >
          <button
            style={{
              width: "30%",
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
            onClick={Logout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
& .Btn:hover {
  background-color: #1c99db88 !important;
}
`;

export default Main;
