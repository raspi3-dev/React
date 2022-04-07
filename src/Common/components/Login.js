import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, SignInMethod } from "firebase/auth";
import { db } from '../firebase/firebase';

const Login = () => {

    
    const [isRegistred, setRegistred] = useState(false)
    
    const state2 = useContext(UserContext)
    const {user, setUser} = state2
    const [error, setError] = useState(null)
    
    const [nom, setNom] = useState()

    
    const loginRegister = (e)=>{
        e.preventDefault()
        setRegistred(!isRegistred)
    }

    const crearUsu = (correo, pass)=>{
        
        const auth = getAuth();

        createUserWithEmailAndPassword(auth,correo, pass)
        .then((usuDesdeFirebase)=>{
            console.log("usuario Creado",usuDesdeFirebase.user)
            setUser(usuDesdeFirebase.user)  
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setError(`${error.message}`)
        })
    }

    const iniciarSesion = (correo, pass)=>{
            
        const auth = getAuth();
            signInWithEmailAndPassword(auth,correo, pass)
            .then((usuDesdeFirebase)=>{
            console.log("sesion iniciada con",usuDesdeFirebase.user)
            setUser(usuDesdeFirebase.user.email)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(`${error.message}`)
          });
    }
    
    const submitHandler = (e) =>{
        e.preventDefault()
        
        const correo = e.target.emailField.value
        const pass = e.target.passwordField.value
        
        console.log(correo, pass)
        
        if(!isRegistred){
            crearUsu(correo, pass)
        }
        else if(isRegistred){
            iniciarSesion(correo, pass)
        }
        
    }

    
    return (
        <div className="col-6 m-auto mt-10">
            <div className="caja">
                
                <h2>{isRegistred
                    ?"Login"
                    :"Register"}
                </h2>
                <form onSubmit={submitHandler} action="">
                    <div className="inputcaja">
                        <input type="text" name="" required="" onChange={e=>setNom(e.target.value)}/>
                        <label htmlFor="">User</label>
                    </div>
                    <div className="inputcaja">
                        <input type="email" id="emailField" name="" required=""/>
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputcaja">
                        <input type="password" id="passwordField" name="" required=""/>
                        <label htmlFor="">Password</label>
                    </div>
                    <button  
                        className="btn-primary m-1"
                        type="submit">
                            {isRegistred
                                ?"Inicia sesión"
                                :"Registro"
                            }
                    </button>
                    <button  
                        className="btn-primary"
                        onClick={loginRegister}> 
                        {isRegistred
                            ?"No tienes cuenta? registrate"
                            :"Ya tienes cuenta? Logeate"
                        }
                    </button>
                    
                </form>
                <span className='text-danger'>{error}</span>
            </div>
        </div>
        
    )
}

export default Login