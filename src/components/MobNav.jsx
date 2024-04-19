import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import logo from "../assets/logo1.png"
import { motion } from 'framer-motion';

import Languageoption from './Languageoption';

import i18next from 'i18next'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const handleClick=(e)=>{
  i18next.changeLanguage(e.target.value)
}

const MobNav = ({ setisOpen }) => {
  const { t } = useTranslation();
 const address = "" ;
   
    const[wallet , setWallet] = useState("Connect Wallet");
    function extractFirstAndLastFive(address) {
        const firstFive = address.slice(0, 5);
        const lastFive = address.slice(-5);
        return firstFive + "..." + lastFive;
      }
    const links = [
        
        'Staking',
        'About',
        'RoadMap'
    ]

    let isConnect = false
    

    return (
        <div className='block md:hidden'>

            <div className='fixed inset-0 bg-black px-[20px] py-[20px]'>
                <div className='relative h-full'>
                    <div className='flex justify-between items-center'>
                   <Link to='/'> <img src={logo} className='h-[53px] ' alt="pic" /></Link>

                        <XMarkIcon
                            // onClick={() => setisOpen(false)} className='w-[35px] text-[#A06742]'
                            onClick={() => setisOpen(false)} className='w-[35px] text-white'

                        />
                    </div>
                    
                        


                    <div className='flex justify-center pt-20 '>
                        <motion.div
                            whileInView={{ scale: [0.7, 1], opacity: [0, 1] }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            initial='hidden'
                            style={{ opacity: 0 }}
                            viewport={{ once: true }}
                        >

                            <div
                                className='flex flex-col gap-[20px]'
                            >
                            <button
                
                className=" rounded-[20px] h-[50px] sm:h-[40px] w-[250px] sm:w-[160px] overflow-hidden relative group cursor-pointer border-2 font-medium text-[20px] sm:text-[15px] border-[#A06742] hover:border-white text-black duration-[900ms]"
              > <Link to="/buy">
                <span className="absolute w-64 h-0 transition-all duration-[900ms] origin-center rotate-45 -translate-x-20 bg-[#A06742] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[900ms]  group-hover:text-white ease">
                {t('buytoken','Buy Token')}
                </span>
                </Link>
              </button>
                            
                                 <button
                onClick={() => open()}
                className=" rounded-[20px] h-[50px] sm:h-[40px] w-[250px] sm:w-[160px] overflow-hidden relative group cursor-pointer border-2 font-medium text-[20px] sm:text-[15px] border-[#A06742] hover:border-white text-black duration-[900ms]"
              >
                <span className="absolute w-64 h-0 transition-all duration-[900ms] origin-center rotate-45 -translate-x-20 bg-[#A06742] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[900ms]  group-hover:text-white ease">
                  {address
                    ? `${address.substring(0, 10)}...`
                    : "Connect Wallet"}
                </span>
              </button>
            

              
                
                
            
                
               
              <select  onChange={(e)=> handleClick(e)} className=" text-center hover:bg-[#a06742] rounded-[20px] h-[50px] sm:h-[40px] w-[250px] sm:w-[160px] overflow-hidden relative group cursor-pointer border-2 font-medium text-[20px] sm:text-[15px] border-[#A06742] bg-transparent hover:border-white text-white duration-[900ms]" >
              <option className="bg-black   " value={"en"}>English</option>
      <option className="bg-black " value={"chi"}>Chinese</option>
      <option className="bg-black " value={"jap"}>Japnese</option>
      <option className="bg-black " value={"rus"}>Russian</option>
      <option className="bg-black " value={"spa"}>Spanish</option>
      <option className="bg-black " value={"ko"}>Korean</option>
      
    </select>

                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default MobNav