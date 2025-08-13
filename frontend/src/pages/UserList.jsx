import React, { useEffect, useState, useContext } from 'react';
import { getUserList } from '../api/user';
import { AuthContext } from '../context/AuthContext';

const UserList = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(auth?.token){
      getUserList(auth.token).then(data => setUsers(data.data.users));
    }
  }, [auth]);

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Email</th><th>Role</th></tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.first_name} {u.last_name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
