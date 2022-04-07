import React, { useContext, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../../UserContext';

const Home = () => {
  
  const [advise, setAdvise] = useState("")
  
  const state2 = useContext(UserContext)
  const {user, setUser} = state2
  
  const closeSesion = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      setAdvise("Página recargada, sesión mantenida. ")
    }).catch((error) => {
      // An error happened.
    });
    setUser("")
  }

  return (
    <div className="col-6 m-auto mt-10">
      <span className='text-info'>{advise}</span>
      <h1 className="text-center">Bienvenido Sesión Iniciada</h1>
      <button onClick={closeSesion}>
        Cerrar Sesión
      </button>
    </div>
  )
}

export default Home