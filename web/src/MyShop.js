import React, { Component } from 'react'
import Navbar from './Navbar'
import AddIcon from '@mui/icons-material/Add'

export default class MyShop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: "",
      productPrice: 0,
      uploadImage: null,
    }
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({
        uploadImage: reader.result,
        uploadFileName: file.name
      })
    }

    reader.readAsDataURL(file)
  }

  createProduct(name, price) {
    const { account, createProduct, getAllProducts } = this.props
    const { uploadFileName } = this.state

    createProduct(account, name, price, './' + uploadFileName).then(() => {
      getAllProducts()
      window.location.reload()
    })
  }

  render() {
    const { productName, productPrice, uploadImage } = this.state
    const { account, balance, products } = this.props
    return (
      <div>
        <Navbar account={account} balance={balance} />
        <div className="w-100 flex justify-center font-extrabold text-4xl mb-16 mt-24">我的架上商品</div>
        <div className="w-100 flex justify-center flex-wrap pl-24 pr-24">
          <div className="card w-80 h-80 bg-base-100 shadow-xl mb-12 mr-6 ml-6 flex justify-center items-center transform hover:translate-y-[-10px] transition duration-300 ease-in-out cursor-pointer" onClick={()=>window.my_modal_3.showModal()}>
            <AddIcon fontSize="large" />
          </div>
          {
            products.map((item, i) => {
              if (item.owner === account && !item.purchased) {
                return (
                  <div key={i} className="card w-80 h-80 bg-base-100 shadow-xl mb-12 mr-6 ml-6">
                    <figure><img src={require(`${item.img}`)} alt="Watch" className="h-56 w-full object-cover" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">
                      {item.name}
                        {item.purchased === false ? <div className="badge bg-amber-200">NEW</div> : <div className="badge bg-red-600 text-white">SOLD</div>}
                      </h2>
                      <p>{`${item.price} ETH`}</p>
                    </div>
                  </div>
                )
              }
              else return (<div></div>)
            })
          }
          <div className="w-80 mb-12 mr-6 ml-6"></div>
          <div className="w-80 mb-12 mr-6 ml-6"></div>

          <dialog id="my_modal_3" className="modal">
            <form method="dialog" className="modal-box w-96">
              <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <div className="font-bold text-2xl mb-12">填寫商品資訊</div>
              <div className="flex items-center mb-6">
                <div className="text-base mr-6">名稱</div>
                <input type="text" placeholder="" className="input input-bordered input-sm w-64 max-w-xs" value={productName} onChange={(e) => this.setState({ productName: e.target.value })} />
              </div>
              <div className="flex items-center mb-6">
                <div className="text-base mr-6">價格</div>
                <input type="text" placeholder="" className="input input-bordered input-sm w-64 max-w-xs" value={productPrice} onChange={(e) => this.setState({ productPrice: e.target.value })} />
              </div>
              <div className="mb-3">
                <div className="text-base mr-6 mb-3">上傳商品圖片</div>
                <div>
                  {
                    uploadImage !== null ?
                    <img src={uploadImage} alt="upload" className="w-20 h-20 object-cover rounded"  />
                    : <label className="relative w-20 h-20 text-center cursor-pointer outline-dashed rounded outline-gray-400 flex justify-center items-center hover:outline-black">
                        <input type="file" accept="image/*" onChange={(e) => this.handleFileChange(e)} style={{ display: "none" }} />
                        <AddIcon />
                      </label>
                  }
                </div>
              </div>
              <div className="flex justify-between">
                <div />
                <button className="btn btn-sm hover:bg-slate-500 hover:text-white" onClick={() => this.createProduct(productName, productPrice)}>Ok</button>
              </div>
            </form>
          </dialog>
        </div>
        <div className="w-100 flex justify-center font-extrabold text-4xl mb-16 mt-24">購買記錄</div>
        <div className="w-100 flex justify-center flex-wrap pl-24 pr-24">
          {
            products.map((item, i) => {
              if (item.owner === account && item.purchased) {
                return (
                  <div key={i} className="card w-80 h-80 bg-base-100 shadow-xl mb-12 mr-6 ml-6">
                    <figure><img src={require(`${item.img}`)} alt="Watch" className="h-56 w-full object-cover" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <p>{`${item.price} ETH`}</p>
                    </div>
                  </div>
                )
              }
              else return (<div></div>)
            })
          }
          <div className="w-80 mb-12 mr-6 ml-6"></div>
          <div className="w-80 mb-12 mr-6 ml-6"></div>
          <div className="w-80 mb-12 mr-6 ml-6"></div>
        </div>
      </div>
    );
  }
}

