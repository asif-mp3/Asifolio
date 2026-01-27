import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Asif — Full Stack Developer";
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
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "280px",
            height: "280px",
            background: "#1e293b",
            borderRadius: "40px",
            marginRight: "80px",
          }}
        >
          {/* A Logo with star */}
          <svg width="140" height="156" viewBox="0 0 33 36" fill="none">
            <path
              d="M32.25 36L19.913 2.63792C19.3267 1.05258 17.8153 0 16.125 0C14.4347 0 12.9233 1.05257 12.337 2.63792L0 36C3.59145 36 6.78837 33.7241 7.96394 30.3305L15.9375 7.3125H16.3125L24.2861 30.3305C25.4616 33.7241 28.6586 36 32.25 36Z"
              fill="#cbd5e1"
            />
            <path
              d="M16.0875 21.7799C16.0875 24.6504 13.7605 26.9774 10.89 26.9774C13.7605 26.9774 16.0875 29.3044 16.0875 32.1749C16.0875 29.3044 18.4145 26.9774 21.285 26.9774C18.4145 26.9774 16.0875 24.6504 16.0875 21.7799Z"
              fill="#cbd5e1"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "140px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-2px",
              marginBottom: "16px",
            }}
          >
            Asif.
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: "2px",
            }}
          >
            Full Stack Developer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
