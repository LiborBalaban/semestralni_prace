import '../App.css';
import '../responsive.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SingUpForm from '../components/forms/SingUpForm';
import { postData } from '../hooks/addToDb';
import useCustomNavigate from '../hooks/navigate';

const SingupPage = () => {
  const { goTo } = useCustomNavigate();
  const handlePageRegistration = ()=>{
    goTo('/login');
  }
  const handleSingUp = (formData) => {
        postData('http://localhost:5000/save-user', formData);
      };

  return (
    <div className="LoginPage flex">
        <div className='LoginDiv flex'>
            <h2>Založte si účet</h2>
            <SingUpForm onSubmit={handleSingUp}/>
            <p>Pokud již máte založený účet, tak klikěte na</p>
            <span onClick={()=>handlePageRegistration()} className='formLink'>Přihlásit se</span>
        </div>
    </div>
  );
}

export default SingupPage;