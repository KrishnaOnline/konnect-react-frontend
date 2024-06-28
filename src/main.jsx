import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers.js";
import {Provider} from "react-redux";

const store = configureStore({
    reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Toaster
                    toastOptions={{
                        className: "",
                        style: {
                            // backgroundColor: '#01285F',
                            backgroundColor: "white",
                            // color: 'white',
                            color: "black",
                            marginTop: 20,
                            // transform: translateX(70)
                        },
                    }}
                />
            </BrowserRouter>
        </Provider>
	// </React.StrictMode>
);
