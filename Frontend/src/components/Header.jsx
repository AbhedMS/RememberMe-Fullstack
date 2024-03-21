import React from "react";

function Header() {
    let year = new Date().getFullYear();
    console.log(year);

    return (
        <header>
            <h1>Remember Me!</h1>
        </header>
    );
}

export default Header;