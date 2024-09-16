import React, { useState } from 'react'
import './QrcodeGen.css'
export const QrCodeGen = () => {
  const [img, setImg] = useState()
  const [loading, setLoading] = useState(false)
  const [Qrdata, setqrData] = useState("")
  const [qrSize, setqrSize] = useState("150")
  //console.log(sample)
  async function GenQr() {
    setLoading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(Qrdata)}`
      setImg(url)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  function DownloadQr() {
    fetch(img).then((response) => response.blob()).then((blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob)
      link.download = "qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })).catch(error => {
      console.log(error)
    })

  }

  return (
    <div className='app_container'>
      <h1>QR code Generator</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="Qr code" className='QrImage' />}
      <div>
        <label htmlFor='dataInput' className='labal_input'> Data for QR code</label>
        <input type='text' onChange={(e) => setqrData(e.target.value)} id="dataInput" placeholder='Enter data for Qr code' />

        <label htmlFor='sizeInput' className='labal_input'> Size of the image</label>
        <input type='number' onChange={(e) => setqrSize(e.target.value)} id="sizeInput" placeholder='Enter image size' />
        <button className='generate_btn' onClick={GenQr}>Generate QR Code</button>
        <button className='download_btn' onClick={DownloadQr}>Download QR Code</button>

      </div>

    </div>
  )
}
