import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from '../switches/Switch';

export default function LoginForm({
  loginDetails,
  setLoginDetails,
  login,
  domain,
}) {
  const [toggle, setToggle] = useState(true);

  return (
    <form onSubmit={(event) => login(event)} className="p-4 bg-white rounded shadow">
      <h2 className="text-center mb-4">Login to Your Account</h2>
      
      {domain === 'student' && (
        <div className="mb-3 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <span className={toggle ? "fw-bold me-3" : "me-3"}>Roll Number</span>
            <Switch
              onChange={() => {
                setToggle(!toggle);
                if (toggle)
                  setLoginDetails({
                    ...loginDetails,
                    rollNumber: null,
                  });
                else
                  setLoginDetails({
                    ...loginDetails,
                    email: '',
                  });
              }}
              value={toggle}
            />
            <span className={!toggle ? "fw-bold ms-3" : "ms-3"}>Email</span>
          </div>
        </div>
      )}
      
      {domain === 'student' ? (
        toggle ? (
          <div className="form-group">
            <label className='form-label'>Roll Number</label>
            <input
              className='form-control'
              type='text'
              placeholder="Enter your roll number"
              value={loginDetails.rollNumber ?? ''}
              onChange={(event) =>
                setLoginDetails({
                  ...loginDetails,
                  rollNumber: event.target.value,
                })
              }
              required
            />
          </div>
        ) : (
          <div className="form-group">
            <label className='form-label'>Email Address</label>
            <input
              className='form-control'
              type='email'
              placeholder="Enter your email"
              value={loginDetails.email}
              onChange={(event) =>
                setLoginDetails({ ...loginDetails, email: event.target.value })
              }
              required
            />
          </div>
        )
      ) : (
        <div className="form-group">
          <label className='form-label'>Email Address</label>
          <input
            className='form-control'
            type='email'
            placeholder="Enter your email"
            value={loginDetails.email}
            onChange={(event) =>
              setLoginDetails({ ...loginDetails, email: event.target.value })
            }
            required
          />
        </div>
      )}

      <div className="form-group mt-3">
        <label className='form-label'>Password</label>
        <input
          className='form-control'
          type='password'
          placeholder="Enter your password"
          value={loginDetails.password}
          onChange={(event) =>
            setLoginDetails({
              ...loginDetails,
              password: event.target.value,
            })
          }
          required
        />
      </div>

      <div className='d-grid gap-2 mt-4'>
        <button className='btn btn-primary btn-lg'>Login</button>
      </div>
      
      <div className='text-center mt-3'>
        <p>
          Don't have an account?{' '}
          <Link to={`/${domain}/signup`} className="text-primary fw-bold">
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
}
