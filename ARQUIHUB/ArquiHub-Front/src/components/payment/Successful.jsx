import { Link } from "react-router-dom";

const Successful = () => {
  return (
    <div className="sm:mx-4 md:mx-8 lg:mx-16  xl:mx-32">
      <div className="mt-20 text-xl">
        Congratulations! You are a Premium member. <br/>You can publish, you can
        create unlimited projects and you can now set your projects to private.
      </div>
      <div className="mt-6">
        <Link to="/home">
          <button className="bg-black text-white px-6 mt-6">
            Home
          </button>  
        </Link>
      </div>
    </div>
  );
};

export default Successful;
