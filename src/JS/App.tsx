import { useState, useEffect } from 'react';
import Header from "./Components/Header.tsx";
import Device from './Components/Device.tsx';

function App() {
  const [connectedDevices, setConnectedDevices] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try{
      setConnectedDevices([1,2,3]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <>
      <Header />
      <div className="container p-3">
        <h1 className="pb-2">Connected devices</h1>
        {loading ? (
          <div className="spinner-border spinner-color" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : connectedDevices.map((device, index) => (
          <Device key={index} device={device} deviceNr={index}/>
        ))}
      </div>
    </>
  )
}

export default App
