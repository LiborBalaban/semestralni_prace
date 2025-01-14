import '../App.css';
import React, { useState, useEffect } from "react";
import StockProduct from '../components/StockProduct';
import { useNavigate } from 'react-router-dom';
import AutoCompleteInput from '../components/inputs/AutoCompleteInput';
import useData from '../hooks/loadData';
import StockForm from '../components/forms/StockForm';
import { postData } from '../hooks/addToDb';
import Button from '../components/button';
import List from '../components/List';
import { fetchData } from '../hooks/fetchFunction';
import { useUser } from '../context/UserContext';
import AlertBox from '../components/AlertBox';

const StockPage = () => {
    const [products, setProducts] = useState([]);
    const { data: all_products, loading, error } = useData('http://localhost:5000/get-products');
    const today = new Date();
    const { role } = useUser();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const [positions, setPositions] = useState([]);
    const [storageId, setStorageId] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const loadPositions = async () => {
          try {
            if (!storageId && role !== 4) return; // Kontrola, zda má smysl volat API
      
            if (role === 4) {
              const positions_employee = await fetchData(`http://localhost:5000/get-storage-positions`);
              setPositions(positions_employee);
            } else if(storageId){
              const positions_storage = await fetchData(`http://localhost:5000/get-storage-positions/${storageId}`);
              setPositions(positions_storage);
            }
          } catch (error) {
            console.error("Chyba při načítání pozic:", error);
          }
        };
      
        loadPositions();
      }, [storageId, role]);

    const HeaderTitles = [
        {name:'Název'},
        {name:'Kód'},
        {name:'Množství: ks'},
        {name:'Cena: Kč'},
        {name:'Umístění'},
      ]

      const handleVisibility =(visible)=>{
        setAlert(visible);
        //goTo('/admin/categories');
      }
    // Přidání nebo aktualizace produktu v seznamu
    const getId = (productId) => {
        setProducts((prevProducts) => {
            const exists = prevProducts.some((product) => product.id === productId);
            if (exists) {
                return prevProducts;
            } else {
                return [...prevProducts, { id: productId, quantity: 1, price: 0 }];
            }
        });
    };

    const updatePrice = (id, value) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, price: value } : product
            )
        );
    };

    const updateQunatity = (id, value) => {
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product.id === id ? { ...product, quantity: value } : product
          )
      );
  };

  const updatePosition = (id, value) => {
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            product.id === id ? { ...product, positionId: value} : product
        )
    );
};

    const selectedProducts = products.map((product) => {
        const productData = all_products.find((p) => p.id === product.id);
        return { ...product, ...productData };
    });

    const handleStorage =(id)=> {
        console.log("Ukládám ID do useState:", id); 
        setStorageId(id);
      };

    const handleStock = async(formData) => {
        console.log("Data přijatá z formuláře:", formData);
        const payload = {
            stockDetails: formData,
            typeMovement : 1,
            products: products
        };
        console.log(payload);
        const result = await postData('http://localhost:5000/save-stock', payload);
        setAlert(true);
        setAlertMessage(result.message);
      };


    return (
        <div className="page">
            {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/>)}
            <div className='page-header'>
                <h2>Produkty</h2>
            </div>
            <div className='StockPageNav'>
                <div className='flex stockHeader'>
                    <span>{"Dnešní datum: " + formattedDate}</span>
                    <span>Naskladnění</span>
                </div>
            </div>
            <div className='flex StorckProductsEdit'>
                <div className='StockProducts flex'>
                    <div className='flex buttonFlex' >
                    <AutoCompleteInput data={all_products} onClick={getId} />
                    <Button label={'Požádat o přidání'} style={'button addButton'}/>
                    </div>
                    
                    <h2>Vybrané produkty: {products.length}</h2>
                    <List type={'stock'} data={selectedProducts} titles={HeaderTitles} handlePice={updatePrice} handleQuantity={updateQunatity} updatePosition={updatePosition} positions={positions}/>
                </div>
                <StockForm onSubmit={handleStock} handleStorage={handleStorage}/>
            </div>
        </div>
    );
};

export default StockPage;