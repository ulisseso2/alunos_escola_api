import React from 'react';
import { FaHome, FaUserAlt, FaSignInAlt, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';
import { useStore } from 'react-redux';

export default function Header() {
  const id = useSelector((state) => state.auth.user.id);
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        {id ? <FaUserEdit size={24} /> : <FaUserAlt size={20} />}
      </Link>
      <Link to="/login">
        <FaSignInAlt size={24} />
      </Link>
    </Nav>
  );
}
