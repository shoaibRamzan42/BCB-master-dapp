import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { motion } from "framer-motion";
import logo from "../src/assets/whitelogo2.svg";
//yak developer
import Table from "./components/Table";
import { ColorRing } from "react-loader-spinner";
import {
  waitForTransaction,
  writeContract,
  prepareWriteContract,
  readContract,
} from "wagmi/actions";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Calculator from "./components/Calculator";
import image1 from "../src/assets/img1.png";
import image2 from "../src/assets/img2.png";
import image3 from "../src/assets/img3.png";
import Languageoption from "./components/Languageoption";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Navbar from "./components/Navbar";
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const { t } = useTranslation();

  let poo = t('pool');
  const investmentType = [t('pool'), t("Personal")];

  const [activeType, setactiveType] = useState(investmentType[0]);

  const [stakers1, setStakers1] = useState(0);
  const [stake1, setStake1] = useState(0);
  const [reward1, setReward1] = useState(0);

  const [stakers2, setStakers2] = useState(0);
  const [stake2, setStake2] = useState(0);
  const [reward2, setReward2] = useState(0);

  const [stakers3, setStakers3] = useState(0);
  const [stake3, setStake3] = useState(0);
  const [reward3, setReward3] = useState(0);

  const [loading, setLoading] = useState("none");
  const [show, setShow] = useState("none");

  const [investId, setinvestId] = useState(0);
  const [totalStaker, setTotalStaker] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const [drop, setdrop] = useState("none");
  const [isUpdated, setisUpdated] = useState(false);

  const [BCB, setBCB] = useState(0);
  const [investlen, setinvestlen] = useState("");

  var decimal = 1000000000000000000;

  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      Info();
    }
  }, [address]);

  var contractaddress = "0x01081A86Bd237267F71dAaC819ecaDEb9Db4E52B"; // Contract Address
  var contractaddress_token = "0xe4177C1400A8Eee1799835DcDe2489c6f0D5d616"; //Abi


  //please add ABI in a separate file
  var abi_token = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "delegator",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "fromDelegate",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "toDelegate",
          type: "address",
        },
      ],
      name: "DelegateChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "delegate",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "previousBalance",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newBalance",
          type: "uint256",
        },
      ],
      name: "DelegateVotesChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint32", name: "pos", type: "uint32" },
      ],
      name: "checkpoints",
      outputs: [
        {
          components: [
            { internalType: "uint32", name: "fromBlock", type: "uint32" },
            { internalType: "uint224", name: "votes", type: "uint224" },
          ],
          internalType: "struct ERC20Votes.Checkpoint",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "delegatee", type: "address" }],
      name: "delegate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "delegatee", type: "address" },
        { internalType: "uint256", name: "nonce", type: "uint256" },
        { internalType: "uint256", name: "expiry", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "delegateBySig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "delegates",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "blockNumber", type: "uint256" },
      ],
      name: "getPastTotalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "blockNumber", type: "uint256" },
      ],
      name: "getPastVotes",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "getVotes",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "nonces",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "numCheckpoints",
      outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  var abi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_wBtc","type":"address"},{"internalType":"bool","name":"_started","type":"bool"},{"internalType":"address","name":"_wbtcPriceFeed","type":"address"},{"internalType":"address","name":"_ethPriceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"returnPer","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RefRewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WithdrawAll","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"addReferee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_apy","type":"uint256"}],"name":"changeAPY","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRefRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"claimRewardsInWBTC","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedRefRewards","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getRefRewards","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_rewards","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReferInfo","outputs":[{"components":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"internalType":"struct Referral.Referral_levels","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"level","type":"uint256"}],"name":"getReferees","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWbtcPriceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"hasStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"investor","type":"address"}],"name":"investorOrderIds","outputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"},{"internalType":"uint256","name":"starttime","type":"uint256"},{"internalType":"uint256","name":"endtime","type":"uint256"},{"internalType":"uint256","name":"claimedReward","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pooldata","outputs":[{"internalType":"uint256","name":"lockupDuration","type":"uint256"},{"internalType":"uint256","name":"returnPer","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"referInfo","outputs":[{"internalType":"uint256","name":"level_1","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"setCRCPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_lockupDuration","type":"uint256"},{"internalType":"address","name":"_referrer","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeOnPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakersPlan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"started","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_start","type":"bool"}],"name":"toggleStaking","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalRewardEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardPending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewardsDistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWithdrawal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"payaddress","type":"address"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"bool","name":"referred","type":"bool"},{"internalType":"address","name":"referred_by","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wBtc","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbtcPriceFeed","outputs":[{"internalType":"contract AggregatorV3Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

  const Info = async () => {
    const account = address;

    var contractaddress = "0x01081A86Bd237267F71dAaC819ecaDEb9Db4E52B"; // Contract Address
    var contractaddress_token = "0xe4177C1400A8Eee1799835DcDe2489c6f0D5d616"; //Abi

    const tokenBal = await readContract({
      address: contractaddress_token, // Contract address
      abi: abi_token, // Contract ABI
      functionName: "balanceOf", // Function to call
      args: [account], // Optional function arguments
    });

    setBCB(Number(tokenBal) / decimal);

    const stakers1 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "stakersPlan", // Function to call
      args: [1], // Optional function arguments
    });

    setStakers1(Number(stakers1));

    const stake1 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "stakeOnPool", // Function to call
      args: [1], // Optional function arguments
    });

    setStake1((Number(stake1) / decimal).toFixed(4));

    const reward1 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "rewardOnPool", // Function to call
      args: [2592000], // Optional function arguments
    });

    setReward1((Number(reward1) / decimal).toFixed(4));

    const stakers2 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "stakersPlan", // Function to call
      args: [2], // Optional function arguments
    });

    setStakers2(Number(stakers2));

    const stake2 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "stakeOnPool", // Function to call
      args: [2], // Optional function arguments
    });

    setStake2((Number(stake2) / decimal).toFixed(4));

    const reward2 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "rewardOnPool", // Function to call
      args: [31536000], // Optional function arguments
    });

    setReward2((Number(reward2) / decimal).toFixed(4));

    const stakers3 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "stakersPlan", // Function to call
      args: [3], // Optional function arguments
    });
    setStakers3(Number(stakers3));

    const stake3 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "stakeOnPool", // Function to call
      args: [3], // Optional function arguments
    });

    setStake3((Number(stake3) / decimal).toFixed(4));

    const reward3 = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "rewardOnPool", // Function to call
      args: [94608000], // Optional function arguments
    });

    setReward3((Number(reward3) / decimal).toFixed(4));

   
    const investd = await readContract({
      address: contractaddress, // Contract address
      abi: abi, // Contract ABI
      functionName: "investorOrderIds", // Function to call
      args: [account], // Optional function arguments
    });
    console.log(investId)
    setinvestId(investd[0]);

    if (investd.length) {
      let reward = 0;
      // setinvestlen([]);
      var inv = [];

      for (var i = 0; i < investd.length; i++) {
        // console.log(investlen.length);

        const totalRefBonu = await readContract({
          address: contractaddress, // Contract address
          abi: abi, // Contract ABI
          functionName: "pendingRewards", // Function to call
          args: [investd[i]], // Optional function arguments
        });
        console.log("pppp" , totalRefBonu );
        const order = await readContract({
          address: contractaddress, // Contract address
          abi: abi, // Contract ABI
          functionName: "orders", // Function to call
          args: [investd[i]], // Optional function arguments
        });

        console.log(order);

        
          if (order[7] == false) {
            inv.push({
              orderIds: investd[i],
              amount: order[1],
              duration: order[2],
              start: order[4],
              end: order[5],
              pending: totalRefBonu,
            });
          
        }
      }
      setinvestlen(inv);
    } else {
      if (Number(investId === 0)) {
        setinvestlen([]);
      }
    }


  };

  const stake = async (valu) => {
    try {
      if (address) {
        // var abi = "";
        // var contractaddress = "";

        var abi_token = [
          { inputs: [], stateMutability: "nonpayable", type: "constructor" },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "delegator",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "fromDelegate",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "toDelegate",
                type: "address",
              },
            ],
            name: "DelegateChanged",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "delegate",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "previousBalance",
                type: "uint256",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "newBalance",
                type: "uint256",
              },
            ],
            name: "DelegateVotesChanged",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [],
            name: "DOMAIN_SEPARATOR",
            outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "spender", type: "address" },
            ],
            name: "allowance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "uint32", name: "pos", type: "uint32" },
            ],
            name: "checkpoints",
            outputs: [
              {
                components: [
                  { internalType: "uint32", name: "fromBlock", type: "uint32" },
                  { internalType: "uint224", name: "votes", type: "uint224" },
                ],
                internalType: "struct ERC20Votes.Checkpoint",
                name: "",
                type: "tuple",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
              },
            ],
            name: "decreaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "delegatee", type: "address" },
            ],
            name: "delegate",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "delegatee", type: "address" },
              { internalType: "uint256", name: "nonce", type: "uint256" },
              { internalType: "uint256", name: "expiry", type: "uint256" },
              { internalType: "uint8", name: "v", type: "uint8" },
              { internalType: "bytes32", name: "r", type: "bytes32" },
              { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "delegateBySig",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "delegates",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "uint256", name: "blockNumber", type: "uint256" },
            ],
            name: "getPastTotalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
              { internalType: "uint256", name: "blockNumber", type: "uint256" },
            ],
            name: "getPastVotes",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "getVotes",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "addedValue", type: "uint256" },
            ],
            name: "increaseAllowance",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
            ],
            name: "nonces",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "account", type: "address" },
            ],
            name: "numCheckpoints",
            outputs: [{ internalType: "uint32", name: "", type: "uint32" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "owner", type: "address" },
              { internalType: "address", name: "spender", type: "address" },
              { internalType: "uint256", name: "value", type: "uint256" },
              { internalType: "uint256", name: "deadline", type: "uint256" },
              { internalType: "uint8", name: "v", type: "uint8" },
              { internalType: "bytes32", name: "r", type: "bytes32" },
              { internalType: "bytes32", name: "s", type: "bytes32" },
            ],
            name: "permit",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              { internalType: "address", name: "from", type: "address" },
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transferFrom",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];

       

        const valueforstake = ethers.utils.parseUnits(inputValue, "ether");

        setLoading("block");

        const { request } = await prepareWriteContract({
          address: contractaddress_token,
          abi: abi_token,
          functionName: "approve",
          args: [contractaddress, valueforstake],
        });
        const { hash } = await writeContract(request);

        await waitForTransaction({
          hash,
          confirmations: 1,
        });

        const { request: contractrqst } = await prepareWriteContract({
          address: contractaddress,
          abi: abi,
          functionName: "stake",
          args: [valueforstake, valu , "0x6073e2bac0E4599b26147E1e5Dee4897EAA5d2e5"],
        });

        const { hash: contractHash } = await writeContract(contractrqst);

        await waitForTransaction({
          contractHash,
          confirmations: 1,
        });

        Info();

        setLoading("none");
        Info();
      }
    } catch (error) {
      setShow("none");
      setLoading("none");
      console.log(error);
    }
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
    // console.log(event.target.value);
  }


  return (
    <>
      {loading === "block" && (
        <div className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.2)] w-[100vw] h-[100vh] flex justify-center items-center">
          <div>
            <CircularProgress sx={{ color: "#0dbe4f" }} size={80} />
          </div>
        </div>
      )}

      <ToastContainer />

      <div className="min-h-screen max-w-[100vw] overflow-hidden relative">
        <div className="absolute z-10 top-[-120px] left-[-120px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="346"
            height="368"
            viewBox="0 0 346 368"
            fill="none"
          >
            <g filter="url(#filter0_f_250_7840)">
              <path
                d="M65.5 280.5H69.9661C119.414 280.5 159.5 240.414 159.5 190.966V186.5H155.034C105.586 186.5 65.5 226.586 65.5 276.034V280.5Z"
                stroke="#A06742"
                strokeWidth="5"
              />
              <path
                d="M159.5 280.5H155.034C105.586 280.5 65.5 240.414 65.5 190.966V186.5H69.9661C119.414 186.5 159.5 226.586 159.5 276.034V280.5Z"
                stroke="#A06742"
                strokeWidth="5"
              />
              <path
                d="M164.5 280.5H168.966C218.414 280.5 258.5 240.414 258.5 190.966V186.5H254.034C204.586 186.5 164.5 226.586 164.5 276.034V280.5Z"
                stroke="#A06742"
                strokeWidth="5"
              />
              <path
                d="M164.5 87.5H168.966C218.414 87.5 258.5 127.586 258.5 177.034V181.5H254.034C204.586 181.5 164.5 141.414 164.5 91.9661V87.5Z"
                stroke="#A06742"
                strokeWidth="5"
              />
              <rect
                x="65.5"
                y="87.5"
                width="94"
                height="94"
                rx="47"
                stroke="#EABCAC"
                strokeWidth="5"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_250_7840"
                x="-22"
                y="0"
                width="368"
                height="368"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="42.5"
                  result="effect1_foregroundBlur_250_7840"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="absolute z-10 bottom-[-100px] right-[-100px]"></div>

        <div className="hidden md:block absolute inset-0">
          <div className="flex justify-end">
            <img src="" alt="" className="object-cover " />
          </div>
        </div>
        <div className="relative z-10">
          <Navbar />

          <Calculator />
          <div className="flex justify-center">
            <h2
              className="text-[55px] w-fit sm:text-[65px] font-medium text-center mt-[70px] sm:mt-[40px]"
              style={{
                background:
                  "linear-gradient(96deg, #A06742 33.48%, #EABCAC 100.85%)",
                backgroundClip: "text",
                webkitBackgroundClip: "text",
                webkitTextFillColor: "transparent",
              }}
            >
              {t("staking", "Staking")}
            </h2>
          </div>

          <div className="flex justify-center mt-[10px]">
            <div
              className="relative z-0 flex justify-center bg-gray-600 items-center h-[52px] px-[7px] rounded-[15px]"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
              }}
            >
              <div className="flex">
                {investmentType.map((item, i) => (
                  <div key={i}>
                    <div
                      className={` w-[115px] `}
                      onClick={() => setactiveType(item)}
                    >
                      <button
                        className={`rounded-[6px] w-full text-[14px] font-medium h-[34px] ${activeType === item ? "text-white" : " text-[#93A4BD]"
                          } `}
                        style={{
                          background:
                            activeType === item &&
                            "linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)",
                        }}
                      >
                        {item}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className=" flex py-8 justify-center items-center text-white text-center bg-transparent">
            <button

              className="text-center border flex gap-[5px] items-center border-[#a06742] bg-[#ffffff0a] font-medium  px-8 py-3 rounded-lg ">{t("Refer", "Your Refferal link")}
              <div
                onClick={() => {
                  navigator.clipboard.writeText(`https://bcbinvestment.com/?ref=${address}`)
                  toast.success('Copied to clipboard successfully', {
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
                }}
              >
                <FileCopyIcon />
              </div>
            </button>
          </div>

          <div className="pt-[80px] pb-[40px] max-w-[1400px] px-[30px] mx-auto relative z-10 ">
            {activeType === poo ? (
              <motion.div
                whileInView={{ y: [70, 0], opacity: [0, 1] }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                initial="hidden"
                style={{ opacity: 0 }}
              >
                <div className="flex flex-wrap justify-center gap-[40px] sm:gap-[50px]">
                  <div className="w-[380px] bg-[rgba(0,0,0,0.1)] rounded-[20px] cardShadow p-[20px]">
                    <img src={image1} alt="" className="h-[65px]" />

                    <p className="text-[13px] pt-[5px] text-[#bdbdbd]">
                      {t("Reward-Pool")} 1%
                    </p>

                    <div className="mt-[20px] space-y-[15px]">
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Stakers", "Stakers")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {stakers1}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Staked", "Staked")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {stake1}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Rewards-claimed", "Rewards-claimed")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {reward1}
                        </h2>
                      </div>
                    </div>

                    <div className="flex justify-between border-t mt-[20px] border-b border-gray-600 py-[9px] ">
                      <h2 className="text-white text-[16px] font-semibold">
                        {t("My-Balance", "My Balance")}
                      </h2>
                      <h2 className="text-white text-[16px] font-bold">
                        {BCB}
                      </h2>
                    </div>

                    <input
                      placeholder={t("amount", "Enter Usdt amount for CRC stake")}
                      value={inputValue}
                      onChange={handleInputChange}
                      type="number"
                      className="outline-none w-full placeholder:text-white border border-[#A06742] text-white text-[11px] sm:text-[13px] font-normal rounded-[8px] bg-transparent mt-[20px] px-[20px] py-[10px]"
                    />
                    <div className="flex justify-between   py-[9px] ">
                     
                    </div>

                    <button
                      onClick={() => stake(1)}
                      style={{
                        background:
                          "linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)",
                      }}
                      className="text-white relative z-10 mb-[10px] mt-[30px] font-semibold flex gap-[6px] justify-center items-center text-[14px] lg:text-[16px]  w-full h-[32px] sm:h-[37px] rounded-[5px] sm:rounded-[10px]"
                    >
                      {t("bstake", "Stake")}
                    </button>
                  </div>
                  <div className="w-[380px] bg-[rgba(0,0,0,0.1)] rounded-[20px] cardShadow p-[20px]">
                    <img src={image2} alt="" className="h-[65px]" />

                    <p className="text-[13px] pt-[5px] text-[#bdbdbd]">
                      {t("Reward-Pool", "Reward Pool: APY is 15%")} 15%
                    </p>

                    <div className="mt-[20px] space-y-[15px]">
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Stakers", "Stakers")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {stakers2}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Staked", "Staked")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {stake2}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Rewards-claimed", "Rewards-claimed")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {reward2}
                        </h2>
                      </div>
                    </div>

                    <div className="flex justify-between border-t mt-[20px] border-b border-gray-600 py-[9px] ">
                      <h2 className="text-white text-[16px] font-semibold">
                        {t("My-Balance", "My Balance")}
                      </h2>
                      <h2 className="text-white text-[16px] font-bold">
                        {BCB}
                      </h2>
                    </div>

                    <input
                      placeholder={t("amount", "Enter Usdt amount for CRC stake")}
                      value={inputValue}
                      onChange={handleInputChange}
                      type="number"
                      className="outline-none w-full placeholder:text-white text-white border bg-transparent border-[#A06742] text-[11px] sm:text-[13px] font-normal rounded-[8px]  mt-[20px] px-[20px] py-[10px]"
                    />

                    <div className="flex justify-between   py-[9px] ">
                   
                    </div>

                    <button
                      onClick={() => stake(2)}
                      style={{
                        background:
                          "linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)",
                      }}
                      className="text-white relative z-10 mb-[10px] mt-[30px] font-semibold flex gap-[6px] justify-center items-center text-[14px] lg:text-[16px]  w-full h-[32px] sm:h-[37px] rounded-[5px] sm:rounded-[10px]"
                    >
                      {t("bstake", "Stake")}
                    </button>
                  </div>
                  <div className="w-[380px] bg-[rgba(0,0,0,0.9)] rounded-[20px] cardShadow p-[20px]">
                    <img src={image3} alt="" className="h-[65px]" />

                    <p className="text-[13px] pt-[5px] text-[#bdbdbd]">
                      {t("Reward-Pool", "Reward Pool: APY is 18%")} 18%
                    </p>

                    <div className="mt-[20px] space-y-[15px]">
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Stakers", "Stakers")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {stakers3}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Staked", "Staked")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {stake3}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <h2 className="text-white text-[16px] font-semibold">
                          {t("Rewards-claimed", "Rewards-claimed")}
                        </h2>
                        <h2 className="text-white text-[16px] font-bold">
                          {reward3}
                        </h2>
                      </div>
                    </div>

                    <div className="flex justify-between border-t mt-[20px] border-b border-gray-600 py-[9px] ">
                      <h2 className="text-white text-[16px] font-semibold">
                        {t("My-Balance", "My Balance")}
                      </h2>
                      <h2 className="text-white text-[16px] font-bold">
                        {BCB}
                      </h2>
                    </div>

                    <input
                      placeholder={t("amount", "Enter Usdt amount for CRC stake")}
                      value={inputValue}
                      onChange={handleInputChange}
                      type="number"
                      className="outline-none w-full placeholder:text-white text-white text-[11px] sm:text-[13px] font-normal rounded-[8px] bg-transparent border border-[#A06742]  mt-[20px] px-[20px] py-[10px]"
                    />
                    <div className="flex justify-between   py-[9px] ">
                      {/* <h2 className="text-white text-[16px] font-semibold">
                        {t("BCB-tokens", "Minimum BCB Tokens")}
                      </h2>
                      <h2 className="text-white text-[16px] font-bold">
                        30000
                      </h2> */}
                    </div>

                    <button
                      onClick={() => stake(3)}
                      style={{
                        background:
                          "linear-gradient(96deg, #A06742 30.48%, #EABCAC 110.85%)",
                      }}
                      className="text-white relative z-10 mb-[10px] mt-[30px] font-semibold flex gap-[6px] justify-center items-center text-[14px] lg:text-[16px]  w-full h-[32px] sm:h-[37px] rounded-[5px] sm:rounded-[10px]"
                    >
                      {t("bstake", "Stake")}
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            ) : (
              <div>
                <motion.div
                  whileInView={{ y: [70, 0], opacity: [0, 1] }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                  initial="hidden"
                  style={{ opacity: 0 }}
                >
                  <Table investlen={investlen} Info={Info} />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
