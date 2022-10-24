import { Link } from "react-router-dom"

const CancelPaymentError = () =>{
    return(
        <div className="sm:mx-4 md:mx-8 lg:mx-16  xl:mx-32">
            <div className="mt-20 text-xl">
            The requested operation could not be completed. 
            <br/>Please wait a few minutes and try again.
            </div>
            <div>
                <Link to="/Home">
                    <button className="bg-black text-white px-6 mt-6"> 
                        Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CancelPaymentError;