import Router from '~/router';
import { Header } from './components/Header';
import { MyStateProvider } from './stateProvider';

function App() {
  return (
    <MyStateProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </MyStateProvider>
  );
}

export default App;
