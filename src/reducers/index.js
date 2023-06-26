import {combineReducers} from "redux";
import SplashReducer from "./splash";
import AuthReducer from "./auth";
import HomeReducer from "./home";
import DashboardHomeReducer from "./dashboard/home";
import CustomerReducer from "./dashboard/home/customer";
import PaymentReducer from "./dashboard/home/payment";
import OrderReducer from "./dashboard/orders";
import HoldCartReducer from "./dashboard/hold-cart";
import ViewMoreReducer from "./dashboard/view-more";
import CloseSessionReducer from "./dashboard/close-session";
import ErrorLogReducer from "./errorLog";

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to combine multiple reducers.
 */
const AppReducers = combineReducers({
    splashReducer: SplashReducer,
    authReducer: AuthReducer,
    homeReducer: HomeReducer,
    dashboardHomeReducer: DashboardHomeReducer,
    customerReducer: CustomerReducer,
    paymentReducer: PaymentReducer,
    orderReducer: OrderReducer,
    holdCartReducer: HoldCartReducer,
    viewMoreReducer: ViewMoreReducer,
    closeSessionReducer: CloseSessionReducer,
    errorLogReducer: ErrorLogReducer,
})

export default AppReducers
