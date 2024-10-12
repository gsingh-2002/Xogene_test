import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const DrugDetails = () => {
    const {drugName} = useParams();
    const[drugDetails, setDrugDetails] = useState(null);
    const[error, setError] = useState('');

    console.log(drugName)
    console.log(drugDetails)



    useEffect(()=>{
        const fetchDetails = async ()=>{
            try {
                const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`);
                
                setDrugDetails(res.data.drugGroup.conceptGroup[1].conceptProperties[0]);
                console.log(res)
            } catch (error) {
                console.log(error)
                setError("Error while fetching drug details. Please try again.");
            }
        }

        fetchDetails();
    },[drugName])


    if(error) return <div>{error}</div>

  return (
    <div>
        <Link to="/">Home</Link>
        {drugDetails ? (
            <div>
                <p>RXCUI: {drugDetails.rxcui}</p>
                <p>Name:  {drugDetails.name}</p>
                <p>Synonym: {drugDetails.synonym}</p>
                <div>
                    NDCs Associated:
        
                </div>



            </div>
        ):(
            <div>
                Loading.....
            </div>
        )}
    </div>
  )
}

export default DrugDetails