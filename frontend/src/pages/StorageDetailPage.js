import '../App.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';
import AddWarehouseForm from '../components/forms/AddWarehouseForm';
import { fetchData } from "../hooks/fetchFunction";
import InfoHeader from '../components/InfoHeader';

const StorageDetailPage = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState([]);
  const title = id ? 'Aktualizace skladu' : 'Přidání skladu';

  const handleAddWarehouse = (formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      updateData(`http://localhost:5000/update-warehouse/${id}`, formData);
    } else{
      postData('http://localhost:5000/save-warehouse', formData);
    }
    };

    useEffect(() => {
      const loadData = async () => {
        if (!id) return;
    
        try {
          // Načtení obrázků
          const warehouse_info = await fetchData(`http://localhost:5000/get-warehouse/${id}`);
          setWarehouse(warehouse_info);
          
        } catch (error) {
          console.error("Chyba při načítání dat:", error);
        }
      };
    
      loadData();
    }, [id]);

  return (
    <div className="page flex">
       <InfoHeader title={title}/>
        <AddWarehouseForm onSubmit={handleAddWarehouse} data = {warehouse}/>
    </div>
  );
}

export default StorageDetailPage;