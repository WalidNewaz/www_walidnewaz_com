import * as React from "react"
import { Link } from "gatsby"

// const navStyle = {
//     backgroundColor: '#333',
//     padding: '10px'
// }

// const navListStyle = {
//     listStyle: 'none',
//     margin: 0,
//     padding: 0,
// }

// const navListItemStyle = {
//     display: 'inline-block',
//     marginRight: '20px'
// }

const Header = ({ title }) => {
    return (
        <div id="site-header">
            {/* <div id="site-logo">
                <h1 className="main-heading">
                    <Link to="/">{title}</Link>
                </h1>
            </div> */}
            <div id="main-menu">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                            {/* <a href="#">Home</a> */}
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                            {/* <a href="#">About</a> */}
                        </li>
                        <li>
                            <Link to="/">Writing</Link>
                            {/* <a href="#">Writing</a> */}
                        </li>
                        <li>
                            <Link to="/">Contact</Link>
                            {/* <a href="#">Contact</a> */}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header