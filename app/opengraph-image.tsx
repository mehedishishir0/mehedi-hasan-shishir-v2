import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mehedi Hasan Shishir | Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #030712 0%, #0b1528 50%, #030712 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "9999px",
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              color: "#38bdf8",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: "20px",
            background: "linear-gradient(to right, #ffffff, #94a3b8)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Mehedi Hasan Shishir
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#38bdf8",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Full Stack Developer & Software Engineer
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            maxWidth: "900px",
            lineHeight: 1.5,
          }}
        >
          React • Next.js • TypeScript • Node.js • Express • .NET • PostgreSQL • MongoDB
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
