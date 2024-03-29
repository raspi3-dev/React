import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, SignInMethod } from "firebase/auth";

const Login = () => {

    
    const [isRegistred, setRegistred] = useState(false)
    
    const state2 = useContext(UserContext)
    const {user, setUser} = state2
    
    const [error, setError] = useState(null)
    
    const [valorsInput, setValorsInput] = useState({})

    
    const handlerInputChange = ({target}) =>{
        setValorsInput({
          ...valorsInput,
          [target.name]:target.value
        })
      }
      
    const loginRegister = (e)=>{
        e.preventDefault()
        setRegistred(!isRegistred)
        setValorsInput({user:"",email:"",pass:""})

    }

    const crearUsu = (correo, pass)=>{
        
        const auth = getAuth();

        createUserWithEmailAndPassword(auth,correo, pass)
        .then((usuDesdeFirebase)=>{
            console.log("usuario Creado",usuDesdeFirebase.user.email)
            setUser(usuDesdeFirebase.user.email)  
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
                    ?"Iniciar sesión"
                    :"Registrarse"}
                </h2>
                <form onSubmit={submitHandler} action="">
                    <div className="inputcaja">
                        <input type="text" name="user" value={valorsInput.user} onChange={handlerInputChange}/>
                        <label htmlFor="">Usuario</label>
                    </div>
                    <div className="inputcaja">
                        <input type="email" id="emailField" name="email" value={valorsInput.email} onChange={handlerInputChange}/>
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputcaja">
                        <input type="password" id="passwordField" name="pass" value={valorsInput.pass} onChange={handlerInputChange}/>
                        <label htmlFor="">Contraseña</label>
                    </div>
                    <div className="d-flex flex-column">
                        <button  
                            className="btn btn-outline-primary btn-lg btn-bloc mb-2"
                            type="submit">
                                {isRegistred
                                    ?"Iniciar sesión"
                                    :"Registrar"
                                }
                        </button>
                        <button  
                            className="btn btn-outline-primary btn-lg btn-block"
                            onClick={loginRegister}> 
                            {isRegistred
                                ?"¿No tienes cuenta? Registrate"
                                :"¿Ya tienes cuenta? Inicia sesión"
                            }
                        </button>
                    </div>
                </form>
                <span className='text-danger'>{error}</span>
            </div>
        </div>
        
    )
}

export default Login