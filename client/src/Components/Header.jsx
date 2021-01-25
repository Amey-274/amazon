import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInout } from '../actions/signActions'
const Header = () => {
  const { signIn } = useSelector(state => state)
  const dispatch = useDispatch()
  const { userInfo } = signIn
  const data = userInfo ? userInfo[0] : ''
  const signoutHandler = () => {
    dispatch(signInout())

  }
  return (
    <header className='header'>
      <div className='container show'>
        <div className='logo'>
          <Link to="/">amazon</Link>
        </div>

        <div className='menu'>

          <ul>
            <li>
              <Link to='/cart'>Cart</Link>

            </li>

            {
              data ? (
                <>
                  <li>
                    <Link to='/profile'>
                      {data.name}
                    </Link>
                  </li>

                  {
                    data.isAdmin ? (
                      <li>
                        <Link to='/admin'>Admin</Link>
                      </li>
                    ) : null
                  }


                  <li>

                    <Link to='#signout' onClick={signoutHandler}>sign-out</Link>

                  </li>

                </>

              ) : (
                  <li>
                    <Link to='/signin'>Signin</Link>


                  </li>
                )
            }



          </ul>

        </div>
      </div>
    </header>
  )
}

export default Header



