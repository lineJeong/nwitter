import React from "react";
import { Link } from "react-router-dom";
import Home from "routes/Home";
import Profile from "routes/Profile";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" element={<Home />}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" element={<Profile />}>
            My Proflie
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;