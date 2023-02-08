import React from 'react'
import "./Header.css"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const handleAuth = () => {
        if (user) {
            auth.signOut()
        }
    }
    return (
        <div className='header'>
            <Link to="/"><img className='headerLogo' src="https://www.pngplay.com/wp-content/uploads/3/White-Amazon-Logo-Background-PNG-Image.png" width="200" alt="woodland gardening amazon png logo vector" />
            </Link>
            <div className='headerSearch'>
                <input className='headerSearchIn' type="text" />
                <SearchIcon className='headerSearchIcon' />
            </div>
            <div className='headerNav'>
                <div className='headerOption' onClick={handleAuth}>
                    <Link className='link' to={!user && "/login"}>
                        <span className='headerOptionLineOne'>
                            {user ? "Hello " + user.email : "Hello Guest"}
                        </span>
                        <span className='headerOptionLineTwo'>
                            {user ? "Sign Out" : "Sign In"}
                        </span>
                    </Link>

                </div>
                <div className='headerOption'>
                    <Link to="/orders" className='link'>
                        <span className='headerOptionLineOne'>
                            Returns
                        </span>
                        <span className='headerOptionLineTwo'>
                            & Orders
                        </span>
                    </Link>
                </div>
                <div className='headerOption'>
                    <span className='headerOptionLineOne'>
                        Your
                    </span>
                    <span className='headerOptionLineTwo'>
                        Prime
                    </span>
                </div>
                <div className='headerBasket'>
                    <Link to="/checkout"><ShoppingBasketIcon className='headerBasketIcon' /><span className='headerBasketCount headerOptionLineTwo'>{basket?.length}</span></Link>

                </div>
            </div>
        </div>

    )
}

export default Header;