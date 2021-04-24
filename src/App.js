import "./App.css";
import Login from "./view/login";
import testSomething from "./testing/functionTest";

function App() {
  testSomething(); //In this function you test your new features

  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
    </div>
  );
}

export default App;
