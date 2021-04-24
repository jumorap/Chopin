import "./App.css";
import Login from "./view/login";
import testSomething from "./testing/functionTest";
import UploadFilePage from "./view/uploadPage/UploadFilePage.js";

function App() {
  //testSomething(); //In this function you test your new features

  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          {/* <Login /> */}
          <UploadFilePage />
        </header>
      </div>
    </div>
  );
}

export default App;
