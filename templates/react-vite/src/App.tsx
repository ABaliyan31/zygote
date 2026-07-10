function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
      <h1>React app up and running</h1>
      <p>VITE_API_URL: {apiUrl}</p>
    </>
  );
}

export default App;
