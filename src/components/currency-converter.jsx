import React, { useEffect } from 'react'
import { useState } from 'react'
import Dropdown from './dropdown';
import {HiArrowsRightLeft } from "react-icons/hi2";

//currencies -> https://api.frankfurter.app/currencies
//currencies -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
const Currencyconverter=()=> {

    const [currencies, setcurrencies] = useState([])
    const [amount, setamount] = useState(1)
    const [convertedAmount, setconvertedAmount] = useState(null)
    const [converting, setconverting] = useState(false)
    const [fromCurrency, setfromCurrency] = useState("UDS")
    const [toCurrency, settoCurrency] = useState("INR")

    const fetchCurrency= async()=>{
        try {
            const res=await fetch(" https://api.frankfurter.app/currencies");
            const data= await res.json();

          setcurrencies(Object.keys(data));//to form it in array0
          
        } catch (error) {
            console.error("error",error);
            
        }
        
    };

        useEffect(() => {
         fetchCurrency();
         
        }, []);

        console.log(currencies)
    

        const convertCurrency =async ()=>{
            if(!amount) return
            setconverting(true)
            try {
                const res=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
                const data= await res.json();
    
              setconvertedAmount(data.rates[toCurrency] + " " + toCurrency)
              
            } catch (error) {
                console.error("error",error);
                
            }finally{
                setconverting(false)
            }
           
        };
    
        const handleFavorite=(currency)=>{

        }

        const swapCurrency=()=>{
            setfromCurrency(toCurrency)
            settoCurrency(fromCurrency)
        }

        
        
      
    

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
           <Dropdown currencies={currencies} title='from:'
            currency={fromCurrency}
             setCurrency={setfromCurrency}
           handleFavorite={handleFavorite} />

           {/* swapping currency*/}

           <div className='flex justify-center -mb-5 sm:mb-0'>
            <button onClick={swapCurrency} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                <HiArrowsRightLeft className='text-xl text-gray-700' />
            </button>
           </div>

           <Dropdown currencies={currencies} title='to:'
currency={toCurrency}
setCurrency={settoCurrency}
           handleFavorite={handleFavorite}/>
        </div>

        <div className='mt-4'>
            <label
            htmlFor='amount'
            className='block text-sm font-medium text-gray-700'
            > 
                Amount:
            </label>
            <input
            value={amount}
            onChange={(e)=>setamount(e.target.value)} type="number"
            className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1' />
        </div>

<div className='flex justify-end mt-6'>
    <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    ${converting?"animate-pulse":""}
    `}>Convert</button>
</div>

{convertedAmount &&( 
<div className="mt-4 text-lg font-medium text-right text-green-600">
    Converted Amount:{convertedAmount}

</div>
)}

    </div>
  )
};


export default Currencyconverter