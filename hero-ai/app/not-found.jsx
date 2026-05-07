import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>404 - Not Found</h1>
      <p style={{ opacity: 0.8 }}>The page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        style={{
          padding: "10px 16px",
          background: "#3b82f6",
          color: "white",
          borderRadius: 10,
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

