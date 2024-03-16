import './App.css';
import Content from "./components/Content/Content";
import {BrowserRouter, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {Component, useEffect} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";


function withRouter(Component) {                // hardcoded react-router v5->v6 transition for classes
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export const App = ({initializeApp, initialized, isDarkMode}) => {
    useEffect(() => {
        initializeApp()
    }, []);

    if (!initialized) {
        return <Preloader/>
    }
    let dataTheme = isDarkMode ? "dark" : "light";

    return (
        <div data-theme={dataTheme} className={"App"}>
            <Content/>
        </div>
    )
}

const mapStateToProps = state => ({
    initialized: state.app.initialized,
    isDarkMode: state.app.isDarkMode,
})
let AppContainer = withRouter(connect(mapStateToProps,
    {initializeApp}
)(App));

const MainApp = () => {
    return (
        <BrowserRouter  >
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )

} // a
export default MainApp;