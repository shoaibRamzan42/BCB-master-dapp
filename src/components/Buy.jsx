import React from "react";
import Navbar from "./Navbar";
import eth from "../assets/eth.svg"
import tether from "../assets/tether.svg"
import usd from "../assets/usd.svg"
import icon from "../assets/icon.png"
import { useTranslation } from "react-i18next";
const Buy = () => {

    const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <h1 className="gradient-text mt-28 text-center text-[48px] font-semibold">{t("buycrc", "Buy CRC")}</h1>
      <div className="border-[3px]  bg-transparent border-[#A06742]  gap-4 mb-8 h-auto rounded-xl  items-center mt-4 mx-auto w-[90%] md:w-[23rem] p-4">
      
        <h1 className="text-[#BDBDBD] pt-2 font-medium  text-center">
        {t('price','BUY CRC NOW BEFORE PRICE INCREASE!')}
        </h1>
        <h1 className="bg-[#a06742] mt-4 h-[1px]"></h1>
        <div className="flex justify-center mt-4  items-center gap-2">
          <h1 className="text-[#BDBDBD] font-medium">{t("Refer", "My Refferal link")} </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            class="text-[#BDBDBD]  h-[20px] cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
            ></path>
          </svg>
        </div>

       
          
          <h2 class="text-center text-[20px] flex-shrink-0 font-bold text-white">
            1 CRC <span class="font-medium">= $0.20</span>
          </h2>
        <h1 className="bg-[#a06742] mt-4 h-[1px]"></h1>
          

        <div className='grid grid-cols-3 gap-[20px] mt-8'>
                                <button className='h-[40px] border-[#A06742] bg-transparent border  p-2 rounded-[8px] cursor-pointer flex justify-center items-center gap-[8px] focus:bg-[#A06742] focus:border-white'
                                   
                                    
                                >
                                    <img src={eth} alt="" />
                                    <h2 className='text-[#F2F2F2] font-bold text-[16px]'>
                                        ETH
                                    </h2>
                                </button>
                                <button className='h-[40px] p-2 border-[#A06742] bg-transparent border rounded-[8px] cursor-pointer flex justify-center items-center gap-[8px] focus:bg-[#A06742] focus:border-white '
                                    
                                   
                                >
                                    <img src={tether} alt="" />
                                    <h2 className='text-[#F2F2F2] font-bold text-[16px]'>
                                        USDT
                                    </h2>
                                </button>
                                <button className='h-[40px] p-2 rounded-[8px] cursor-pointer flex justify-center items-center border-[#A06742] bg-transparent border gap-[8px] focus:bg-[#A06742] focus:border-white'
                                   
                                    
                                >
                                    <img src={usd} alt="" />
                                    <h2 className='text-[#F2F2F2] font-bold text-[16px]'>
                                        USDC
                                    </h2>
                                </button>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-8'>

<div>
    <h2 className='text-[#BDBDBD] font-normal text-[14px]'>
         {t('pay','Pay with ETH')} 
    </h2>
    <div className='md:max-w-[212px] relative mt-[10px]'>
        <input type="number"
            className='h-[40px] rounded-[8px] text-[#F5F5F5] placeholder:text-[#F5F5F5] placeholder:opacity-60 text-[16px] font-normal w-full outline-none pl-[16px] pr-[45px] bg-black'
            placeholder='0'
            
           
            style={{
                border: '1px solid  #A06742',
            }}
        />
        <div className='absolute bottom-0 top-0 right-[13px] flex items-center'>
            <img src={ usd} alt="" />
        </div>
    </div>
</div>

<div>
    <h2 className='text-[#BDBDBD] font-normal text-[14px]'>
         {t('value','CRC Value')}
    </h2>
    <div className='md:max-w-[212px] relative mt-[10px]'>
        <input type="number"
            className='h-[40px] rounded-[8px] text-[#F5F5F5] placeholder:text-[#F5F5F5] placeholder:opacity-60 text-[16px] font-normal w-full outline-none pl-[16px] pr-[45px] bg-black'
            placeholder='0'
            disabled
            
            style={{
                border: '1px solid  #A06742',
            }}
        />
        <div className='absolute bottom-0 top-0 right-[13px] flex items-center'>
            <div className='flex justify-center items-center h-[20px] w-[20px] rounded-full bg-[#219653]'>
                <img src={icon} alt="" />
            </div>
        </div>
    </div>
</div>
</div>

<button
           
            style={{ background: 'linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)' }
            } className=" text-white w-full p-2 rounded-lg mt-4 ">
           {t('buytoken','Buy Token')}
          </button>

      </div>
    </>
  );
};

export default Buy;
