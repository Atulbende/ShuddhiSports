import React from 'react';  
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './assets/styles/common/main.scss';
// import Login from './components/login/Login'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import {store,persistedStore} from './redux/store/store';
import Loader from './components/common/loader/Loader';
// import { Routes,Route } from 'react-router-dom'
import SecureRoutes from './routes/SecureRoutes';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
(()=>{
    const theme=localStorage.getItem('theme');
    if(!theme){
        localStorage.setItem('theme','good-morning');
        document.getElementById('bodys').classList.add('good-morning');
        return;
    }
    document.getElementById('bodys').classList.add(theme);
    console.log('thenme',theme)
})()

root.render(
<Provider store={store}>
    <PersistGate persistor={persistedStore}>
        <BrowserRouter>
            <SecureRoutes/>
            <ToastContainer/>
            <Loader/>
        </BrowserRouter>
    </PersistGate>
</Provider>
   
);

