import '../App.css';
import React, { useState } from "react";
import Input from './inputs/input';
import Select from './inputs/select';

const StockProduct = ({name, id, code, updatePosition, handleQuantity, data, handlePice}) => {
  
  const handleSelectChange = (selectedId) => {
    updatePosition(id, selectedId);
  };
  
  return (
       <div className="item">
         <div className='checkbox-input'>
        <Input type={'checkbox'}/>
        </div>
            <h2 className='stockName'>{name}</h2>
            <span className='stockInfo'>{code}</span>
            <div className='item_inputs'>
            <input type="text" placeholder='0' onChange={(e)=>handleQuantity(id ,e.target.value)}/>
            <input type="text" placeholder='0' onChange={(e)=>handlePice(id, e.target.value)}/> 
            <Select onSelect={handleSelectChange} data={data}/>
            </div>
        </div>  
  );
};

export default StockProduct;