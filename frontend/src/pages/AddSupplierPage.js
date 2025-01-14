import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSupplierForm from '../components/forms/AddSupplierForm';
import useData from '../hooks/loadData';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import InfoHeader from '../components/InfoHeader';
import { fetchData } from "../hooks/fetchFunction";

const AddSupplierPage = () => {
  const {id} = useParams();
  const [supplier, setSupplier] = useState([]);
  const title = id ? 'Aktualizace dodavatele' : 'Přidání dodavatele';
  const handleSupplierSave = (formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      updateData(`http://localhost:5000/update-supplier/${id}`, formData);
    } else{
      postData('http://localhost:5000/save-supplier', formData);
    }
    };

    useEffect(() => {
      const loadData = async () => {
        if (!id) return;
    
        try {
          // Načtení obrázků
          const supplier_info = await fetchData(`http://localhost:5000/get-supplier/${id}`);
          setSupplier(supplier_info);
          
        } catch (error) {
          console.error("Chyba při načítání dat:", error);
        }
      };
    
      loadData();
    }, [id]);
 

  return (
    <div className="page flex">
      <InfoHeader title={title}/>
       <AddSupplierForm onSubmit={handleSupplierSave} data = {supplier}/>
    </div>
  );
}

export default AddSupplierPage;