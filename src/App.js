import { Provider } from 'react-redux';
import './App.css';
import RegisterForm from './componentes/RegisterForm';
import {store} from './store/store'
function App() {
  return (
    <div className="App">
          <Provider store={store}>

            <h1>Register Form</h1>
        <RegisterForm />
      </Provider>

    </div>
  );
}

export default App;
