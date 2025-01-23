
import { useState, useEffect } from "react";

const useFetchFileList = (selectedFile) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/files/list");
        if (!response.ok) {
          throw new Error("Failed to fetch file list from the server.");
        }
        const fileList = await response.json();
        setData(fileList.files);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFileList();
  }, []);

  return { data, loading, error };
};

export default useFetchFileList;
