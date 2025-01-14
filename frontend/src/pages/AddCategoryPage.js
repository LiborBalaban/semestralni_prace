import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import AddCategoryForm from '../components/forms/AddCategoryForm';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';
import InfoHeader from '../components/InfoHeader';
import AlertBox from '../components/AlertBox';
import useCustomNavigate from '../hooks/navigate';
import { fetchData } from "../hooks/fetchFunction";


const AddCategoryPage = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [category, setCategory] = useState('');
  const {id} = useParams();
  const { goTo } = useCustomNavigate(); 


  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
  
      try {
        // Načtení obrázků
        const category_info = await fetchData(`http://localhost:5000/get-category/${id}`);
        setCategory(category_info);
        
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
      }
    };
  
    loadData();
  }, [id]);
  

  const handleAddCategory = async(formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      const resultMessage = await updateData(`http://localhost:5000/update-category/${id}`, formData);
      setAlert(true);
      setAlertMessage(resultMessage);
    } else{
      const result = await postData('http://localhost:5000/save-category', formData);
      setAlert(true);
      setAlertMessage(result);
    }
  };

  const handleVisibility =(visible)=>{
    setAlert(visible);
    goTo('/admin/categories');
  }
 
  return (
    <div className="page flex">
    {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/> )}
    <InfoHeader title={'Přidání kategorie'}/>
    <AddCategoryForm onSubmit={handleAddCategory} data={category}/>       
    </div>
  );
}

export default AddCategoryPage;