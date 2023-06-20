import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import user from './no.jpg'
import LocalMallIcon from '@mui/icons-material/LocalMall'

export default class Navbar extends Component {
  render() {
    const { account, balance } = this.props
    return (
      <div>
        <div className="navbar bg-slate-500">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost normal-case text-xl text-white font-extrabold">YCC の 小舖</a>
          </div>
          <div className="flex-none">
            <div className="mr-2">
              <div className="btn btn-ghost btn-circle">
                <Link to="/myshop"><LocalMallIcon style={{ color: "white" }} /></Link>
              </div>
            </div>
            <div className="dropdown dropdown-end z-10">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-3">
                <div className="w-40px rounded-full">
                  <img src={user} alt="avatar" />
                </div>
              </label>
              <div tabIndex={0} className="menu menu-sm dropdown-content shadow bg-base-100 rounded-box w-fit">
                <div className="card lg:card-side">
                  <figure><img src={user} alt="user" className="rounded-full w-24 h-24" /></figure>
                  <div className="card-body">
                    <h1 className="card-title">User</h1>
                    <div className="rating">
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-200" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-200" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-200" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-200" />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-200" checked />
                    </div>
                    <div className="text-sm mt-3">{`Balance: ${balance} ETH`}</div>
                    <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap w-52">{account}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}