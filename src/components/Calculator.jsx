import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'



const Calculator = () => {

  const { t } = useTranslation();

  const [value, setvalue] = useState('')
  const [active, setactive] = useState('')
  const [totalValue, settotalValue] = useState(0)

  const handleClick = () => {
    if (!value || !active) return;

    let total = parseFloat(value); // Convert value to a float

    if (active === 'month') {
      total += (total * 0.01); // Add 1% of the current value
    } else if (active === 'year') {
      total += (total * 0.15); // Add 15% of the current value
    } else if (active === '3year') {
      total += (total * 0.18); // Add 18% of the current value
    }

    settotalValue(total.toFixed(2)); // Set the total value with 2 decimal places
  }


  return (<>

    <div className='py-16 font-[Roboto] mt-32 max-w-[1400px] mx-auto flex-col lg:flex-row flex items-center gap-20 justify-center px-8'>



      <div
        style={{ background: 'linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)' }} className="   text-left w-full md:w-[70%] xl:w-[42%] lg:h-[660px] xl:h-[550px] h-auto px-4 py-4  lg:py-12 lg:px-8 border border-white  rounded-[20px]   ">
        <h1 className="font-custom   text-[30px]  md:text-[40px] font-extrabold text-white">
          {t('bcbhead', 'BCB Investment')}

        </h1>
        <p className="text-white mt-4 text-[14px] md:text-[18px] leading-[25px] md:leading-[35px] font-custom">
          {t('bcbPara', 'From the start, BCB was designed to support a large number of smaller token holders, who will all participate in and benefit from the growth and development of the BCB Community. All projects and initiatives will be community-led and will result in additional value being brought into the BCB ecosystems. Everyone is welcome to join the community and help it grow!')}
        </p>
      </div>



      <div className=" px-8    bg-transparent py-12 w-full md:w-[70%] xl:w-[40%] h-auto lg:h-[660px] xl:h-[550px] rounded-[20px] border border-[#A06742] flex flex-col justify-center items-center gap-9 ">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <h1 style={{
            background: 'linear-gradient(96deg, #A06742 33.48%, #EABCAC 100.85%)',
            backgroundClip: 'text',
            webkitBackgroundClip: 'text',
            webkitTextFillColor: 'transparent'
          }} className='text-white font-bold text-[38px]'>{t('calculator','Calculator')}</h1>
          <h1 className="font-custom text-[16px] leading-[24px] text-white text-center ">
            {t('cardSubheading', ' Type current staked tokens')}
          </h1>
          <input
            type="number"
            placeholder="Enter Amount"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            className="w-[80%]  lg:w-[90%] h-[55px] md:h-[60px] flex items-center justify-center   bg-[#FFFFFF0F] rounded-[14px] text-center border-[#A06742] border text-white md:text-[32px] text-[22px] font-myfont">

          </input>
        </div>
        <div className="flex flex-row justify-between  w-full items-center gap-2 ">
          <button className={`w-[30%] py-2 px-2 text-center text-white rounded-xl border text-[10px] md:text-[17px] border-[#A06742] ${active === 'month' && 'bg-[#A06742] border-white'}`}
            onClick={() => setactive('month')}
          >1 {t('month', 'Month')}</button>
          <button className={`w-[30%] py-2 px-2 text-center text-white rounded-xl border text-[10px] md:text-[17px] border-[#A06742] focus:bg-[#a06742] focus:border-white  ${active === 'year' && 'bg-[#A06742] border-white'} `}
            onClick={() => setactive('year')}
          >1 {t('year', 'Year')}</button>
          <button className={`w-[30%] py-2 px-2 text-center text-white rounded-xl border text-[10px] md:text-[17px] border-[#A06742] focus:bg-[#a06742] focus:border-white  ${active === '3year' && 'bg-[#A06742] border-white'} `}
            onClick={() => setactive('3year')}
          >3 {t('year', 'Years')}</button>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 ">
          <button
            onClick={() => handleClick()}
            style={{ background: 'linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)' }
            } className=" md:w-[168%] text-white w-[145%] h-[55px] md:h-[58px]
       rounded-full flex   items-center justify-center font-myfont text-[20px] md:text-[24px] leading-[28px]">
            {t('cardbutton', 'Calculate')}
          </button>
          <h1 className="font-custom text-[16px] leading-[24px] text-[#FFFFFF96] text-center ">
            {t('tokenhead', 'Tokens you will get')}
          </h1>
          <h5 className="md:w-[168%]  w-[145%] h-[60px] border border-[#a06742] flex items-center justify-center   bg-transparent rounded-[14px] text-center text-white md:text-[32px] text-[28px] font-myfont">
            {totalValue}
          </h5>
        </div>
      </div>
    </div>
  </>
  )
}

export default Calculator
