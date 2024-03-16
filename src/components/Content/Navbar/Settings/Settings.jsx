import {NavLink} from "react-router-dom";
import styles from "./Settings.module.css"
import MoonIcon from "../../../common/Svg/SvgImage/MoonIcon";
import SunIcon from "../../../common/Svg/SvgImage/SunIcon";
import Toggle from "../../../common/Toggle/Toggle";
import LogOutIcon from "../../../common/Svg/SvgImage/LogOutIcon";
import LogInIcon from "../../../common/Svg/SvgImage/LogInIcon";

const Settings = ({setDarkMode, isDarkMode, setSettingsOpened, userName, isAuth, logout}) => {

    return (
        <>
            <div className={styles.settingsOverlay}>
                <div className={styles.settingOption} onClick={() => setDarkMode(!isDarkMode)}>
                    <div>
                        {isDarkMode ? <MoonIcon/> : <SunIcon/>}
                        <span>{isDarkMode ? "Dark mode" : "Light mode"}</span>
                    </div>
                    <Toggle isActivated={isDarkMode}/>
                </div>
                {isAuth
                    ? <div onClick={logout} className={styles.settingOption}>
                        <div>
                            <LogOutIcon/>
                            <span>Log out {userName}</span>
                        </div>
                    </div>
                    : <NavLink to={`/login`} className={styles.settingOption}>
                        <div>
                            <LogInIcon/>
                            <span>Log in</span>
                        </div>
                    </NavLink>
                }
            </div>
            <div className={styles.settingsBgShadow} onClick={(e) => {
                e.stopPropagation()
                setSettingsOpened(false)
            }}/>
        </>
    )
}

export default Settings;