import { useEffect, useState } from "react";


const useFetchData = (selectedFile) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log('selectedFile',selectedFile);
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/files/data?fileName=${selectedFile}`)
          .then((response) => {
            if(response.status == 404){
              throw new Error("This file is not available");
            }
            if (!response.ok) {
              throw new Error("Failed to fetch data from the server. Please try again later.");
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
            setError(null);
          })
          .catch((error) => {
            if(error.status === 404) {
              setError("This file is not available")
            } else {
              setError(error.message);
            }
            setLoading(false);
          });
      }, [selectedFile]);
      return { data, loading, error };
};

export default useFetchData;