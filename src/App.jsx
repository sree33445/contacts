import { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import {  Route, Routes } from "react-router-dom";
const url ="http://localhost:3002/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(()=>{
    const getContacts = async ()=>{
      const contactsFromServer = await fetchContact();
      setContacts(contactsFromServer);
    }
    getContacts();
  },[]);

  const formSub = async (data) => {
    console.log(data);
 const res = await fetch(url, {
  method:"POST",
  headers:{"Content-type":"application/json"},
  body:JSON.stringify(data)
 });
    
 const resultData = await res.json();
    setContacts([...contacts, resultData]);
  };

  const fetchContact=async()=>{
    const res= await fetch(url)
    const data = await res.json();
    return data;
  }

  const deleteContact = async (id) => {
    const res = await fetch(`http://localhost:3002/contacts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      let newContacts = contacts.filter((singleContact) => {
        return singleContact.id !== id;
      });
      setContacts(newContacts);
    }
  };
  async function getContact(id) {
    const res = await fetch(`http://localhost:3002/contacts/${id}`);
    const data = await res.json();
    return data;
  }


  const favToggle = async (id) => {
    const singlCon = await getContact(id);
    const updatedFav = { ...singlCon, fav: !singlCon.fav };

    const res = await fetch(`http://localhost:3002/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedFav),
    });
    if (res.status === 200) {
      let newContact = contacts.map((singleContact) => {
        return singleContact.id === id
          ? { ...singleContact, fav: !singleContact.fav }
          : singleContact;
      });
      setContacts(newContact);
    }
  };


  return (
    <div>
      <Navigation />
      {/* <ul>
      <Link to="/">Home</Link>
      <Link to="favorites">Favorites</Link>
     </ul> */}
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                formSub={formSub}
                contacts={contacts}
                deleteContact={deleteContact}
                favToggle={favToggle}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorites
                contacts={contacts}
                deleteContact={deleteContact}
                favToggle={favToggle}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
