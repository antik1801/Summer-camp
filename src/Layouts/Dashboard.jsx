import React from "react";
import Container from "../components/Shared/Container";
import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaAmazon, FaWallet } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Container>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center ">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side bg-slate-400 rounded-2xl mb-2">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full  text-base-content">
            {/* Sidebar content here */}
            <li>
              <NavLink
                to="/dashboard/myclasses"
                className={`${({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""}`}
              >
               <FaShoppingCart/> My Selected Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/enrolled"><FaAmazon /> My Enrolled Classes</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/paymentHistory"><FaWallet /> My Payment History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
