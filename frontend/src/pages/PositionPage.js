import '../App.css';
import '../responsive.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import useData from '../hooks/loadData';
import { postData } from '../hooks/addToDb';
import Input from '../components/inputs/input';
import Button from '../components/button';
import Select from '../components/inputs/select';
import Item from '../components/item';
import List from '../components/List';
import AlertBox from '../components/AlertBox';

function PositionPage() {
  const [formData, setFormData] = useState({
    positionName:'',
    storageId:''
  });

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  //const [positions, savePositions] = useState([]);

const savePosition =async()=>{
  console.log(formData);
  const resultMessage = await postData('http://localhost:5000/save-position', formData);
  setAlert(true);
  setAlertMessage(resultMessage.message);
}

const handleVisibility =(visible)=>{
  setAlert(visible);
}

const handleInputChange = (name, value) => {
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSelect = (selectedId) => {
  setFormData((prevData) => ({
    ...prevData,
    storageId: selectedId,
  }));
};
  
  const { data:storages, loading, error } = useData('http://localhost:5000/get-warehouses'); 
  const { data:positions } = useData('http://localhost:5000/get-positions'); 
  
  const HeaderTitles = [
    {name:'Název'},
    {name:'Akce'},
  ]
  

  return (
    <div className="page PositionPage flex">
        {alert && (<AlertBox onClick={handleVisibility} message={alertMessage}/>)}
        <div className='PositionPageHeader flex'>
        <h2>Pozice skladů</h2>
        <div className='flex positiondAdd'>
        <div className='flex positionDiv'>
        <Input placeholder={'Zadejte název pozice...'} label={'Přidat pozici'} name={'positionName'} onChange={handleInputChange}/>
        <Select data={storages} label={'Vyberte sklad'} onSelect={handleSelect}/>
        </div>
        <Button style={'button addButton'} label={'Přidat pozici'} onClick={savePosition}/>
        </div>
        </div>
        <List data={positions} type={'item'} titles={HeaderTitles}/>
    </div>
  );
}

export default PositionPage;