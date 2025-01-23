import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/files/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server. Please try again later.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please check your server or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-white bg-danger py-2">React Test App</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fileData, index) => (
            <React.Fragment key={index}>
              {fileData.lines.length > 0 ? (
                fileData.lines.map((line, lineIndex) => (
                  <tr key={`${index}-${lineIndex}`}>
                    <td>{fileData.file }</td>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>{line.hex}</td>
                  </tr>
                ))
              ) : (
                <tr key={`${index}-no-data`}>
                  <td>{fileData.file}</td>
                  <td colSpan="3" className="text-center text-muted">
                    No data available
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
