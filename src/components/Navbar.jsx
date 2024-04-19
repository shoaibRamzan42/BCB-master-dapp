import React, { useEffect, useState } from 'react'
import logo from "../assets/logo1.png";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import MobNav from './MobNav'
import Languageoption from './Languageoption';
// import Web3 from 'web3';
// import { useWeb3Modal } from '@web3modal/wagmi/react'
// import { useAccount, useDisconnect } from 'wagmi'

import i18next from 'i18next'
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const handleClick=(e)=>{
  i18next.changeLanguage(e.target.value)
}

const Navbar = () => {
    const { t } = useTranslation();
    const { open } = useWeb3Modal()
    const { address } = useAccount()
    // const { disconnect } = useDisconnect()
    // const address = "";
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

    const [isOpen, setisOpen] = useState(false)
    const [scrolled, setScrolled] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 60) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // const connectWallet = async () => {
    //     // if (window.ethereum) {
    //       window.web3 = new Web3(window.ethereum);
    //       await window.ethereum.enable();
    //     //  await web3.eth.net.setId(networkid);
    //       const accounts = await window.web3 .eth.getAccounts();
    //       // changeNetwork();
    //       const account = accounts[0];
    //       setWallet(account.slice(0,4) + "..." + account.slice(-4));
    //       // setmyReferral("https://cryptoindexpool.com/?ref=" + account); 
    //       // setRef(account);
      
    //       console.log(account);
          
    // }


    return (
        <div>
            <div className={`fixed top-0 left-0 right-0 z-40 ${scrolled  ? "bg-black" : "bg-transparent"}`}>
                <div className='flex items-center justify-between  md:gap-1 lg:gap-4 max-w-screen-xl mx-auto px-[20px] py-4 md:py-3'>
                   <Link to='/'> <img src={logo} className='h-[53px]' alt="pic" /></Link>
                   

                        
                    
                    
                    <div className='hidden md:flex gap-4 relative '>
                    <button
                
                className=" rounded-[20px] h-[37px] sm:h-[40px] w-[125px] sm:w-[160px] overflow-hidden relative group cursor-pointer border-2 font-medium text-[12px] sm:text-[15px] border-[#A06742] hover:border-white text-black duration-[900ms]"
              >
              <Link  to="/buy">
                <span className="absolute w-64 h-0 transition-all duration-[900ms] origin-center rotate-45 -translate-x-20 bg-[#A06742] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[900ms]  group-hover:text-white ease">
                {t('buytoken','Buy Token')}
                </span>
                </Link>
              </button>
                    <button
                onClick={() => open()}
                className=" rounded-[20px] h-[37px] sm:h-[40px] w-[125px] sm:w-[160px] overflow-hidden relative group cursor-pointer border-2 font-medium text-[12px] sm:text-[15px] border-[#A06742] hover:border-white text-black duration-[900ms]"
              >
                <span className="absolute w-64 h-0 transition-all duration-[900ms] origin-center rotate-45 -translate-x-20 bg-[#A06742] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-white transition duration-[900ms]  group-hover:text-white ease">
                  {address
                    ? `${address.substring(0, 10)}...`
                    : "Connect Wallet"}
                </span>
              </button>

              
                
                
            
                
               
                <Languageoption onChange={(e)=> handleClick(e)}/>
                    </div>
                    <div className='md:hidden flex'>
                        <div className="cursor-pointer" onClick={() => setisOpen(true)} >
                            <Bars3BottomRightIcon
                                className={`h-[35px] text-white transition-all duration-1000 ease-in-out `}
                            />
                        </div>


                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='fixed inset-0 z-50 h-screen bg-black' >
                    <MobNav setisOpen={setisOpen} />
                </div>
            )}
        </div>
    )
}

export default Navbar