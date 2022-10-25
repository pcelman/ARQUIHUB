import { Link } from "react-router-dom";

const CancelPaymentOk = () => {
  return (
    <div className="sm:mx-4 md:mx-8 lg:mx-16  xl:mx-32">      
        <div className="mt-20 text-xl">
          The subscription has been cancelled successfully. 
          <br/>Remember that you can go back to being
          Premium anytime.
        </div>
        <div>
          <Link to="/home">
          <button className="bg-black text-white px-6 mt-6">
              Home
          </button>    
          </Link>    
        </div>  
    </div>
  );
};

export default CancelPaymentOk;
