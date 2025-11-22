import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaLeaf } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success('Registration successful. Welcome!');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <style>
        {`
          .register-wrapper {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }
          
          .register-card {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(46, 125, 50, 0.15);
            overflow: hidden;
            max-width: 480px;
            width: 100%;
          }
          
          .register-header {
            background: linear-gradient(135deg, #2E7D32 0%, #388E3C 100%);
            padding: 30px;
            text-align: center;
            position: relative;
          }
          
          .register-header::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: #ffffff;
            border-radius: 50% 50% 0 0;
          }
          
          .register-icon {
            width: 70px;
            height: 70px;
            background: #FBC02D;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            box-shadow: 0 5px 20px rgba(251, 192, 45, 0.4);
          }
          
          .register-icon svg {
            font-size: 2rem;
            color: #2E7D32;
          }
          
          .register-header h1 {
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .register-header p {
            color: #C8E6C9;
            margin: 8px 0 0;
            font-size: 0.95rem;
          }
          
          .register-body {
            padding: 30px 35px 35px;
          }
          
          .form-label {
            color: #333333;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 8px;
          }
          
          .input-group-custom {
            position: relative;
          }
          
          .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #2E7D32;
            z-index: 10;
            font-size: 1rem;
          }
          
          .form-control-styled {
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            padding: 14px 15px 14px 45px;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            background: #fafafa;
          }
          
          .form-control-styled:focus {
            border-color: #2E7D32;
            box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.1);
            background: #ffffff;
          }
          
          .form-control-styled::placeholder {
            color: #aaa;
          }
          
          .password-input {
            padding-right: 50px !important;
          }
          
          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #888;
            cursor: pointer;
            padding: 5px;
            z-index: 10;
            transition: color 0.3s ease;
          }
          
          .password-toggle:hover {
            color: #2E7D32;
          }
          
          .btn-register {
            background: linear-gradient(135deg, #FBC02D 0%, #F9A825 100%);
            border: none;
            border-radius: 12px;
            padding: 14px;
            font-size: 1rem;
            font-weight: 700;
            color: #1B5E20;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(251, 192, 45, 0.4);
          }
          
          .btn-register:hover {
            background: linear-gradient(135deg, #FFD54F 0%, #FBC02D 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(251, 192, 45, 0.5);
            color: #1B5E20;
          }
          
          .btn-register:active {
            transform: translateY(0);
          }
          
          .btn-register:disabled {
            background: #ccc;
            box-shadow: none;
            transform: none;
          }
          
          .divider {
            display: flex;
            align-items: center;
            margin: 25px 0;
          }
          
          .divider-line {
            flex: 1;
            height: 1px;
            background: #e0e0e0;
          }
          
          .divider-text {
            padding: 0 15px;
            color: #888;
            font-size: 0.85rem;
          }
          
          .signin-link-wrapper {
            text-align: center;
            padding: 20px;
            background: #f8fdf8;
            border-top: 1px solid #e8f5e9;
            margin: 0 -35px -35px;
          }
          
          .signin-link-wrapper span {
            color: #666;
            font-size: 0.95rem;
          }
          
          .signin-link {
            color: #2E7D32;
            font-weight: 700;
            text-decoration: none;
            margin-left: 8px;
            transition: all 0.3s ease;
          }
          
          .signin-link:hover {
            color: #1B5E20;
            text-decoration: underline;
          }
          
          .form-group-spacing {
            margin-bottom: 20px;
          }
          
          .leaf-decoration {
            position: absolute;
            opacity: 0.1;
            font-size: 8rem;
            color: #FBC02D;
          }
          
          .leaf-1 {
            top: -20px;
            right: -20px;
            transform: rotate(45deg);
          }
          
          .leaf-2 {
            bottom: -30px;
            left: -20px;
            transform: rotate(-45deg);
          }
        `}
      </style>
      
      <Meta title={'Register'} />
      
      <div className="register-wrapper">
        <div className="register-card">
          <div className="register-header">
            <div className="register-icon">
              <FaLeaf />
            </div>
            <h1>Create Account</h1>
            <p>Join our farm-fresh community</p>
          </div>
          
          <div className="register-body">
            <Form onSubmit={submitHandler}>
              <div className="form-group-spacing">
                <Form.Label>Full Name</Form.Label>
                <div className="input-group-custom">
                  <FaUser className="input-icon" />
                  <Form.Control
                    className="form-control-styled"
                    value={name}
                    type="text"
                    placeholder="Enter your full name"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group-spacing">
                <Form.Label>Email Address</Form.Label>
                <div className="input-group-custom">
                  <FaEnvelope className="input-icon" />
                  <Form.Control
                    className="form-control-styled"
                    value={email}
                    type="email"
                    placeholder="Enter your email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group-spacing">
                <Form.Label>Password</Form.Label>
                <div className="input-group-custom">
                  <FaLock className="input-icon" />
                  <Form.Control
                    className="form-control-styled password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Create a password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              
              <div className="form-group-spacing">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-group-custom">
                  <FaLock className="input-icon" />
                  <Form.Control
                    className="form-control-styled password-input"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              
              {isLoading && <Loader />}
              
              <Button
                className="btn-register w-100 mt-3"
                type="submit"
                disabled={isLoading}
              >
                Create Account
              </Button>
              
              <div className="signin-link-wrapper">
                <span>Already have an account?</span>
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  className="signin-link"
                >
                  Sign In
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;