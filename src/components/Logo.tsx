import { Divider, Image } from "antd-mobile";
export const Logo = () => {
  return (
    <nav>
      <Image
        src={"./img/PET_AI-logo-white_cropped.png"}
        height="80px"
        lazy
        alt="PET AI LOGO"
        placeholder={<h1 style={{ textAlign: "center" }}>PET AI</h1>}
        fallback={<h1 style={{ textAlign: "center" }}>PET AI</h1>}
        fit="contain"
      />

      <h1
        // level={1}
        style={{
          display: "none",
        }}
      >
        Pet AI
      </h1>
      <Divider style={{ marginBottom: 0 }} />
    </nav>
  );
};
