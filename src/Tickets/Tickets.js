import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'


import {db} from "../Common/firebase/firebase"
import {where, collection,query,getDocs,addDoc, doc, deleteDoc, setDoc, onSnapshot} from "firebase/firestore";
import { UserContext } from '../UserContext';
  
  const Tickets = () => {

 ////////////////////////-------ESTADOS------------/////////////////////////////////////////////////////  
 const state2 = useContext(UserContext)
 const {user, setUser} = state2
 
 
  const [tickets, setTickets] = useState({})

  const inputFocus = useRef()

  let date = new Date().toDateString();
  const [data, setData] = useState(date)
  const [id, setId] = useState()

  const [stateUserList, setUserList] = useState([])
  const [stateAssetList, setAssetList] = useState([])

  const [incidenceList, setIncidenceList] = useState([])
  const [modModificar, setModModificar] = useState(false)
 
  const [error, setError] = useState(null)
  ////////////////////////-------FUNCIÓN HANDLERINPUTCHANGE------------/////////////////////////////////////////////////////
  const handlerInputChange = ({target}) =>{

    setTickets({
      ...tickets,
      [target.name]:target.value
    })
  }

  ////////////////////////-------FIRESTORE DATABASE------------/////////////////////////////////////////////////////
  const taskCollectionRef = collection(db,"tasks")
  
  const q = query(taskCollectionRef,where ('createdBy','==' , user))
  
  ////////////////////////-------FIRESTORE llAMO A USERS------------/////////////////////////////////////////////////////

  const UsersCollectionRef = collection(db,"tecnics")  
  
    const getUsers = async () => {
      
      const dataUsers = await getDocs(UsersCollectionRef)
    
      setUserList(dataUsers.docs.map( (v) =>{
          return {...v.data()}

    }))

  }
  ////////////////////////-------FIRESTORE llAMO A ASSETS------------/////////////////////////////////////////////////////
  const AssetesCollectionRef = collection(db,"assets")  
  
    const getAssets= async () => {
      
    const dataAssets = await getDocs(AssetesCollectionRef)
    
      setAssetList(dataAssets.docs.map( (v) =>{
          return {...v.data()}

    }))

  }
  
  useEffect( () => {    
  
    const off = onSnapshot( q, (data)=>{
      
      setIncidenceList(data.docs.map( (v)=>{
        
        return ({...v.data(), id:v.id})
     
      }),
      getAssets(),
      getUsers()
      )
    })
    return () => {off()}
  }, [])

////////////////////////-------AÑADIR INCIDENCIA------------/////////////////////////////////////////////////////

  const addTask = (e) =>{
    
    e.preventDefault()
    
    if(tickets['title'] === null || tickets['description'] == null){
      setError("Introdueix algun valor")
      return
    }
    else if(tickets['title'] != null || tickets['description'] != null)
    {
      let date = new Date().toDateString();
    
      setData(date)
      
      addDoc(collection(db, "tasks"), {
        ...tickets,
        createdBy:user,
        created:data,
        updated:data,
        status:"iniciat"
        
      });
    }
    
    setTickets({
      title:"",
      description:"",
    })

    inputFocus.current.focus()

    setError(null)
    
  }

////////////////////////-------BORRAR INCIDENCIA------------/////////////////////////////////////////////////////

  const removeTask = (id) =>{
    
    deleteDoc(doc(db, "tasks", id))

  }

////////////////////////-------BOTON EDITAR INCIDENCIA------------/////////////////////////////////////////////////////

  const editButon = ({id,title,description,asset,asigned}) =>{
    console.log(id,title,description,asset,asigned)
  
    setModModificar(true)
    
    setId(id);

    setTickets({
      title,
      description,
      asigned,
      asset
    })
  }

////////////////////////-------EDITAR INCIDENCIA------------/////////////////////////////////////////////////////

  const addEdit = (e) =>{
    
    let date2 = new Date().toDateString();

    e.preventDefault()
    console.log(tickets)
    setDoc (doc(db,"tasks",id),
    {
      ...tickets,
      createdBy:user,
      created:data,
      updated:date2,
      status:"actualitzat"
    })
    
    setModModificar(false)
    
  }
  
////////////////////////-------FORMULARIO------------/////////////////////////////////////////////////////
  
  return (
    <div className='container mt-5'>
      <h1 className='text-center bg-light'>Incidencies</h1>
      <hr/>
      <div className='row'>
        <div className='col recuadro'>
          <h4 className="text-center">
          {
            modModificar? "Editar Incidencias" : "Afegir Incidencia"
          }
          </h4>
          <form className="form-horizontal" onSubmit={modModificar? addEdit : addTask}>
            <div className="form-group container form-container">
              <label htmlFor="titulo">Tittle</label>
              <input
                name="title"
                ref = {inputFocus}
                className='form-control mb-2'
                onChange={handlerInputChange}
                type="text"
                placeholder='Afegir títol incidéncia'
                value={tickets.title}/>
              <label htmlFor="descripcion">Description</label>
              <input 
                name="description"
                className='form-control mb-2'
                onChange={handlerInputChange}
                type="text"
                placeholder='Afegir descripció incidéncia'
                value={tickets.description}/>
              <label> Tècnic</label>
              <select 
                name="asigned"
                className="form-select" 
                onChange={handlerInputChange}
                value={tickets.asigned}>
                  {
                    stateUserList.map(({nom}, index) => {
                      return  <option key={index} value={nom}>{nom}</option>
                    })
        
                  }
              </select>
              <label>Component Incidència</label>
              <select  
                name="asset"
                className="form-select mb-3" 
                onChange={handlerInputChange}
                value={tickets.asset}>
                  {
                    stateAssetList.map(({model}, index)=>{
                      return <option key={index} value ={model}>{model}</option>
                    })  
                  }
              </select>
            {
              !modModificar ? 
              <button 
                className='btn btn-primary btn-block w-100' 
                type="submit"
                >Afegir
              </button>
                :
              <button 
                className='btn btn-warning btn-block w-100' 
                type="submit"
                >Editar
              </button> 
            }
            <span className='text-danger'>{error}</span>
            </div>
          </form>          
        </div>
      </div>
{/*////////////////////////-------RENDERIZACION DE TABLA------------///////////////////////////////////////////////////// */}
      <div className='row  mt-5'>
        <div className='col'>
          <h4 className='text-center'>Llista de Tasques</h4>
          <table className="table table-striped bordered hover">
            <thead>
              <tr>
                <td>Creat</td>
                <td>Title</td>
                <td>Desc</td>
                <td>Asset</td>
                <td>Created</td>
                <td>Updated</td>
                <td>Asignat</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {
                incidenceList.length === 0? 
                <tr><td><p>No hay tareas</p></td></tr>
                :
                incidenceList.map((v,index)=>{
                  return(
                    <tr key={index}>
                      <td>{v.createdBy}</td>
                      <td>{v.title}</td>
                      <td>{v.description}</td>
                      <td>{v.asset}</td>
                      <td>{v.created}</td>
                      <td>{v.updated}</td>
                      <td>{v.asigned}</td>
                      <td>{v.status}</td>
                      <td>
                        <button 
                          className='btn btn-sm btn-primary'
                          onClick={()=>editButon(v)}>
                          Editar
                        </button>
                      </td>
                      <td>
                        <button 
                          className='btn btn-sm btn-warning mx-2'
                          onClick={()=>removeTask(v.id)}>
                          Esborrar
                        </button>
                      </td>
                    </tr> 
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Tickets