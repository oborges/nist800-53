import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panel(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(props.endpoint);
      setData(result.data.open_ips);
    };
    fetchData();
  }, [props.endpoint]);

  return (
    <div className="panel">
      <div className="panel-title">{props.title}</div>
      <ul className="panel-list">
        {data.map((ip, index) => (
          <li key={index}>{ip}</li>
        ))}
      </ul>
    </div>
  );
}

export default Panel;

