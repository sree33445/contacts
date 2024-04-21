import React from 'react'

const Contacts = ({ singleContact, deleteContact, favToggle }) => {
  const { id, name, phone, email, fav } = singleContact;
  return (
    <div className="col">
      <div className="card shadow-sm w-100">
        <div className="card-header">
          <div className="row">
            <div className="col-6">{name}</div>
            <div className="col-2 offset-4" onClick={()=>favToggle(id)}>
              <i
                className={
                  fav
                    ? "fa-solid fa-star text-warning"
                    : "fa-regular fa-star text-warning"
                }
              ></i>
            </div>
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item">{phone}</li>
          <li className="list-group-item">{email}</li>
        </ul>
        <div className="footer">
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts