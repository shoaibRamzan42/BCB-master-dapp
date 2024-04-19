import { useState, useEffect } from "react";
import dayjs from "dayjs";
import zIndex from "@mui/material/styles/zIndex";
import { useAccount } from "wagmi";
import { prepareWriteContract, waitForTransaction, writeContract } from "wagmi/actions";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Table = ({ investlen, Info }) => {
    const [loading, setLoading] = useState("none");

    
    console.log(investlen);
    const { t } = useTranslation();

    const tableHead = [t('serial'), t('start-time'), t('end-time'), t('token-amount'), t('Pending-Rewards'), t('action')]

    const [showIndex, setsetshowIndex] = useState()
    const { address } = useAccount()

    const withdra = async (valu) => {


        if (address) {

            var contractaddress = "0x01081A86Bd237267F71dAaC819ecaDEb9Db4E52B"; // Contract Address
            var abi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_wBtc","type":"address"},{"internalType":"bool","name":"_started","type":"bool"},{"internalType":"address","name":"_wbtcPriceFeed","type":"address"},{"internalType":"address","name":"_ethPriceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"returnPer","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RefRewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"addReferee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_apy","type":"uint256"}],"name":"changeAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedRefRewards","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getRefRewards","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_rewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReferInfo","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_levels","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getReferees","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWbtcPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"hasStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"investor","type":"address"}],"name":"investorOrderIds","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"},{"internalType":"uint256","name":"starttime","type":"uint256"},{"internalType":"uint256","name":"endtime","type":"uint256"},{"internalType":"uint256","name":"claimedReward","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pooldata","outputs":[{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referInfo","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setCRCPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lockupDuration","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakersPlan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"started","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"toggleStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalRewardEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardsDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"payaddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"referred","type":"bool"},{"internalType":"address","name":"referred_by","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wBtc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
            setLoading("block");

            const { request } = await prepareWriteContract({
                address: contractaddress,
                abi: abi,
                functionName: 'emergencyWithdraw',
                args: [valu],
            })
            const { hash } = await writeContract(request)

            await waitForTransaction({
                hash,
                confirmations: 1
            })

            Info()

        }

    }

    const withdraw = async (valu) => {

        try{

     

        const today = new Date();
        // Check if today is Saturday (6) or Sunday (0)
        if (today.getDay() === 6 || today.getDay() === 0) {
            toast.success('Action only allowed in working days', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastClassName: "rounded-lg",
                className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
                style: { borderRadius: '15px' },
            });
            return
        }

        if (address) {


            var contractaddress = "0x01081A86Bd237267F71dAaC819ecaDEb9Db4E52B"; // Contract Address
    var abi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_wBtc","type":"address"},{"internalType":"bool","name":"_started","type":"bool"},{"internalType":"address","name":"_wbtcPriceFeed","type":"address"},{"internalType":"address","name":"_ethPriceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"returnPer","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RefRewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"addReferee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_apy","type":"uint256"}],"name":"changeAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedRefRewards","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getRefRewards","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_rewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReferInfo","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_levels","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getReferees","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWbtcPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"hasStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"investor","type":"address"}],"name":"investorOrderIds","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"},{"internalType":"uint256","name":"starttime","type":"uint256"},{"internalType":"uint256","name":"endtime","type":"uint256"},{"internalType":"uint256","name":"claimedReward","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pooldata","outputs":[{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referInfo","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setCRCPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lockupDuration","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakersPlan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"started","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"toggleStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalRewardEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardsDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"payaddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"referred","type":"bool"},{"internalType":"address","name":"referred_by","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wBtc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
    setLoading("block");

    const { request } = await prepareWriteContract({            
    address: contractaddress,
                abi: abi,
                functionName: 'unstake',
                args: [valu],
            })
            const { hash } = await writeContract(request)

            await waitForTransaction({
                hash,
                confirmations: 1
            })

            Info()

        }
        setLoading("false");
    }catch(error){
        setLoading("false");


    }

    }

    const dailyewithdraBTC = async (valu) => {

        try{

        

        const today = new Date();

        // Check if today is Saturday (6) or Sunday (0)
        if (today.getDay() === 6 || today.getDay() === 0) {
            toast.success('Action only allowed in working days', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastClassName: "rounded-lg",
                className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
                style: { borderRadius: '15px' },
            });
            return
        }

        if (address) {



            var contractaddress = "0x01081A86Bd237267F71dAaC819ecaDEb9Db4E52B"; // Contract Address
            var abi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_wBtc","type":"address"},{"internalType":"bool","name":"_started","type":"bool"},{"internalType":"address","name":"_wbtcPriceFeed","type":"address"},{"internalType":"address","name":"_ethPriceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"returnPer","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RefRewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"addReferee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_apy","type":"uint256"}],"name":"changeAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedRefRewards","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getRefRewards","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_rewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReferInfo","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_levels","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getReferees","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWbtcPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"hasStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"investor","type":"address"}],"name":"investorOrderIds","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"},{"internalType":"uint256","name":"starttime","type":"uint256"},{"internalType":"uint256","name":"endtime","type":"uint256"},{"internalType":"uint256","name":"claimedReward","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pooldata","outputs":[{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referInfo","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setCRCPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lockupDuration","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakersPlan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"started","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"toggleStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalRewardEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardsDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"payaddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"referred","type":"bool"},{"internalType":"address","name":"referred_by","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wBtc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
            setLoading("block");
            const { request } = await prepareWriteContract({
                address: contractaddress,
                abi: abi,
                functionName: 'claimRewardsInWBTC',
                args: [valu],
            })
            const { hash } = await writeContract(request)

            await waitForTransaction({
                hash,
                confirmations: 1
            })

            Info()
        }
        setLoading("false");
    }catch(error){
        setLoading("false");


    }

    }

    const dailyewithdraETH = async (valu) => {
try{



        const today = new Date();

        // Check if today is Saturday (6) or Sunday (0)
        if (today.getDay() === 6 || today.getDay() === 0) {
            toast.success('Action only allowed in working days', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastClassName: "rounded-lg",
                className: 'text-[16px] mt-[75px] mx-auto md:mt-0 w-[320px] h-full rounded-md relative z-50',
                style: { borderRadius: '15px' },
            });
            return
        }


        if (address) {



            var contractaddress = "0x01081A86Bd237267F71dAaC819ecaDEb9Db4E52B"; // Contract Address
            var abi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_wBtc","type":"address"},{"internalType":"bool","name":"_started","type":"bool"},{"internalType":"address","name":"_wbtcPriceFeed","type":"address"},{"internalType":"address","name":"_ethPriceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"returnPer","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RefRewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"addReferee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_apy","type":"uint256"}],"name":"changeAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedRefRewards","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getRefRewards","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_rewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReferInfo","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_levels","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getReferees","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWbtcPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"hasStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"investor","type":"address"}],"name":"investorOrderIds","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"},{"internalType":"uint256","name":"starttime","type":"uint256"},{"internalType":"uint256","name":"endtime","type":"uint256"},{"internalType":"uint256","name":"claimedReward","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pooldata","outputs":[{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referInfo","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setCRCPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lockupDuration","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakersPlan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"started","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"toggleStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalRewardEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardsDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"payaddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"referred","type":"bool"},{"internalType":"address","name":"referred_by","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wBtc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
            setLoading("block");
            const { request } = await prepareWriteContract({
                address: contractaddress,
                abi: abi,
                functionName: 'claimRewardsInETH',
                args: [valu],
            })
            const { hash } = await writeContract(request)

            await waitForTransaction({
                hash,
                confirmations: 1
            })

            Info()
        }
        setLoading("false");
    } catch(error){
        setLoading("false");


    }

    }

    const handleOpenDropDown = (index) => {
        if (showIndex >= 0) {
            setsetshowIndex()
        } else {
            setsetshowIndex(index)
        }
    }

    const [isSmallDevice, setIsSmallDevice] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Define your breakpoint here

        // Check if the viewport matches the media query
        const handleMediaQueryChange = (event) => {
            setIsSmallDevice(event.matches);
        };

        // Initial check
        handleMediaQueryChange(mediaQuery);

        // Add an event listener for changes in viewport size
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Clean up the event listener when the component unmounts
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    console.log(investlen)

    return (
        <div>
            {loading === "block" && (
        <div className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.2)] w-[100vw] h-[100vh] flex justify-center items-center">
          <div>
            <CircularProgress sx={{ color: "#0dbe4f" }} size={80} />
          </div>
        </div>
      )}

            <ToastContainer />

            <div className='w-full md:w-[95%] lg:w-[1024px] mx-auto'>
                <div className='flex flex-col items-center w-full p-[15px] rounded-[10px]'
                    style={{
                        border: '1px solid rgba(217, 217, 217, 0.50)',
                        boxShadow: '0px 0px 4px 0px #D9D9D9',
                        background: 'rgba(0, 0, 0,0.9)'

                    }}
                >
                    <div className={`relative rounded-[10px] w-full overflow-x-auto  max-h-[400px] md:max-h-[600px]`}

                    >

                        <table className="min-w-[800px] w-full">
                            <thead className="text-[14px] font-medium text-[#87909C]" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                                <tr className='border-b-[0.5px] border-gray-700'>
                                    {tableHead.map((item, i) => (
                                        <th scope="col" className={`py-[16px] px-[30px] text-center`} key={i}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                                {investlen && investlen.length > 0 && investlen.map((item, i) => (
                                    <tr
                                        key={i}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.04)'
                                        }}
                                    >
                                        <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                            {i + 1}
                                        </td>
                                        <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                            {item.start &&
                                                dayjs
                                                    .unix(parseInt(item.start.toString()))
                                                    .format("ddd, DD MMM YYYY HH:mm A")}
                                        </td>

                                        <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                            {item.end &&
                                                dayjs
                                                    .unix(parseInt(item.end.toString()))
                                                    .format("ddd, DD MMM YYYY HH:mm A")}
                                        </td>
                                        <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                            {(((Number(item.amount)) / 10 ** 18) / 2).toFixed(3)}
                                        </td>
                                        <td className="text-white text-center py-[15px] text-[16px] font-medium">
                                            {(((Number(item.pending)) / 10 ** 18) / 2).toFixed(8)}
                                        </td>

                                        <td className="text-white text-center py-[15px] text-[16px] font-medium">

                                            <div className='relative flex justify-center'
                                            >
                                                <button

                                                    data-dropdown-toggle="dropdown"
                                                    className="w-[95px] h-[33px] rounded-[12px] text-white flex ml-[-13px] items-center justify-center text-[12px] font-medium"
                                                    type="button"
                                                    style={{
                                                        background: 'linear-gradient(96deg, #A06742 30.48%, #EABCAC 120.85%)'
                                                    }}
                                                    onClick={() => handleOpenDropDown(i)}
                                                >
                                                    Actions
                                                    <svg className="w-[8px] h-[8px] ml-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                    </svg>
                                                </button>
                                                {showIndex === i && (
                                                    <div style={{ zIndex: "1" }} className="absolute z-10 top-[40px] right-0 lg:right-[28px] bg-slate-900 rounded-[12px] w-[190px]"
                                                    >
                                                        <div className="p-[15px] space-y-[15px]">
                                                            <button
                                                                onClick={() => withdraw(item.orderIds)}
                                                                className='text-[13px] text-white h-[30px] border border-[#A06742]  w-full rounded-[10px]'

                                                            >
                                                                Unstake
                                                            </button>
                                                            <button
                                                                onClick={() => dailyewithdraETH(item.orderIds)}
                                                                className='text-[13px] text-white h-[30px] border border-[#A06742]   w-full rounded-[10px]'

                                                            >
                                                                Withdraw Reward in ETH
                                                            </button>

                                                            <button
                                                                onClick={() => dailyewithdraBTC(item.orderIds)}
                                                                className='text-[13px] text-white h-[30px] border border-[#A06742]   w-full rounded-[10px]'

                                                            >
                                                                Withdraw Reward in WBTC
                                                            </button>



                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                ))}

                                <tr
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.04)',
                                    }}
                                >
                                    {!investlen && (
                                        <td colSpan={'6'} className="py-[85px] text-center">
                                            <CircularProgress sx={{ color: 'white' }} />
                                        </td>
                                    )}
                                    {!address || investlen && investlen.length === 0 && (
                                        <td colSpan={'6'} className="text-[15px] py-[100px] font-medium text-[#87909C] text-center">
                                            No stake yet!
                                        </td>
                                    )}

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table