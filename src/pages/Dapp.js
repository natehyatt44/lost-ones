import { useState, useEffect } from 'react'
import { useMetaMask } from "metamask-react";
import Web3 from 'web3';
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { ethers } from "ethers";

import { nodeManagementAddress, nodeManagementAbi } from '../contract_Helpers/nodeManagement';
import { contractAddress, contractAbi } from '../contract_Helpers/nodeContract';
import { pairAddress, pairABI } from '../contract_Helpers/pair';
import { avaxusdcAddress, avaxusdcABI } from '../contract_Helpers/avaxusdc';
import { stakingAddress, stakingABI } from '../contract_Helpers/staking';
import { stakingAddressAvax, stakingAvaxABI } from '../contract_Helpers/stakingAvax';

const Dapp = () => {

    const { status, connect, account, chainId, ethereum } = useMetaMask();
  
    const [availableRewards, setAvailableRewards] = useState(<span className="tokenSpan"> 0 Nebu</span>)
    const [availableStakingRewards, setAvailableStakingRewards] = useState(<span className="tokenSpan"> 0 Nebu</span>)
    const [availableStakingRewardsAvax, setAvailableStakingRewardsAvax] = useState(<span className="tokenSpan"> 0 WAVAX</span>)
    const [stakedAmount, setstakedAmount] = useState(<span className="tokenSpan"> 0 Nebu Staked</span>)
    const [stakedAvaxAmount, setstakedAvaxAmount] = useState(<span className="tokenSpan"> 0 Nebu Staked</span>)
    const [APR, setAPR] = useState(<span className="tokenSpan"> 0 %</span>)
    const [APRDaily, setAPRDaily] = useState(<span className="tokenSpan"> 0 %</span>)
    const [APRAvax, setAPRAvax] = useState(<span className="tokenSpan"> 0 %</span>)
    const [APRDailyAvax, setAPRDailyAvax] = useState(<span className="tokenSpan"> 0 %</span>)
    const [nodeName, setNodeName] = useState("")
    const [blocktime, setBlocktime] = useState("")
    const [nbtoken, setnbtokens] = useState("")
    const [nbstaketoken, setnbstaketokens] = useState("")
    const [nodes, setNodes] = useState([])
    const [total, setTotalDaily] = useState(<span> - Nebu/Day </span>)
    const [currentprice, setCurrentPrice] = useState(<span>$0.0000</span>) 
    const [currentBalance, setCurrentBalance] = useState(<span> - Nebu</span>) 
    const [currentMarketCap, setMarketCap] = useState(<span>$0.0000</span>) 
    const [currentTVL, setcurrentTVL] = useState(<span>$0.0000</span>) 
    
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
            window.location.reload();
        }
    });

    const signer = provider.getSigner()


    const nodeManagementContract = new ethers.Contract(nodeManagementAddress, nodeManagementAbi, signer);
    const nodeContract = new ethers.Contract(contractAddress, contractAbi, signer);
    const pairContract = new ethers.Contract(pairAddress, pairABI, signer);
    const avaxusdcContract = new ethers.Contract(avaxusdcAddress, avaxusdcABI, signer);
    const stakingContract = new ethers.Contract(stakingAddress, stakingABI, signer);
    const stakingContractWavax = new ethers.Contract(stakingAddressAvax, stakingAvaxABI, signer);
    

    const [allNodes, setAllNodes] = useState(0)
    const [myNodes, setMyNodes] = useState(0)
 

    const minifyAddress = (address) => {
        return address.substr(0,8) + '...' + address.substr(34,42)
    }

    const creationTimeToDate = (timestamp) => {
        var myDate = new Date( timestamp *1000);
        return myDate.toLocaleString()
    }

    async function getRewards(){
        const tx = await nodeContract.cashoutAll()
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }


    function getMyNodes(){
        if(status === 'connected'){
            return (
                <>{myNodes}</>
            )
        }else{
            return (  
                "0"
            )
        }
    }

    function getAllNodes(){
        if(status === 'connected'){
            return (
                <>{allNodes}</>
            )
        }
        else {
            return (  
                "0"
            )
        }
    }
    
    function getTotalDaily(){
        if(status === 'connected'){
            return (<p>{total}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getPendingRewards(){
        if(status === 'connected'){
            return (              
                <p>{availableRewards}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getPendingStakingRewards(){
        if(status === 'connected'){
            return (              
                <p>{availableStakingRewards}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getPendingStakingRewardsAvax(){
        if(status === 'connected'){
            return (              
                <p>{availableStakingRewardsAvax}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getStakedAmount(){
        if(status === 'connected'){
            return (              
                <p>{stakedAmount}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getStakedAvaxAmount(){
        if(status === 'connected'){
            return (              
                <p>{stakedAvaxAmount}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getAPR(){
        if(status === 'connected'){
            return (              
                <p>{APR}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getAPRDaily(){
        if(status === 'connected'){
            return (              
                <p>{APRDaily}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getAPRAvax(){
        if(status === 'connected'){
            return (              
                <p>{APRAvax}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getAPRDailyAvax(){
        if(status === 'connected'){
            return (              
                <p>{APRDailyAvax}</p>
            )
        }else{
            return (  
                <span className="placeholder"></span>
            )
        }
    }

    function getCurrentNebuPrice() {
        if(status === 'connected'){
            return (              
                <>{currentprice}</>
            )
        }else{
            return (  
                "$0.0000"
            )
        }
    }

    function getCurrentNebuBalance() {
        if(status === 'connected'){
          return (              
              <>{currentBalance}</>
          )
        }else{
          return (  
              "$0.0000"
          )
        }
    }

      function getCurrentMarketCap() {
        if(status === 'connected'){
          return (              
              <>{currentMarketCap}</>
          )
        }else{
          return (  
              "$0.0000"
          )
        }
      }

      function getCurrentTVL() {
        if(status === 'connected'){
          return (              
              <>{currentTVL}</>
          )
        }else{
          return (  
              "$0.0000"
          )
        }
      }
    
    function getUnderMainButtonText(){
        if(status === 'connected'){
            return //<div>Daily Rewards : 0.2 <span className="tokenSpan">Nebu </span>/ Day / NebulaNode</div>
        }else{
            return //<div className="elem_span">Connect your Metamask to stake <span className="tokenSpan">Nebu</span></div>
        }
    }

    function handleTokensNbChange(e) {
        setnbtokens(e.target.value);
        console.log(nbtoken)
    }

    function handleStakeTokensNbChange(e) {
        setnbstaketokens(e.target.value);
        console.log(nbtoken)
    }

    async function createNode(){
        let token = Web3.utils.toWei(nbtoken, 'ether');
        const tx = await nodeContract.createNodeWithTokens(nodeName, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function approve(){
        let token = Web3.utils.toWei('10000000000000', 'ether');
        const tx = await nodeContract.approve(stakingAddress, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function approveAvax(){
        let token = Web3.utils.toWei('10000000000000', 'ether');
        const tx = await nodeContract.approve(stakingAddressAvax, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function stake(){
        let token = Web3.utils.toWei(nbstaketoken, 'ether');
        const tx = await stakingContract.deposit(0, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function stakeAvax(){
        let token = Web3.utils.toWei(nbstaketoken, 'ether');
        const tx = await stakingContractWavax.deposit(0, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function claim(){
        let token = Web3.utils.toWei('0', 'ether');
        const tx = await stakingContract.withdraw(0, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function claimAvax(){
        let token = Web3.utils.toWei('0', 'ether');
        const tx = await stakingContractWavax.withdraw(0, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function withdraw(){
        let token = Web3.utils.toWei(nbstaketoken, 'ether');
        const tx = await stakingContract.withdraw(0, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function withdrawAvax(){
        let token = Web3.utils.toWei(nbstaketoken, 'ether');
        const tx = await stakingContractWavax.withdraw(0, token)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function migrateNode(){
        const tx = await nodeContract.migrateOldNode()
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function compoundNode(){
        const tx = await nodeContract.compoundAllNodes(blocktime)
        const receipt = await tx.wait()
        console.log(receipt)
        updateInfo()
    }

    async function changeChain(){
        await window.ethereum.request({
            "id": 1,
            "jsonrpc": "2.0",
            "method": "wallet_switchEthereumChain",
            "params": [
            {
                "chainId": "0xa86a"
            }
            ]
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error); 
    }

    async function checkChainId()  {
      console.log('check chain id')
      if(status === 'connected'){
        if(window.ethereum.chainId !== '0x61'){
          console.log('not good chain')
          await changeChain()
        }
      }else{
        await connect()
      }     
    }

    async function handleMainButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await getRewards()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
      }else{
        await connect()        
      }
    }

    async function handleCreateNodeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            (nodeName.length > 3 && nodeName.length < 32) ? await createNode() : alert('Node name must be between 3 and 31 characters long')
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleApproveButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
             await approve()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleApproveAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
             await approveAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleStakeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await stake()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleStakeAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await stakeAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleClaimButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await claim()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleClaimAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await claimAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleWithdrawButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await withdraw()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleWithdrawAvaxButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await withdrawAvax()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }
    
    async function handleMigrateNodeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await migrateNode()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    async function handleCompoundNodeButtonClick () {
      if(status === 'connected'){
        if(chainId === '0xa86a'){
            await compoundNode()
        }else{
            ethereum.request({
                "id": 1,
                "jsonrpc": "2.0",
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xa86a"
                  }
                ]
              })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        }            
        
      }else{
        await connect()        
      }
    }

    const updateInfo = async () => {

        try{
            let tx = await nodeManagementContract.getNodeNumberOf(account)
            console.log(tx.toString())
            setMyNodes(tx.toString() + "/100")
        }catch (e){
            console.log("error" + e)
            
        }

        try{
            let tx9 = await nodeContract.balanceOf(account)
            console.log(tx9.toString())
            setCurrentBalance(<span className="tokenSpan">{formatToken(tx9).toString()} Nebu</span>)
        }catch (e){
            console.log("error update balance info change account " + e)
        }

        try{
        let tx2 = await nodeManagementContract.totalNodesCreated()
        console.log(tx2.toString())
        setAllNodes(tx2.toString())
        }catch (e){
            console.log("error update info " + e)
        }
        try {
            let tx3 = await nodeManagementContract.getAllNodesRewards(account)
            console.log(tx3.toString())
            setAvailableRewards(<span className="tokenSpan">{formatToken(tx3).toString()} Nebu</span>)
        }catch (e){
            console.log("error" + e)
            
        }
        try {
            let tx20 = await stakingContract.pendingNebu(0, account)
            console.log(tx20.toString())
            setAvailableStakingRewards(<span className="tokenSpan">{formatToken(tx20).toString()} Nebu</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx30 = await stakingContractWavax.pendingNebu(0, account)
            console.log(tx30.toString())
        }catch (e){
            console.log("error" + e)
            
        }
        

        try {
            var pid = ethers.utils.parseUnits('0', 1);
            let tx21 = await stakingContract.userInfo(pid, account)
            setstakedAmount(<span className="tokenSpan">{formatToken(tx21).toString()} Nebu Staked</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx31 = await stakingContractWavax.userInfo(0, account)
            console.log(tx31.toString())
            setstakedAvaxAmount(<span className="tokenSpan">{formatToken(tx31.amount)} Nebu Staked</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx4 = await nodeManagementContract.getNodesNames(account)
            let namesArray = tx4.toString().split("#")

            let tx5 = await nodeManagementContract.getNodesCreationTime(account)
            let creationTimeArray = tx5.toString().split("#")

            let tx10 = await nodeManagementContract.getAllNodes(account)
            console.log(tx10[0].amount.toString())
    
            let nodes = []
            let total = Number();
    
            for (let i = 0; i < creationTimeArray.length; i++) {
            let tx6 = await nodeManagementContract.getNodeReward(account, creationTimeArray[i])
            let dailyrewards = (tx10[i].amount).mul(20).div(1000)
            console.log(formatToken(dailyrewards))
            total = total + Number((formatToken(dailyrewards)))
    
            let newNode = {
                name: namesArray[i],
                creationTime: creationTimeArray[i],
                rewards: formatToken(tx6).toString(),
                value: formatToken(tx10[i].amount).toString(),
                daily: formatToken(dailyrewards).toString()          
            }
            nodes.push(newNode)
            }
            setBlocktime(nodes[0].creationTime)
            setTotalDaily(<span className="tokenSpan">{total.toFixed(2)} Nebu/Day</span>)
            console.log(nodes)
            console.log(blocktime)
            setNodes(nodes)
        }catch(e){
            console.log("No nodes")
        }
        
        try {
            let tx6 = await pairContract.getReserves();
            let avaxReserve = tx6._reserve1;
            let nebuReserve = tx6._reserve0;

            let tx7 = await avaxusdcContract.getReserves();
            let avax1Reserve = formatToken(tx7._reserve1);
            let usdcReserve = tx7._reserve0;
            usdcReserve = usdcReserve * (1e-6)

            let AvaxPrice = usdcReserve / avax1Reserve;
            let tokenPriceAvax = (avaxReserve / nebuReserve) * AvaxPrice;
            
            let tx8 = await nodeContract.totalSupply();
            let rwsupply = await nodeContract.balanceOf("0x6912B4ee8370306C719F2F78129114b75581DcF8");

            let supply = tx8.sub(rwsupply);
            setMarketCap(<span>{formatToken(supply).toString()} $</span>);

            let tx22 = await stakingContract.poolInfo(0);
            let TVL = formatToken(tx22.stakedAmount) * tokenPriceAvax;
            setcurrentTVL(<span>{TVL.toFixed(2).toString()} $</span>)


            let tokensec = await stakingContract.nebuPerSecond()
            let tokenperhour = tokensec.mul(60).mul(60)

            let totalRewardsPerYear = tokenPriceAvax * Number(tokenperhour.mul(24).mul(365))

            let yearlyAPR = (totalRewardsPerYear / tx22.stakedAmount) * 10

            setAPR(<span>{yearlyAPR.toFixed(2)} %</span>)

            setCurrentPrice(<span>{tokenPriceAvax.toFixed(2).toString()} $</span>)
        }catch(e){
            console.log("No Pair")
        }
    }

    const updateInfoChangeAccount = async () => {

        console.log(account)

        setNodes([])

        
        setMyNodes(0 + "/100")
        setAvailableRewards(<span className="tokenSpan">0 Nebu</span>)

        try{
            let tx = await nodeManagementContract.getNodeNumberOf(account)
            console.log(tx.toString())
            setMyNodes(tx.toString() + "/100")
        }catch (e){
            console.log("error update info change account " + e)
        }

        try{
            let tx9 = await nodeContract.balanceOf(account)
            console.log(tx9.toString())
            setCurrentBalance(<span className="tokenSpan">{formatToken(tx9).toString()} Nebu</span>)
        }catch (e){
            console.log("error update balance info change account " + e)
        }
        
        try{
            let tx2 = await nodeManagementContract.totalNodesCreated()
            console.log(tx2.toString())
            setAllNodes(tx2.toString())
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx3 = await nodeManagementContract.getAllNodesRewards(account)
            console.log((tx3).toString())
            setAvailableRewards(<span className="tokenSpan">{formatToken(tx3).toString()} Nebu</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx20 = await stakingContract.pendingNebu(0, account)
            console.log(tx20.toString())
            setAvailableStakingRewards(<span className="tokenSpan">{formatToken(tx20).toString()} Nebu</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx30 = await stakingContractWavax.pendingNebu(0, account)
            console.log(tx30.toString())
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx21 = await stakingContract.userInfo(0, account)
            console.log(tx21.toString())
            setstakedAmount(<span className="tokenSpan">{formatToken(tx21.amount)} Nebu Staked</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx31 = await stakingContractWavax.userInfo(0, account)
            console.log(tx31.toString())
            setstakedAvaxAmount(<span className="tokenSpan">{formatToken(tx31.amount)} Nebu Staked</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx6 = await pairContract.getReserves();
            let avaxReserve = tx6._reserve1;
            let nebuReserve = tx6._reserve0;

            let tx7 = await avaxusdcContract.getReserves();
            let avax1Reserve = formatToken(tx7._reserve1);
            let usdcReserve = tx7._reserve0;
            usdcReserve = usdcReserve * (1e-6)

            let AvaxPrice = usdcReserve / avax1Reserve;
            let tokenPriceAvax = (avaxReserve / nebuReserve) * AvaxPrice;
            
            let tx8 = await nodeContract.totalSupply();
            let rwsupply = await nodeContract.balanceOf("0x6912B4ee8370306C719F2F78129114b75581DcF8");

            let supply = formatToken(tx8.sub(rwsupply));
            let marketCap = supply * tokenPriceAvax;
            console.log(marketCap);
            setMarketCap(<span>{marketCap.toFixed(2).toString()} $</span>);

            let tx22 = await stakingContract.poolInfo(0);
            let tx32 = await stakingContractWavax.poolInfo(0);
            let TVL = formatToken(tx22.stakedAmount) * tokenPriceAvax;
            setcurrentTVL(<span>{TVL.toFixed(2).toString()} $</span>)

            let tokensec = await stakingContract.nebuPerSecond()
            let tokenperhour = tokensec.mul(60).mul(60)

            let totalRewardsPerYear = tokenPriceAvax * Number(tokenperhour.mul(24).mul(365))
            let totalRewardsPerDay = tokenPriceAvax * Number(tokenperhour.mul(24))

            let dailyAPR = (totalRewardsPerDay / tx22.stakedAmount) * 10
            let yearlyAPR = (totalRewardsPerYear / tx22.stakedAmount) * 10

            setAPR(<span>{yearlyAPR.toFixed(2)} %</span>)

            setAPRDaily(<span>{dailyAPR.toFixed(2)} %</span>)


            let tokensecAvax = await stakingContractWavax.nebuPerSecond()
            let tokenperhourAvax = tokensecAvax.mul(60).mul(60)

            let totalRewardsPerYearAvax = AvaxPrice * Number(tokenperhourAvax.mul(24).mul(365))
            let totalRewardsPerDayAvax = AvaxPrice * Number(tokenperhourAvax.mul(24))

            let dailyAPRAvax = (totalRewardsPerDayAvax / tx32.stakedAmount) * 10
            let yearlyAPRAvax = (totalRewardsPerYearAvax / tx32.stakedAmount) * 10


            setCurrentPrice(<span>{tokenPriceAvax.toFixed(2).toString()} $</span>)
            
        }catch(e){
            console.log("No Pair")
        }
        
        try {
            
            let tx4 = await nodeManagementContract.getNodesNames(account)
            let namesArray = tx4.toString().split("#")

            let tx5 = await nodeManagementContract.getNodesCreationTime(account)
            let creationTimeArray = tx5.toString().split("#")

            let tx10 = await nodeManagementContract.getAllNodes(account)
            console.log(tx10[0].amount.toString())
    
            let nodes = []
            let total = Number();
            
    
            for (let i = 0; i < creationTimeArray.length; i++) {
            let tx6 = await nodeManagementContract.getNodeReward(account, creationTimeArray[i])
            let dailyrewards = (tx10[i].amount).mul(20).div(1000)
            console.log(formatToken(dailyrewards))
            total = total + Number((formatToken(dailyrewards)))
            
    
            let newNode = {
                name: namesArray[i],
                creationTime: creationTimeArray[i],
                rewards: formatToken(tx6).toString(),
                value: formatToken(tx10[i].amount).toString(),
                daily: formatToken(dailyrewards).toString(),  
            }
            nodes.push(newNode)
        }
        setBlocktime(nodes[0].creationTime)
        setTotalDaily(<span className="tokenSpan">{total.toFixed(2)} Nebu/Day</span>)
        console.log(nodes)
        console.log(blocktime)
        setNodes(nodes)
        }catch(e){
            console.log("No nodes")
        }     
       
    }

    const updateInfoCurrentAccount = async () => {

        console.log(account)

        setAvailableRewards(<span className="tokenSpan">0 Nebu</span>)


        try{
            let tx9 = await nodeContract.balanceOf(account)
            console.log(tx9.toString())
            setCurrentBalance(<span className="tokenSpan">{formatToken(tx9).toString()} Nebu</span>)
        }catch (e){
            console.log("error update balance info change account " + e)
        }
        
        try{
        let tx2 = await nodeManagementContract.totalNodesCreated()
        console.log(tx2.toString())
        setAllNodes(tx2.toString())
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx3 = await nodeManagementContract.getAllNodesRewards(account)
            console.log((tx3).toString())
            setAvailableRewards(<span className="tokenSpan">{formatToken(tx3).toString()} Nebu</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx20 = await stakingContract.pendingNebu(0, account)
            console.log(tx20.toString())
            setAvailableStakingRewards(<span className="tokenSpan">{formatToken(tx20).toString()} Nebu</span>)
        }catch (e){
            console.log("error" + e)
            
        }

        try {
            let tx30 = await stakingContractWavax.pendingNebu(0, account)
            console.log(tx30.toString())
        }catch (e){
            console.log("error" + e)
            
        }
      

        try {
            let tx6 = await pairContract.getReserves();
            let avaxReserve = tx6._reserve1;
            let nebuReserve = tx6._reserve0;

            let tx7 = await avaxusdcContract.getReserves();
            let avax1Reserve = formatToken(tx7._reserve1);
            let usdcReserve = tx7._reserve0;
            usdcReserve = usdcReserve * (1e-6)

            let AvaxPrice = usdcReserve / avax1Reserve;
            let tokenPriceAvax = (avaxReserve / nebuReserve) * AvaxPrice;
            
            let tx8 = await nodeContract.totalSupply();
            let rwsupply = await nodeContract.balanceOf("0x6912B4ee8370306C719F2F78129114b75581DcF8");

            let supply = formatToken(tx8.sub(rwsupply));
            let marketCap = supply * tokenPriceAvax;
            console.log(marketCap);
            setMarketCap(<span>{marketCap.toFixed(2).toString()} $</span>);

            let tx22 = await stakingContract.poolInfo(0);
            let tx32 = await stakingContractWavax.poolInfo(0);
            let TVL = formatToken(tx22.stakedAmount) * tokenPriceAvax;
            setcurrentTVL(<span>{TVL.toFixed(2).toString()} $</span>)

            let tokensec = await stakingContract.nebuPerSecond()
            let tokenperhour = tokensec.mul(60).mul(60)

            let totalRewardsPerYear = tokenPriceAvax * Number(tokenperhour.mul(24).mul(365))
            let totalRewardsPerDay = tokenPriceAvax * Number(tokenperhour.mul(24))

            let dailyAPR = (totalRewardsPerDay / tx22.stakedAmount) * 10
            let yearlyAPR = (totalRewardsPerYear / tx22.stakedAmount) * 10

            setAPR(<span>{yearlyAPR.toFixed(2)} %</span>)

            setAPRDaily(<span>{dailyAPR.toFixed(2)} %</span>)

            let tokensecAvax = await stakingContractWavax.nebuPerSecond()
            let tokenperhourAvax = tokensecAvax.mul(60).mul(60)

            let totalRewardsPerYearAvax = AvaxPrice * Number(tokenperhourAvax.mul(24).mul(365))
            let totalRewardsPerDayAvax = AvaxPrice * Number(tokenperhourAvax.mul(24))

            let dailyAPRAvax = (totalRewardsPerDayAvax / tx32.stakedAmount) * 10
            let yearlyAPRAvax = (totalRewardsPerYearAvax / tx32.stakedAmount) * 10



            setCurrentPrice(<span>{tokenPriceAvax.toFixed(2).toString()} $</span>)
            
        }catch(e){
            console.log("No Pair")
        }   
       
    }

    function formatToken(decimals){
        const balance = ethers.BigNumber.from(decimals);
        const remainder = balance.mod(1e15);
        return ethers.utils.formatEther(balance.sub(remainder));
    }
    
    useEffect( () => {
        updateInfoChangeAccount()

        const interval = setInterval(() => {
          console.log('This will run every 30 sec!');
          updateInfoCurrentAccount();
        }, 30000);
        return () => clearInterval(interval);

    }, [account])

    return (
        <div>
            {/* <p>{status === 'connected' ? minifyAddress(account) : 'Connect to Metamask' }</p> */}
            <div className="header-dapp container-fluid bg-nav">

                <nav className="navbar navbar-expand-lg navbar-light ">
                    <a className="navbar-brand" href="/"><img className="logo_s" src="assets/images/logo.png"/></a> 
                </nav>
            </div>



 <div className="container-fluid bg-nav tabs_g tabs-section">
            <nav className="navbar navbar-expand-lg navbar-light navs_hyd ">
                <button className="navbar-toggler navbar_btnss" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse hyd_navs" id="navbarText">
                 

  <ul className="nav nav-tabs navbar-nav m-auto">
  <li className="nav-item"> <a className="navbar-brand hd_m" href="/"><img className="logo_s logo_m" src="assets/images/logo.png"/></a>
                    </li>
                                <li className="nav-item btn_dash">
                                    <a className="nav-link show" data-toggle="tab" href="#tab-1">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-2">Protostars</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-3">NFTs</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-4">Swap</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-5">Bridge</a>
                                </li>
                                <li className="nav-item">
                                <button className="btn_cion btn">
                            <img class="seicon" src="assets/images/metamask.svg" />
                           <span className="text_icn"> Metamask </span>
                            </button>
                                </li>
                                <li className="nav-item">
                                <button className="btn_cion btn">
                            <img class="seicon" src="assets/images/walletconnect.svg" />
                           <span className="text_icn"> WalletConnect </span></button>
                           </li>
                            </ul>

                </div>
            </nav>
        </div>

            <section className="tabs-section text-white">
                <div className="container cont_tabs">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-4 col_side">
                            <ul className="nav nav-tabs navtbass flex-column mb-3">
                                <li className="nav-item">
                                    <a className="nav-link active show" data-toggle="tab" href="#tab-1">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-2">Protostars</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-3">NFTs</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-4">Swap</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#tab-5">Bridge</a>
                                </li>
                                <li className="nav-item">
                                <button className="btn_cion btn">
                            <img class="seicon" src="assets/images/metamask.svg" />
                           <span className="text_icn"> Metamask </span>
                            </button>
                                </li>
                                <li className="nav-item">
                                <button className="btn_cion btn">
                            <img class="seicon" src="assets/images/walletconnect.svg" />
                           <span className="text_icn"> WalletConnect </span></button>
                           </li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <div className="tab-content">
                                <div className="tab-pane active show" id="tab-1">
                                    <div className="container cont_dash">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4 col-lg-4 ps">
                                                <div className="content_div">
                                                    <span className="elem_span">$NeFi Price</span>
                                                    {/* This is unavailable */}
                                                    {/* getCurrentNebuBalance */}
                                                    <span className="elem_span elem_bold">{getCurrentNebuPrice()}</span>
                                                    <span className="elem_span elem_sub">+0.00٪ last 24 hours</span>
                                                    {/* This is unavailable */}
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4 ps">
                                                <div className="content_div">
                                                    <span className="elem_span">Market Cap</span>
                                                    <span className="elem_span elem_bold">{getCurrentMarketCap()}</span>
                                                    <span className="elem_span elem_sub">+0.00٪ last 24 hours</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-lg-4 ps">
                                                <div className="content_div">
                                                    <span className="elem_span">Overseer Fund</span>
                                                    <span className="elem_span elem_bold">$0.0000</span>
                                                    <span className="elem_span elem_sub">+0.00٪ last 24 hours</span>
                                                </div>
                                            </div>
                                            {/* This is unavailable */}
                                            {/* getCurrentTVL */}
                                        </div>
                                    </div>
                                    <div className="container cont_dash">
                                        <div className="row">
                                            <div className="col-sm-4 ps">
                                                <div className="content_div">
                                                    <span className="elem_span">All Nodes</span>
                                                    <span className="elem_span elem_bold">{getAllNodes()}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 ps">
                                                <div className="content_div">
                                                    <span className="elem_span">My Nodes</span>
                                                    <span className="elem_span elem_bold">{getMyNodes()}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-4 ps">
                                                <div className="content_div">
                                                    <span className="elem_span">My Reward</span>
                                                    {/* {getTotalDaily()} */}
                                                    {/* {getPendingRewards()} */}
                                                    <span className="elem_span elem_bold">-$Nefi</span>
                                                </div>
                                            </div>
                                            {/* NewCode */}
                                            <div className='toCenter btn_conect'>
                                                <div>
                                                    <Button onClick={handleMainButtonClick} text={status === 'connected' ? 'Get Rewards' : 'Wallet Connect'} width='250px' />
                                                    <Button text={status === 'connected' ? 'Compound' : 'Wallet Connect'} onClick={handleCompoundNodeButtonClick} width='200px'/>
                                                </div>
                                                {getUnderMainButtonText()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container cont_dash">
                                        <div className="row ">
                                            <div className="col-sm-6 ps">
                                                <div className="barimage">
                                                    <img className="" src="assets/images/bar_image.png" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 ps">
                                                <div className="col-sm-12 p-0 ps ">
                                                    <div className="content_div marsets">
                                                        <span className="elem_span">ROI in Days</span>
                                                        <span className="elem_span elem_bold mb-3">infinity</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 p-0 ps">
                                                    <div className="content_div marset">
                                                        <span className="elem_span">Daily Protostar Rewards </span>
                                                        <span className="elem_span elem_bold mb-3">0.00 $NeFi</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab-2">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="main_node">
                                                <h3>Protostars</h3>
                                                <form>
                                                    <label className="elem_span">
                                                    Protostars name 
                                                    <input id="nebula_price"  className="txts_feild" type="text" name="nebula_price" placeholder="Must be 3 letter or more"  />
                                                  
                                                    </label>
                                                    <label className="elem_span ">
                                                    NeFi tokens used 
                                                    <input className="txts_feild "  defaultValue="10" placeholder="eg(10.0)" type="text" name="name" onChange />
                                                    </label>
                                                </form>
                                                {/* NewCode */}
                                                <div>
                                                    <Button text={status === 'connected' ? 'Create my Protostar' : 'Wallet Connect'} onClick={handleCreateNodeButtonClick} width='200px'/>
                                                    <Button text={status === 'connected' ? 'Migrate Old Node' : 'Wallet Connect'} onClick={handleMigrateNodeButtonClick} width='200px'/>
                                                </div>
                                                <div className="instruct">
                                                    <h3>Note</h3>
                                                    <h4>1.) A maintenance Fee of 15$ paid in USDC will be charged on a monthly basis per Protostar</h4>
                                                    <h4>2.) 10 NeFi tokens are needed in order to create a Protostar, once it has been created the tokens are non-refundable and cannot be returned.</h4>
                                                    <h4>3.) Please be sure to read our documents thoroughly for all distribution percentages</h4>

                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab-3">
                                    <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <h1 className="blink_me">COMING SOON...</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab-4">
                                    <div className="container cont_dash">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="main_swap">
                                                    <h3>Swap</h3>
                                                    <form>
                                                        <span className="elem_span ">From</span>
                                                        <label className="elem_span ">
                                                        <input className="txtss_feild "  placeholder="0.00 " type="text" name="name" />
                                                        <span className="lab_span dcl">AWAX</span>
                                                        </label>
                                                        <div className="icon-exchnnage"> 
                                                            <i className='fasic fas fa-exchange-alt'></i>
                                                            <i className="fas fa-sliders" aria-hidden="true"></i>
                                                        </div>
                                                        <label className="elem_span ">
                                                        <span className="elem_span ">To</span>
                                                        <input className="txtss_feild "  placeholder="0.00 " type="text" name="name" />
                                                        <span className="lab_span dcl">nebula</span>
                                                        </label>
                                                    </form>
                                                    <div className="price_table mt-5">
                                                        <span className="elem_span dib">Price</span>
                                                        <span className="elem_span dib righrspan">0 NEBUlA per AWAX</span>
                                                    </div>
                                                    <div className="price_table">
                                                        <span className="elem_span dib">Auto Slippage</span>
                                                        <span className="elem_span dib float-right">Active</span>
                                                    </div>
                                                    <div className="price_table mb-3">
                                                        <span className="elem_span dib">Minimum Received</span>
                                                        <span className="elem_span dib float-right">0.000</span>
                                                    </div>
                                                    <div className="submit_btn">
                                                        <button type="button" className="btn  btn_swap">Swap</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab-5">
                                    <div className="row">
                                    <div className="col-sm-12">
                                    <h1 className="blink_me">COMING SOON...</h1>
                                    </div> </div>
                                </div>
                                <div className="tab-pane" id="tab-6">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="feature-img">
                                                <img src="images/user-img-1.jpg" alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                        <div className="col-lg-8 details">
                                            <h3 className="mt-3">Why do we use it?</h3>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      
    );
    };
  
export default Dapp;