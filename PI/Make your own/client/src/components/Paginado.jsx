import React from "react";

export default function Paginado ({charactersPerPage, charactersFilter, paginado, currentPage}){
    const pageNumbers = []


   

    for (let i = 1; i<=Math.ceil(charactersFilter/charactersPerPage); i++){
        pageNumbers.push(i)
    }

    function handlePrev(){
		if (currentPage <= 1) return;
		paginado(currentPage - 1);
    }

    function handleNext(){
        if (currentPage >= pageNumbers.length) return; 
		paginado(currentPage + 1);
    }
    return (
        
    <div className="botonera">
       
       {currentPage===1 ? <div></div> : 
        <button onClick={()=>handlePrev()} > prev </button>
        }
  
        <span className="paginado">
            { pageNumbers && pageNumbers.map(number =>(
                <button className="number" key={number.id} onClick={()=> paginado(number)}>{number}</button>
             
                ))}
            </span>
    
       {currentPage === pageNumbers.length ? <div></div> : 
        <button onClick={()=>handleNext()} > next </button>
        }
    
    </div>
    )
}

