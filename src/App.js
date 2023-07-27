import { Provider } from "react-redux";
import "./App.css";
//import RegisterForm from './componentes/RegisterForm';
import LoginForm from "./componentes/LoginForm";

import { store } from "./store/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LoginForm />
      </Provider>
    </div>
  );
}
///<RegisterForm />
export default App;
