import Body from './components/Body';
import './App.css';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
