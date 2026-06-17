import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import {
AuthProvider
} from "./context/AuthContext";

import {
CartProvider
} from "./context/CartContext";

const root =
ReactDOM.createRoot(
document.getElementById(
"root"
) as HTMLElement
);

root.render(
<React.StrictMode> <AuthProvider> <CartProvider> <App /> </CartProvider> </AuthProvider>
</React.StrictMode>
);
