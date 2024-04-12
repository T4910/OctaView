import React from "react"
import styles from './Root.module.css'
import { Link } from "react-router-dom"
import TimeTable from '../components/timetable/Index'

export default function Root() {
    return (
        <>
            <nav id={styles.navbar}>
                <li>
                    <Link to='/login'>Login(Faculty/Staff)</Link>
                </li>
            </nav>
            <header>
                <h1>Landmark University Timetable</h1>
            </header>
            <TimeTable />
        </>
    )
}