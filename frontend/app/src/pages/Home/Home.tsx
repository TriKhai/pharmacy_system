// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import axiosClient from '../../config/axios';

function Hello() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axiosClient.get('/api/v1/', {
      responseType: 'text'  
    })
    .then((res) => {
      setMessage(res.data);  
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
      setMessage("Lỗi khi kết nối đến backend");
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{message}</h1>
    </div>
  );
}

export default Hello;
