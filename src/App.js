import React from 'react';
import 'App.css';
import { Header } from 'components/header/header';
import Spinner from 'components/spinner/spinner';


const AppContainer = () => (
    <body>
    <Header></Header>
    <Spinner></Spinner>
    </body>
);



function App() {
  return (
  <AppContainer></AppContainer>
  );
}

export default App;
