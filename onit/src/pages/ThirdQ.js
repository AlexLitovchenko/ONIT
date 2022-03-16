import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
export default function ThirdQ() {
  const [json, setJson] = useState('hello')

  const [tumbler, setTumbler] = useState(false)
  const [marka, setMarka] = useState()
  const [model, setModel] = useState()
  const url = 'http://localhost:8080/v3/'
  const [jsonData, setJsonData] = useState()
  const [displayData, setDisplayData] = useState()
  const [trContent, setTrContent] = useState()
  const [trTumbler, setTrTumbler] = useState(false)


  useEffect(function stringify() {
    setJson(JSON.stringify({ marka, model }))
  })

  useEffect(() => {
    if (tumbler == false) {
      getAuto()
    }
    // console.log(jsonData)
  })

  async function getAuto() {
    await axios({
      url: url + "GetAuto",
      method: "GET"
    }).then(resp => {
      setJsonData(resp.data)
    }).catch(e => {
      console.log(e)
    })
    getData()
    setTumbler(true)
  }

  function editTr(_id) {
    setTrContent(document.getElementById(_id).innerHTML)
    console.log(trContent)
    document.getElementById(_id).innerHTML = ReactDOMServer.renderToString(<Ee _id={_id} />)
  }

  function tumblerTr(_id) {
    console.log(trContent)  
    document.getElementById(_id).innerHTML = trContent
  }

  function Ee(props) {
    const _id = props._id
    return (
      <tr>
        <td> {_id} </td>
        <td> <input type='text' onChange={e => setMarka(e.target.value)} required /> </td>
        <td> <input type='text' onChange={e => setModel(e.target.value)} required /> </td>
        <td> <input type='button' onClick={editAuto(setTrTumbler(!trTumbler), _id)} value='Edit Auto' /> </td>
        <td> <input type='button' onClick={tumblerTr(_id)} value='Back' /> </td>
      </tr>
    )
  }

  async function editAuto(_id) {
    if (trTumbler) {
      console.log(model, marka)
      await axios({
        url: url + "UpdateAuto/" + _id,
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: json
      }).catch(e => {
        console.log(e)
      })
      setTrTumbler(!trTumbler)
    }
    setTumbler(false)
  }

  async function deleteAuto(_id) {
    // if (delTumbler) {
    await axios({
      url: url + "DelAuto/" + _id,
      method: "GET"
    }).catch(e => {
      console.log(e)
    })

    setTumbler(false)
    // }
    // setDelTumbler(false)
  }

  async function addAuto() {
    await axios({
      url: url + "AddAuto",
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: json
    }).catch(e => {
      console.log(e)
    })
    setTumbler(false)
  }

  // useEffect(function getGet(){
  //   getAuto()
  // })

  function getData() {
    if (jsonData !== undefined) {
      setDisplayData(jsonData.map(
        (info) => {
          return (
            <tr id={info.id} >
              <td>{info.id}</td>
              <td>{info.marka}</td>
              <td>{info.model}</td>
              <td>
                <input type="button" value="Delete" onClick={e => deleteAuto(info.id)} />
              </td>
              <td>
                <input type="button" value="Edit" onClick={e => editTr(info.id)} />
              </td>
            </tr>
          )
        })
      )
    }
    else console.log('undef')
  }

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Mark</th>
            <th scope="col">Model</th>
            <th scope='col'>Buttons</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {displayData}
        </tbody>
      </table>
      <input type='text' onChange={e => setMarka(e.target.value)} />
      <input type='text' onChange={e => setModel(e.target.value)} />
      <input type='button' onClick={e => addAuto(e)} value='Add Auto' />


    </>
  )
}
