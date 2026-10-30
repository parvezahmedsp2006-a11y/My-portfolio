import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Parvez Ahmed | Geology and Mining Undergraduate";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
          padding: "70px 80px",
          color: "#FAF8F5",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#D4AF37",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "20px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#D4AF37",
            }}
          >
            Academic Portfolio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              color: "#FAF8F5",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Parvez Ahmed
          </div>
          <div
            style={{
              fontSize: "30px",
              fontFamily: "sans-serif",
              color: "#D4AF37",
              fontWeight: 400,
              lineHeight: 1.3,
            }}
          >
            Undergraduate Student in Geology &amp; Mining
          </div>
          <div
            style={{
              fontSize: "22px",
              fontFamily: "sans-serif",
              color: "#A8A09A",
              maxWidth: "900px",
              lineHeight: 1.5,
              marginTop: "8px",
            }}
          >
            Hydrogeology · Mineral Resources · GIS Earth Observation · Educational Web Tools
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#9C988F",
          }}
        >
          <span>Curriculum Foundation &amp; Technical Projects</span>
          <span style={{ color: "#D4AF37" }}>parvezahmedsp2006-a11y</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
