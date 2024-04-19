import React from "react";

const Languageoption = (props) => {
  return (
    <select onChange={props.onChange} className=" text-center hover:bg-[#a06742] rounded-[20px] h-[37px] sm:h-[40px] w-[125px] sm:w-[160px] overflow-hidden relative group cursor-pointer border-2 font-medium text-[12px] sm:text-[15px] border-[#A06742] bg-transparent hover:border-white text-white duration-[900ms]" >
      {/* <option className="bg-black   " value={"en"}>English</option>
      <option className="bg-black " value={"chi"}>Chinese</option>
      <option className="bg-black " value={"jap"}>Japnese</option> */}
      {/* <option className="bg-black " value={"rus"}>Russian</option>
      <option className="bg-black " value={"spa"}>Spanish</option>
      <option className="bg-black " value={"ko"}>Korean</option> */}
           <option className="bg-black    " value={"en"}>English</option>
      <option className="bg-black  " value={"chi"}>Chinese</option>
      <option className="bg-black  " value={"jap"}>Japnese</option>
      <option className="bg-black  " value={"rus"}>Russian</option>
      <option className="bg-black  " value={"spa"}>Spanish</option>
      <option className="bg-black  " value={"ko"}>Korean</option>
      
    </select>
  );
};

export default Languageoption;
