import axios from 'axios'
import React, { useState } from 'react'

export default function SecondQ() {
  const url = 'http://localhost:8080/v1/ports'
  const [json, setJson] = useState()

  async function getPorts() {

    const resp = await axios ({
      method: "GET",
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(resp => {
      setJson(resp.json())
    })

  }





  return (
    <>
    <input type="button" onClick={getPorts}/>
    <div>{json}</div>
    </>
  )
}
