import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'

const Login = () => {

    const state2 = useContext(UserContext)
    const {user, setUser} = state2
    
    const [nom, setNom] = useState()

    const loginChange = (e)=>{
        e.preventDefault()
        setUser(nom)
    }

    return (
        <div className="col-6 m-auto mt-10">
            <div className="caja">
                <h2>Login</h2>
                <form action="">
                    <div className="inputcaja">
                        <input type="text" name="" required="" onChange={e=>setNom(e.target.value)}/>
                        <label htmlFor="">User</label>
                    </div>
                    <div className="inputcaja">
                        <input type="password" name="" required=""/>
                        <label htmlFor="">password</label>
                    </div>
                    <input onClick={loginChange}type="submit" value="Entra"/>
                </form>
            </div>
        </div>
    )
}

export default Login