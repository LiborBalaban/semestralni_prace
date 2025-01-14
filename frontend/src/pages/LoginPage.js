import '../App.css';
import '../responsive.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import LoginForm from '../components/forms/LoginForm';
import { postData } from '../hooks/addToDb';
import useCustomNavigate from '../hooks/navigate';
import AlertBox from '../components/AlertBox';

const LoginPage =()=> {
const [alert, setAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const { goTo } = useCustomNavigate();
const { loginUser } = useUser(); 

const handlePageRegistration = ()=>{
  goTo('/singup');
}


const handleLogin = async (formData) => {
  try {
    const result = await postData('http://localhost:5000/login-user', formData);
    goTo('/fullapp');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setAlert(true);
      setAlertMessage(error.response.data.message);
    } else {
      setAlert(true);
      setAlertMessage('Nastala neočekávaná chyba.');
    }
  }
}

const handleVisibility =(visible)=>{
  setAlert(visible);
}
  
/*
  const resetPassword = async () => {
    try {
      if (email === "") {
        alert("Vyplňte email a zkuste to znovu");
      } else {
        const response = await axios.post('http://localhost:5000/send-resetpassword-email', {
          email: email
        });
        console.log(response.data.msg);
        alert(response.data.msg);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };*/

  
  return (
    <div className="LoginPage flex">
       {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/> )}
        <div className='LoginDiv flex'>
            <h2>Přihlašte se</h2>
            <LoginForm onSubmit={handleLogin}/>
            <p>Pokud ještě nemáte založený účet, tak klikěte na</p>
            <span onClick={()=>handlePageRegistration()} className='formLink'>Zaregistrovat účet</span>
        </div>
    </div>
  );
}

export default LoginPage;