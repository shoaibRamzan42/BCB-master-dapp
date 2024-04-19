import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import logo from "../assets/logo1.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Languageoption from './Languageoption'

   





const Nav = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  

  return (
    <nav>
      <div className={` py-[10px]`}>
        <div className="max-w-[1400px] px-[20px] sm:px-[40px] mx-auto  ">
          <div className="flex justify-between items-center">
            <img src={logo} alt="" className="h-[50px] sm:h-[80px]" />
            <div className="flex items-center justify-center gap-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
