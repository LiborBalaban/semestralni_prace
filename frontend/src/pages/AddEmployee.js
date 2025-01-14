import '../App.css';
import '../responsive.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AddEmployeeForm from '../components/forms/AddEmployeeForm';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';
import {useParams } from 'react-router-dom';
import InfoHeader from '../components/InfoHeader';
import { fetchData } from "../hooks/fetchFunction";

const AddEmployeePage = () => {
  const {id} = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
  
      try {
        // Načtení obrázků
        const user_info = await fetchData(`http://localhost:5000/get-user/${id}`);
        setUser(user_info);
        
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
      }
    };
  
    loadData();
  }, [id]);

  const handleAddEmployee = (formData) => {
      console.log("Data přijatá z formuláře:", formData);
      postData('http://localhost:5000/invite-employee', formData);
    };

    const title = id ? 'Aktualizace zaměstnance' : 'Přidání zaměstnance';

  return (
    <div className="page flex">
      <InfoHeader title={title}/>
     <AddEmployeeForm onSubmit={handleAddEmployee} data={user}/>   
    </div>
  );
}

export default AddEmployeePage;