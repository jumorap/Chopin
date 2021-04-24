import "./App.css";
import Login from "./view/login";
import testSomething from "./testing/functionTest";
import uploadFilePage from "./view/uploadPage/uploadFilePage";

function App() {
  testSomething(); //In this function you test your new features

  return (
    <div className="App">
      <header className="App-header">
        {/* <Login /> */}
        <uploadFilePage />
      </header>
    </div>
  );
}

export default App;
