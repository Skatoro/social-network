import styles from "./Navbar.module.css"
import NavbarOption from "./NavbarOption/NavbarOption";
import ProfileIcon from "../../common/Svg/SvgImage/ProfileIcon";
import DialogsIcon from "../../common/Svg/SvgImage/DialogsIcon";
import UsersIcon from "../../common/Svg/SvgImage/UsersIcon";
import SettingsIcon from "../../common/Svg/SvgImage/SettingsIcon";
import {useState} from "react";
import SettingsContainer from "./Settings/SettingsContainer";


const Navbar = () => {
    let [settingsOpened, setSettingsOpened] = useState(false);

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbarWrapper}>
                <div className={styles.mainItems}>
                    <NavbarOption
                        optionName={"Profile"} path={"profile"}
                        iconActive={<ProfileIcon active={true}/>}
                        iconInactive={<ProfileIcon active={false}/>}
                    />

                    <NavbarOption
                        optionName={"Dialogs"} path={"dialogs"}
                        iconActive={<DialogsIcon active={true}/>}
                        iconInactive={<DialogsIcon active={false}/>}
                    />

                    <NavbarOption
                        optionName={"Users"} path={"users"}
                        iconActive={<UsersIcon active={true}/>}
                        iconInactive={<UsersIcon active={false}/>}
                    />
                </div>
                <div className={styles.settingsContainer}>
                    <div
                        className={styles.settingsWrapper}
                        onClick={() => setSettingsOpened(true)}
                    >
                        <div className={settingsOpened ? `${styles.settings} ${styles.settingActive}` : styles.settings}>
                            <SettingsIcon/>
                            <span className={styles.optionTitle}>Settings</span>
                        </div>

                        {settingsOpened && <SettingsContainer setSettingsOpened={setSettingsOpened}/>}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Navbar;