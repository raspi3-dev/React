import React, { useEffect } from 'react'
import { useState } from 'react'


import {db} from "../Common/firebase/firebase"
import { collection, query,getDocs,addDoc, doc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";


const Tickets = () => {

 ////////////////////////-------ESTADOS------------/////////////////////////////////////////////////////  

  const [stateCreatedBy, setCreatedBy] = useState("MadDog")
  const [stateTitle, setTitle] = useState("")
  const [stateDes, setDes] = useState("")

  const [stateUserList, setUserList] = useState([])
  const [stateUser, setUser] = useState("")

  const [stateAssetList, setAssetList] = useState([])
  const [stateAsset, setAsset] = useState("")

  const [id, setId] = useState("")
  const [stateEstat, setEstat] = useState("iniciat")

  const [created, setCreated] = useState("")
  const [updated, setUpdated] = useState("")

  const [incidenceList, setIncidenceList] = useState([])
  const [modModificar, setModModificar] = useState(false)
 
  const [error, setError] = useState(null)

  ////////////////////////-------FIRESTORE DATABASE------------/////////////////////////////////////////////////////

  const taskCollectionRef = collection(db,"tasks")
  const q = query(taskCollectionRef)
  
  ////////////////////////-------FIRESTORE llAMO A USERS------------/////////////////////////////////////////////////////

  const UsersCollectionRef = collection(db,"users")  
  
  const getUsers = async () => {
      
    const dataUsers = await getDocs(UsersCollectionRef)
    
    setUserList(dataUsers.docs.map( (v) =>{
        return {...v.data(),id:id}

    }))

  }
  ////////////////////////-------FIRESTORE llAMO A ASSETS------------/////////////////////////////////////////////////////
  const AssetesCollectionRef = collection(db,"assets")  
  
  const getAssets= async () => {
      
    const dataAssets = await getDocs(AssetesCollectionRef)
    
    setAssetList(dataAssets.docs.map( (v) =>{
        return {...v.data(),id:id}

    }))

  }
  
  useEffect(() => {    
    
    getAssets()
    getUsers()
    onSnapshot( q, (data)=>{
      
      setIncidenceList(data.docs.map( (v)=>{
        
        return ({...v.data(), id:v.id})
     
      })
      )
    })
  }, [])

////////////////////////-------AÑADIR INCIDENCIA------------/////////////////////////////////////////////////////

  const addTask = (e) =>{
    e.preventDefault()
    setTitle("")
    setDes("")
    
    if(!stateTitle.trim() || !stateDes.trim()){
      setError("Introdueix algun valor")
      return
    }

    const data= new Date();
    const dataText = data.toString();
    
    setCreated(dataText)
    setUpdated(dataText)

    addDoc(collection(db, "tasks"), {
      createdBy:stateCreatedBy,
      title:stateTitle,
      description:stateDes,
      asset:stateAsset,
      created:created,
      updated:updated,
      asigned:stateUser,
      status:stateEstat
    });

    setError(null)
    
  }

////////////////////////-------BORRAR INCIDENCIA------------/////////////////////////////////////////////////////

  const removeTask = (id) =>{
    console.log(id)
    deleteDoc(doc(db, "tasks", id))
  }

////////////////////////-------BOTON EDITAR INCIDENCIA------------/////////////////////////////////////////////////////

  const editButon = (values) =>{
    setModModificar(true)
    
    setTitle(values.title)
    setDes(values.description)
    setUser(values.asigned)
    setAsset(values.asset)
    setId(values.id)
    setCreated(values.created)
    setEstat("Actualitzat")
  }

////////////////////////-------EDITAR INCIDENCIA------------/////////////////////////////////////////////////////

  const addEdit = (e) =>{
    
    const data2= new Date();
    const dataText2 = data2.toString();
    setUpdated(dataText2)

    e.preventDefault()
    
    setDoc(doc(db,"tasks",id),
    {
      createdBy:stateCreatedBy,
      title:stateTitle,
      description:stateDes,
      asset:stateAsset,
      created:created,
      updated:updated,
      asigned:stateUser,
      status:stateEstat
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
            modModificar? "Editar Tasca" : "Afegir Tasca"
          }
          </h4>
          <form className="form-horizontal" onSubmit={modModificar? addEdit : addTask}>
            <div className="form-group container form-container">
              <label htmlFor="titulo">Tittle</label>
              <input
                className='form-control mb-2'
                onChange={e=>setTitle(e.target.value)}
                type="text"
                placeholder='Afegir títol incidéncia'
                value={stateTitle}/>
              <label htmlFor="descripcion">Description</label>
              <input 
                className='form-control mb-2'
                onChange={e=>setDes(e.target.value)}
                type="text"
                placeholder='Afegir descripció incidéncia'
                value={stateDes}/>
              <label> Tècnic</label>
              <select className="form-select" onChange={e=>setUser(e.target.value)}>
                {
                  stateUserList.map((element, index) => {
                    return  <option key={index} value={element.name}>{element.name}</option>
                  })
      
                }
              </select>
              <label>Component Incidència</label>
              <select  className="form-select mb-3" onChange={e=>setAsset(e.target.value)}>
                  {
                    stateAssetList.map((element, index)=>{
                      return <option key={index} value ={element.model}>{element.model}</option>
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