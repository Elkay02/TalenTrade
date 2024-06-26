import React, { useState, useEffect } from 'react';
import './myServices.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NewService } from '../newService/newService';

export default function MyServices({ services, id }: { services: string[], id: string }) {
  // const [service, setService] = useState('new service');
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [updatedServices, setUpdatedServices] = useState<string[]>(services);

  useEffect(() => {
    fetchServices();
  }, [showAdd, showEdit]);

  async function fetchServices() {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUpdatedServices(data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }

  async function handleDelete(index: number) {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
      };
      const response = await fetch(`http://localhost:3000/api/users/${id}/services/delete`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchServices(); // Fetch updated services after delete
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  }


  return (
    <div className='profileCopmsContainer'>
      {showAdd && <NewService isAdd={true} id={id} index={index} set={setShowAdd} />}
      {showEdit && <NewService isAdd={false} id={id} index={index} set={setShowEdit} />}
      <ul id='myServicestUl'>
        {updatedServices.map((service, index) => (
          <React.Fragment key={index}>
            <li className='myServicesIl'>
              <h4>{service}</h4>
              <div>
                <FaEdit className='myServicesIcon' onClick={() => { setShowEdit(true); setIndex(index) }} />
                <MdDelete className='myServicesIcon' onClick={() => handleDelete(index)} />
              </div>
            </li>
            <hr className='myServicesHr' />
          </React.Fragment>
        ))}
      </ul>
      {/* <input type="text" value={service} onChange={(e) => { setService(e.target.value) }} /> */}
      <button className='profileCopmsButton' onClick={() => { setShowAdd(true); setIndex(index) }} >Add New</button>
    </div>
  );
}
