import Body from './components/Body';
import './App.css';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import TestRedux from './components/TestRedux';

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
        {/* <TestRedux /> */}
      </Provider>
    </div>
  );
}

export default App;
