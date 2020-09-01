import React from 'react';
import classes from './App.module.css';
import Layout from "./hoc/Layout/Layout";
import spinner from "./components/UI/Spinner/Spinner";


function App() {
  return (
    <div className={classes.App}>
        <Layout />
    </div>
  );
}

export default App;
