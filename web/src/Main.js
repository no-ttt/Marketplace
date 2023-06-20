import React, { Component } from 'react'
import Navbar from './Navbar'
import MainBackground from './mainBackground.jpg'

export default class Main extends Component {
  purchaseProduct(id, price) {
    const { account, purchaseProduct, getAllProducts } = this.props
    purchaseProduct(account, id, price).then(() => {
      getAllProducts()
      window.location.reload()
    })
  }

  render() {
    const { products, account, balance } = this.props
    return (
      <div>
        <Navbar account={account} balance={balance} />
        <div className="hero relative mt-12">
          <img src={MainBackground} alt="background" />
          <div className="hero-content flex-col lg:flex-row-reverse absolute left-0">
            <div className="ml-60">
              <div className="text-7xl font-bold mb-3 text-blue-950">Welcome to</div>
              <div className="text-7xl font-bold mb-6">our shop!</div>
              <button className="btn ml-3 mt-6 bg-white text-black border-none hover:bg-amber-100">Get Started</button>
            </div>
          </div>
        </div>
        <div className="w-100 flex justify-center font-extrabold text-4xl mb-16 mt-24">Our Products</div>
        <div className="w-100 flex justify-center flex-wrap pl-24 pr-24">
          {
            products.map((item, i) => (
              <div key={i} className="card w-80 bg-base-100 shadow-xl mb-12 mr-6 ml-6">
                <figure><img src={require(`${item.img}`)} alt={`product-${item.id}`} className="h-56 w-full object-cover" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.name}
                    {!item.purchased ? <div className="badge bg-amber-200">NEW</div> : <div className="badge bg-red-600 text-white">SOLD</div>}
                  </h2>
                  <p>{`${item.price} ETH`}</p>
                  <div className="card-actions justify-end">
                    <button className={!item.purchased ? "btn hover:bg-slate-500 hover:text-white" : "btn btn-disabled"} onClick={() => this.purchaseProduct(item.id, item.price)}>Buy Now</button>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="w-80 mb-12 mr-6 ml-6"></div>
          <div className="w-80 mb-12 mr-6 ml-6"></div>
          <div className="w-80 mb-12 mr-6 ml-6"></div>
        </div>
      </div>
    );
  }
}

