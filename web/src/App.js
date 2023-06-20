import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Main from './Main'
import MyShop from './MyShop'
import Web3 from 'web3'
import CONTRACT_JSON from './contracts/Marketplace'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: "",
      balance: 0,
      allProducts: [],
    }
  }
  
  async componentDidMount() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    if (accounts.length === 0) {
      console.log("There was an error fetching your accounts.");
      return;
    }

    let account = accounts[0];
    this.setState({ account: account })

    let balance = await web3.eth.getBalance(account)
    balance = web3.utils.fromWei(balance, 'ether')
    this.setState({ balance: Number(balance).toFixed(2) })

    await this.getAllProducts()
  }

  async getAllProducts() {
    const web3 = window.web3
    let contract = new web3.eth.Contract(CONTRACT_JSON.abi, CONTRACT_JSON.networks[5777].address)
    let productCount = await contract.methods.productCount().call()

    const products = []

    for (let i = 1; i <= productCount; i++) {
      const product = await contract.methods.products(i).call()
      product.price = web3.utils.fromWei(product.price, 'ether')

      products.push(product)
    }

    this.setState({ allProducts: products })
  }

  async createProduct(account, name, price, img) {
    const web3 = window.web3
    let contract = new web3.eth.Contract(CONTRACT_JSON.abi, CONTRACT_JSON.networks[5777].address)
    await contract.methods.createProduct(name, price, img).send({from: account})
  }

  async purchaseProduct(account, id, price) {
    const web3 = window.web3
    let contract = new web3.eth.Contract(CONTRACT_JSON.abi, CONTRACT_JSON.networks[5777].address)
    await contract.methods.purchaseProduct(id).send({from: account, value: web3.utils.toWei(price, 'ether') })
  }
  
  render () {
    const { account, balance, allProducts } = this.state
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Main account={account} balance={balance} products={allProducts} purchaseProduct={this.purchaseProduct} getAllProducts={() => this.getAllProducts} />} />
            <Route exact path="/myshop" render={() => <MyShop account={account} balance={balance} products={allProducts} createProduct={this.createProduct} getAllProducts={() => this.getAllProducts} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

