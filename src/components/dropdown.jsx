import React from 'react'
import { HiMiniStar } from "react-icons/hi2";

const Dropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title=""
}) => {
  return (
    <div>
      <label htmlFor={title}
      className='block text-sm font-medium text-gray-700'
      >{title}</label>

      <div className='mt-1 relative'>
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className='w-[130px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
          {/* render favorites*/}

          <hr />
          {currencies.map((currency)=>{
         return(
         <option value={currency} key={currency}>{currency}</option>
        )
          })}
        </select>

        <button onClick={()=>handleFavorite(currency)} className=' h-[32px] w-[50px] mt-1 absolute inset-y-0 right-8 pr-5 flex items-center text-sm leading-5'>
          <HiMiniStar />
        </button>
      </div>
      
    </div>
  )
}

export default Dropdown
