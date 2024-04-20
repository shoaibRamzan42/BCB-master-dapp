import React from "react";
import Navbar from "./Navbar";

import tether from "../assets/tether.svg";
import logo from "../assets/image.png"
import icon from "../assets/icon.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Buy = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />

      <h1 className="gradient-text mt-28 text-center text-[48px] font-semibold">
        {t("buycrc", "Buy CRC")}
      </h1>
      <motion.div
        initial={{ y: "50%", opacity: 0 }}
        // viewport={{ once :true,}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        whileInView={{ y: 0, opacity: 1 }}
        className=""
      >
        <div className="border-[3px]  bg-transparent border-[#A06742]  gap-4 mb-8 h-auto rounded-xl  items-center mt-4 mx-auto w-[90%] md:w-[30rem] p-4">
          <h1 className="text-[#BDBDBD] pt-2 font-medium  text-center">
            {t("price", "BUY CRC NOW BEFORE PRICE INCREASE!")}
          </h1>
          <h1 className="bg-[#a06742] mt-4 h-[1px]"></h1>

          <h2 class="text-center text-[20px] pt-5 flex-shrink-0 font-bold text-white">
            1 CRC <span class="font-medium">= $0.20</span>
          </h2>
          <h1 className="bg-[#a06742] mt-4 h-[1px]"></h1>
          <h1 className="text-[#BDBDBD] pt-4 uppercase font-medium  text-center">
            {t("purchase", "Your Purchased ")} = {0} CRC
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-8">
            <div>
              <h2 className="text-[#BDBDBD] font-normal text-[14px]">
                {t("pay", "Pay with USDT")}
              </h2>
              <div className="md:max-w-[212px] relative mt-[10px]">
                <input
                  type="number"
                  className="h-[40px] rounded-[8px] text-[#F5F5F5] placeholder:text-[#F5F5F5] placeholder:opacity-60 text-[16px] font-normal w-full outline-none pl-[16px] pr-[45px] bg-black"
                  placeholder="0"
                  style={{
                    border: "1px solid  #A06742",
                  }}
                />
                <div className="absolute bottom-0 top-0 right-[13px] flex items-center">
                  <img src={tether} alt="" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[#BDBDBD] font-normal text-[14px]">
                {t("value", "CRC Value")}
              </h2>
              <div className="md:max-w-[212px] relative mt-[10px]">
                <input
                  type="number"
                  className="h-[40px] rounded-[8px] text-[#F5F5F5] placeholder:text-[#F5F5F5] placeholder:opacity-60 text-[16px] font-normal w-full outline-none pl-[16px] pr-[45px] bg-black"
                  placeholder="0"
                  disabled
                  style={{
                    border: "1px solid  #A06742",
                  }}
                />
                <div className="absolute bottom-0 top-0 right-[13px] flex items-center">
                  <div className="flex justify-center items-center h-[20px] w-[20px] rounded-full ">
                    <img src={logo} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            style={{
              background:
                "linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)",
            }}
            className=" text-white w-full p-2 rounded-lg mt-4 "
          >
            {t("buytoken", "Buy Token")}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Buy;
