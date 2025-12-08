// Adminsivun tiedotteidenhallinta
/*
import React, {useEffect, useMemo, useState} from 'react';
//import axios from "axios";

const API_BASE =
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  process.env.REACT_APP_API_BASE_URL ||
  'http://localhost:8080/api';

const ANNOUNCEMENTS_URL = `${API_BASE}/announcements`;

const getAuthHeaders = () => {
  const token =
    localStorage.getItem('token') ||
    localStorage.getItem('jwt') ||
    localStorage.getItem('authToken');
  return token ? {Authorization: `Bearer ${token}`} : {};
};

const emptyAnnouncement = () => ({
  title: '',
  text: '',
  image: '',
  _file: null,
  visible: true,
  _dirty: true,
});

const validate = (a) => {
  const errors = {};
  if (!a.title?.trim()) errors.title = 'Otsikko on pakollinen';
  if (!a.text?.trim()) errors.text = 'Teksti on pakollinen';
  return errors;
};

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
}
*/
