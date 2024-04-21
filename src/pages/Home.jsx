import React from "react";
import Contacts from "../components/Contacts";
import Form from "../components/Form";

const Home = ({ formSub, contacts, deleteContact, favToggle }) => {
  return (
    <div className="container">
      <div className="row justify-content-sm-center">
        <Form formSub={formSub} />
      </div>
      <div className="row row-cols-1 row-col-sm-2 row-cols-md-3">
        {contacts.map((singleContact) => {
          return (
            <Contacts
              key={singleContact.id}
              singleContact={singleContact}
              deleteContact={deleteContact}
              favToggle={favToggle}
            />
          );
        })}
        {contacts.length === 0 ? (<h3>No contacts to show</h3>) :( "")}
      </div>
    </div>
  );
};

export default Home;
