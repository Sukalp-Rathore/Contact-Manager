import './App.css';
import { BrowserRouter as Router  , Route ,Routes  } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import React , {useState,useEffect} from 'react';
import Header from './components/Header'
import AddContact from './components/AddContact'
import ContactList from './components/ContactList'


function App() {  
const LOCAL_STORAGE_KEY = "contacts"
 const [contacts , setContacts] =useState([]);

 const addContactHandler = (contact)=>{
  console.log(contact)
  setContacts([...contacts,{id:uuid(), ...contact}])
 }

 const removeContactHandler = (id) =>{
  const newContactList = contacts.filter((contact)=>{
    return contact.id !== id ;
  });

  setContacts(newContactList);
 }




 useEffect(()=>{
   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
   if(retriveContacts)  setContacts(retriveContacts)
   },[]);


 useEffect(()=>{
localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
 },[contacts]);

  return (
    <div className='ui container'>
      <Router>
      <Header/>
    
      <Routes>
      <Route path="/add"  element={<AddContact addContactHandler={addContactHandler} />} />
      <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler}/>} />
      </Routes>
      
      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
