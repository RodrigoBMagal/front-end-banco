import React from "react";
import { FaUniversity } from "react-icons/fa";

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <FaUniversity className="header-icon" />
                <div>
                    <h1>Sistema Bancário</h1>
                    <p>Gerencie suas contas e transações</p>
                </div>
            </div>
        </header>
    );
};

export default Header;