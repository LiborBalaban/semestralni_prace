import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';
import { useUser } from '../../context/UserContext';

const StockForm = ({onSubmit, handleStorage}) => {
    const { data:suppliers} = useData('http://localhost:5000/get-suppliers'); 
    const { data:storages} = useData('http://localhost:5000/get-warehouses'); 
    const [formData, setFormData] = useState({
        stockSupplierId: '',
        stockDescription: '',
        stockNumber:'',
        stockStorageId:''
      });
      console.log("handleStorageId v StockPage:", handleStorage);
      const { role } = useUser();
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelectSupplier = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          stockSupplierId: selectedId,
        }));
      };

      const handleSelectStorage = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          stockStorageId: selectedId,
        }));
        
        if (handleStorage) {
          handleStorage(selectedId);  // Tento log zkontroluje, zda je funkce volána
        } else {
          console.log("handleStorage je undefined");  // Tento log by měl ukázat, jestli je funkce undefined
        }
        
      };

       

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='StockForm flex'>
        <Select data={suppliers} label={'Dodavatelé'} onSelect={handleSelectSupplier}/> 
        {role === 3 && (<Select data={storages} label={'Sklad'} onSelect={handleSelectStorage}/> )}
        <Textarea label={'Popis'} placeholder={'Popis Naskladnění'} name={'stockDescription'} onChange={handleInputChange}/>
        <Input label={'Číslo dokladu'} type={'number'} name={'stockNumber'} onChange={handleInputChange}/>
        <Button label={'Odeslat'} style={'button addButton'} onChange={handleInputChange}/>
    </form>
  );
}
export default StockForm;