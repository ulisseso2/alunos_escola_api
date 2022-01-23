import React from 'react';
import {
  FaHome,
  FaUserAlt,
  FaSignInAlt,
  FaUserEdit,
  FaCircle,
  FaPowerOff,
  FaAcquisitionsIncorporated,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Nav } from './styled';
import { useStore } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const id = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    toast.info('Até breve!');
    history.push('/');
  };
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        {id ? <FaUserEdit size={24} /> : <FaUserAlt size={20} />}
      </Link>

      {id ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          {' '}
          <FaSignInAlt size={20} />
        </Link>
      )}

      {id ? <FaCircle className="userOnline" size={24} /> : ' '}
    </Nav>
  );
}
