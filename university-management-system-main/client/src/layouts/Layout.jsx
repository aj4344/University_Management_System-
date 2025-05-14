import React from 'react';
import DynamicNavbar from '../components/navbars/DynamicNavbar';
import LoadingSpinner from '../components/spinners/LoadingSpinner';

export default function Layout({ isLoading, navbarOptions, navbarFunctionalItem, children }) {
  return (
    <div className='d-flex flex-column vh-100' style={{ backgroundColor: '#f8f9fa' }}>
      <div className='flex-shrink-0'>
        <DynamicNavbar options={navbarOptions} functionalItem={navbarFunctionalItem} />
      </div>
      <div className='row m-0 flex-grow-1 overflow-auto p-3'>
        <div className='col-12 col-lg-10 mx-auto'>
          {isLoading ? <LoadingSpinner /> : <>{children}</>}
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">University Management System &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
