import { Link } from "react-router-dom";

const ErrorPayment = () => {
  return (
    <div className="sm:mx-4 md:mx-8 lg:mx-16  xl:mx-32">
      <div className="mt-20 text-xl">
          The requested operation could not be completed. Please try again later. 
          <br/>If the
          problem persists, contact your credit card provider.
        </div>
        <div>          
          <Link to="/payment">
            <button className="bg-black text-white px-6 mt-6">
              Payment
            </button>
          </Link>       
        
            {/* <Link to="/home">
              <button className="bg-black text-white px-6 mt-6 ml-12">
                 Home
              </button>
            </Link>   */}
            </div>
      </div>
  );
};

export default ErrorPayment;
