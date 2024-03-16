import {NavLink} from "react-router-dom";
import styles from "./NavbarOption.module.css"

const NavbarOption = ({path, optionName, iconActive, iconInactive}) => {

    return (
        <NavLink
            to={`/${(path)}`}
            className={navData => navData.isActive ? `${styles.container} ${styles.active}` : styles.container}
        >
            {({ isActive }) => (
                <div className={styles.wrapper}>
                    {isActive ? iconActive : iconInactive}
                    <div  className={styles.titleWrapper}>
                        {optionName}
                    </div>
                </div>
            )}


        </NavLink>

    )
}

export default NavbarOption;