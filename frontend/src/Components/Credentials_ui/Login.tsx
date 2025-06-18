

import React, { useContext, useState } from 'react';
import Modal from './Modal';
import { chatContext } from '../../contextApi/chatContext';
import { login, } from '../../services/Auth_services';

function Login() {
  const { onCloseLogin, isOpenLogin, setUserstate , userstate} = useContext(chatContext);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (): Promise<void> => {
    if (!state.email || !state.password) {
      alert('All fields are required');
      return;
    }

    try {
      setIsLoading(true);
      const res = await login({
        email: state.email,
        password: state.password,
      });

      console.log(res);
        const {success,user}=res;

      
      if (res.success) {
    
           if (success) {
                setUserstate({
                  isLoggedIn: true,
                  username: user.username,
                  email: user.email
                });
              }
        alert('login successful');
        onCloseLogin();
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Separate body JSX
  const bodyContent = (
    <div className="flex flex-col gap-4">
    
      <input
        className="border p-2 rounded"
        name="email"
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        className="border p-2 rounded"
        name="password"
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange}
      />
    </div>
  );

  return (

<div>
        <Modal
      title="Vo-1AI"
      isOpen={isOpenLogin}
      onClose={onCloseLogin}
      onSubmit={handleSubmit}
      actionLabel="Login"
      disabled={isLoading}
      body={bodyContent} // 🔹 pass here
    />
</div>
  );
}

export default Login;
