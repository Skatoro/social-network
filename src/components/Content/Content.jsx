import styles from "./Content.module.css"
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./Dialogs/DialogsContainer";
import UsersContainer from "./Users/UsersContainer";
import ProfileContainer from "./Profile/ProfileContainer";
import Preloader from "../common/Preloader/Preloader";
import {lazy, Suspense} from 'react';
import NavbarContainer from "./Navbar/NavbarContainer";

const LoginContainer = lazy(() => import('../Login/LoginContainer'));

const Content = () => {


    return (<Suspense fallback={<div><Preloader/></div>}>
            <div className={styles.contentWrapper}>
                <NavbarContainer/>
                <div className={styles.main}>
                    <div className={styles.mainInner}>
                        <Routes>
                            <Route path={"/dialogs/:dialogId?"} element={<DialogsContainer/>}/>
                            <Route path={"/users"} element={<UsersContainer/>}/>
                            <Route path={"/profile/:userId?"} element={<ProfileContainer/>}/>
                            <Route path={"/login"} element={<LoginContainer/>}/>
                            <Route path={"/"} element={<LoginContainer/>}/>
                            <Route path={"/social-network"} element={<LoginContainer/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Suspense>

    )
}

export default Content;