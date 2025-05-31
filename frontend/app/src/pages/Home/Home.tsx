// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function Hello() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios.get('http://localhost:8000/hello', {
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
      <h1 className="text-2xl font-bold mb-2">Hello World!</h1>
      <p className="text-gray-700">Connecting backend: {message}</p>
    </div>
  );
}

export default Hello;
