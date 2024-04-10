import React from "react"
import styles from './Root.module.css'
import { Link, Outlet } from "react-router-dom"

export default function Root() {
    return (
        <>
            <nav id={styles.navbar}>
                <li>
                    <Link to='/login'>Login(Faculty/Staff)</Link>
                </li>
            </nav>
            <header>
                <h1>HomePage</h1>
                <div>TimeTable</div>
            </header>
        </>
    )
}