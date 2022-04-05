import React, {useState,useEffect, useRef} from 'react'
import dades from '../Common/bd.json'
import Users from './Users'
import {db} from '../Common/firebase/firebase'
import { addDoc, collection, deleteDoc,serverTimestamp, doc, setDoc, query, orderBy, onSnapshot} from "firebase/firestore";



const Messages = () => {
    const {chats} = dades


    const [messages, setMessages] = useState([])
    const [edition, setEdition] = useState(false)
    const [id, setId] = useState("")
    const [error, setError] = useState(null)
    const [object, setObject] = useState({chat:chats[0].name,message:""})

    const inputMessage = useRef()

    
    //referencia a la colecció (taula no sql) del firebase
    const messageCollectionRef=collection(db,"Mensajes")


    const q=query(messageCollectionRef,orderBy('published','desc'))


    useEffect( () => {

        onSnapshot(q,(data) =>{

            setMessages(data.docs.map( (item) => {
                return {...item.data(),id:item.id}
            }))
        })
    }, [])

    const edit= (item) => {

        setEdition(true)
        object.message=item.message;
        object.chat=item.chat_id
        
        setId(item.id)

    } 

    const editMessage= (e) => {
        e.preventDefault()

        if(!object.message.trim()){
            console.log("Element buit")
            setError("Introdueix algun valor")
            return 
        }

        setDoc(doc(db,"Mensajes",id),{
            "message":object.message,
            "chat_id":object.chat,
            "author_id":1,
            "published":serverTimestamp()
        })

        setEdition(false)
        object.message=""
        setId("");
        setError(null)
    }

    const deleteMessage= (id) => {
        console.log(id)

        deleteDoc(doc(db,"Mensajes",id))

        if(edition === true){
            setEdition(false)
            object.message=""
            object.chat=chats[0].name
        } 
    }

    const addMessage = (e) => {

        e.preventDefault()

        //comprova si esta buit, trim elimina espais del davant i del derrera
        if(!object.message.trim()){
            console.log("Element buit")
            setError("Introdueix algun valor")
            return 
        }
        

        addDoc(messageCollectionRef,{
            "message":object.message,
            "chat_id":object.chat,
            "author_id":1,
            "published":serverTimestamp()
        })

        object.message=""

        inputMessage.current.focus()
        

        setError(null)

    }

    const HandleChange= ({target}) => {
        setObject({
            ...object,
            [target.name]:target.value
        })
    }

    return (

        <div className="container mt-5">
            <h1 className="text-center">
                Mensajeria
            </h1>
            <hr/>
            <div className="row">
                <div className="col-5 m-auto">
                        <h4 className="text-center">
                            {edition ? "Editar Mensaje" : "Añadir Mensaje"}   
                        </h4>
                        <form onSubmit={ edition ? editMessage : addMessage}>
                            <div className="form-group">
                                <label>Chats</label>
                                <select className="form-control mb-4" onChange={ HandleChange } name="chat" value={object.chat}>  
                                    {chats.map((value,key) => {
                                        return <option key={key} value={value.name}>{value.name}</option>
                                    })}

                                </select>
                            </div>
                            
                            <span className="text-danger">{error}</span>

                            <textarea
                                type="text" 
                                name="message"
                                ref = { inputMessage }
                                className="form-control mb-2"
                                placeholder="Ingrese Mensaje"
                                onChange={ HandleChange }
                                value={object.message}>
                            </textarea> 
                            <button  className={edition ? "btn btn-info d-block m-auto" : "btn btn-dark d-block m-auto "} type="submit">{edition ? "Editar":"Añadir"}</button>
                        </form>
                    </div>
            
                    <div className="col-10 m-auto mt-5">
                        <h4 className="text-center">Lista de Mensajes</h4>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Message</th>
                                    <th>Chat</th>
                                    <th>Author</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((value,key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{value.message}</td>
                                            <td>{value.chat_id}</td>
                                            <Users id={value.author_id}/> 
                                            <td>
                                                <button className="btn btn-sm btn-warning m-2" onClick={ () => edit(value) }>Editar</button>
                                                <button className="btn btn-sm btn-danger" onClick={ () => deleteMessage(value.id) }>Esborrar</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
       )
}


export default Messages












