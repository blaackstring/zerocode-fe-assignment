import React, { useContext, useState } from 'react';
import Modal from './Modal';
import { chatContext } from '../../contextApi/chatContext';
import { signup } from '../../services/Auth_services';

function Signup() {
  const { onClose, isOpen } = useContext(chatContext);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (): Promise<void> => {
    if (!state.username || !state.email || !state.password) {
      alert('All fields are required');
      return;
    }

    try {
      setIsLoading(true);
      const res = await signup({
        username: state.username,
        email: state.email,
        password: state.password,
      });
      if (res.success) {
        alert('Signup successful');
        onClose();
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Separate body JSX
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <input
        className="border p-2 rounded"
        name="username"
        placeholder="Username"
        value={state.username}
        onChange={handleChange}
      />
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
      title="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      actionLabel="Signup"
      disabled={isLoading}
      body={bodyContent} // 🔹 pass here
    />
</div>
  );
}

export default Signup;
