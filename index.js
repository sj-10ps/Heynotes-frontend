import { registerRootComponent } from 'expo';

import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createnotereducer from './redux/notecreateslice';
import viewnotereducer from './redux/noteviewslice';
import viewnotebyidreducer from './redux/noteviewbyid';
import updatenotereducer from './redux/updatenotesslice';
import deletetaskreducer from './redux/deletetaskslice';
import notecolorreducer from './redux/notecolorslice';
const store=configureStore({
    reducer:{
         createnote:createnotereducer,
         viewnote:viewnotereducer,
         viewnotebyid:viewnotebyidreducer,
         updatenote:updatenotereducer,
         deletetask:deletetaskreducer,
         notecolor:notecolorreducer
    }
})

const Storeapp=()=>{
    return(
        <Provider store={store}>
         <App/>
        </Provider>
    )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Storeapp);
