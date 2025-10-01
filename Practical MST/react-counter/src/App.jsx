import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div style={styles.container}>
      <h1>Bhuvan's Counter</h1>
      <h2>{count}</h2>

      <div style={styles.buttonGroup}>
        <button onClick={handleDecrement} disabled={count === 0}>
          Decrement
        </button>
        <button onClick={handleIncrement} disabled={count === 10}>
          Increment
        </button>
        <button onClick={handleReset}>⚠ Reset ⚠</button>
      </div>

      {count === 10 && <p style={{ color: "red" }}>⚠⚠⚠⚠⚠ Maximum limit reached!!!!!</p>}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
};

export default App;