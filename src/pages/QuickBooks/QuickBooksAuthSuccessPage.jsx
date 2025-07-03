const QuickBooksAuthSuccessPage = () => {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "2rem",
        background: "#415391",
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>QuickBooks Connected!</h1>

      {/* Improved Animated Checkmark */}
      <svg
        viewBox="0 0 120 120"
        style={{
          width: "120px",
          height: "120px",
          marginBottom: "1.5rem",
        }}
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="6"
          strokeDasharray="339.292"
          strokeDashoffset="339.292"
          style={{
            animation: "draw 0.6s ease-in-out forwards",
          }}
        />
        <polyline
          points="34,64 50,78 86,42"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: "draw 0.4s ease-in-out 0.6s forwards",
          }}
        />
      </svg>

      <p style={{ fontSize: "1.1rem" }}>
        You're all set. You can close this window now.
      </p>

      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </section>
  );
};

export default QuickBooksAuthSuccessPage;