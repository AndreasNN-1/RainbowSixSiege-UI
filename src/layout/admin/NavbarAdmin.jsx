import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarAdmin = () => {
    return (
        <nav>

            <menu>
                <li>
                    <NavLink to="admin">ADMIN Home</NavLink>
                </li>
                <li>
                    <NavLink to="/">Forsiden (public)</NavLink>
                </li>
            </menu>

        </nav>
    )
}

export default NavbarAdmin