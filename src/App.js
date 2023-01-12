import './App.css';
import { BrowserRouter as Router  , Route ,Routes  } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import React  from 'react';
import { useState , useEffect } from 'react';
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail';
// import api from '../src/api/contacts'
import axios from 'axios';

function App() {  
// const LOCAL_STORAGE_KEY = "contacts"
 const [contacts , setContacts] = useState([]);


 //Retrive Contacts
//  const retrieveContacts = async () =>{
//   const response = await api.get("/contacts")
//   return response.data;
//  }
    const retrieveContacts = async () =>{
      const response = await axios.get("http://localhost:3006/contacts").then(()=> {})
      
      return response.data 
    }



 const addContactHandler = async (contact)=>{
  console.log(contact)
  const request = {
    id : uuid(),
    ...contact
  }
  const response =  await axios.post("http://localhost:3006/contacts", request)
  console.log(response)
  setContacts([...contacts,response.data])
 }

 const removeContactHandler = async (id) =>{
  await axios.delete(`http://localhost:3006/contacts/${id}`)
  const newContactList = contacts.filter((contact)=>{
    return contact.id !== id ;
  });

  setContacts(newContactList);
 }    




 useEffect(()=>{
  //  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //  if(retriveContacts)  setContacts(retriveContacts)
  const getAllContacts = async () => {
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
  }
  getAllContacts();
   },[]);


  // useEffect(() => {
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  return (
    <div className='ui container'>
      <Router>
      <Header/>
    
      <Routes>
      <Route path="/add"  element={<AddContact addContactHandler={addContactHandler} />} />
      <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>} />
      <Route path='/contact/:id' element={<ContactDetail/>}/>
      </Routes>
      
     
      </Router>
    </div>
  );
}

export default App;
