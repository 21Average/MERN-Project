import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'

export default function Signin() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      });

    const data = await res.json();
    if (data.success === false) {
      // setLoading(false);
      // setError(data.message);
      dispatch(signInFailure(data.message))
      return;
    };
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(data.message))
    }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <form onSubmit = {handleSubmit} className='flex flex-col gap-4'>
        <h1 className='text-3xl text-center font-semibold'>Sign In</h1>
        <input 
          type='text'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg' 
          onChange={handleChange}>
        </input>
        <input 
          type='password' 
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg' 
          onChange={handleChange}>
        </input>
        <button disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase 
          hover:opacity-90 disabled:opacity-75'>
            {loading ? "loading..." :"Sign In"}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700 hover:underline'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
