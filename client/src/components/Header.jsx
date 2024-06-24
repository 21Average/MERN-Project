import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useState } from 'react'

export default function Header() {
    const {currentUser} = useSelector(state => state.user);
    const [ showMenu, setShowMenu ] = useState(false);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <Link to='/'> 
                    <h1 className='font-bold text-sm sm:text-4xl flex flex-wrap'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link> 
                <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
                    <input 
                        type='text' 
                        placeholder='Search...'
                        className='bg-transparent foucs: outline-none w-24 sm:w-64'>
                    </input>
                    <FaSearch className='text-slate-600'></FaSearch>
                </form>
                <ul className=' flex gap-3' >
                    {/* <Link to='/'>
                        <li className='p-2 hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link> */}
                    <Link to='/about'>
                        <li className=' p-2 text-slate-700 hover:scale-105'>About</li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img className='rounded-full h-10 w-10 object-cover' src={currentUser.avatar} alt='Profile'></img>
                        ): (<li className='text-slate-700 hover:scale-105 p-2'>Sign in</li>)
                        }
                    </Link>
                    <Link to='/sign-up'>
                        {currentUser ? (
                            <li hidden></li>
                        ): (<li className='text-slate-700 hover:scale-105 bg-yellow-400 px-6 py-2' >Sign Up</li>)
                        }
                    </Link>
                </ul>
                {/* <div>
                    <div className="lg:hidden tham tham-e-squeeze tham-w-6" onClick={() => setShowMenu(!showMenu)}>
                        <div className="tham-box">
                            <div class="tham-inner" />
                        </div>
                    </div>
                    <ul>
                        {showMenu ? <div>
                            <Link to='/about'>
                                <li className=' p-2 text-slate-700 hover:underline'>About</li>
                            </Link>
                            <Link to='/profile'>
                                {currentUser ? (
                                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='Profile'></img>
                                ): (<li className='text-slate-700 hover:underline p-2'>Sign in</li>)
                                }
                            </Link>
                            <Link to='/sign-up'>
                                {currentUser ? (
                                    <li hidden></li>
                                ): (<li className='text-slate-700 hover:underline bg-yellow-400 px-6 py-2' >Sign Up</li>)
                                }
                            </Link>
                        </div>  : ''}
                    
                    </ul>
                </div> */}

            </div>
        </header>
    )
}
