import axios from 'axios'
import React, { useState } from 'react'

export default function ThirdQ() {
  const [mark, setMark] = useState()
  const [model, setModel] = useState()
  let id = 0
  // const [age, setAge] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [clearRow, setClearRow] = useState()

  async function addUser(e) {
    console.log(mark, model)
    await axios({
      url: 'http://localhost:8080/v3/AddAuto',
      method: 'POST',
      data: ''
    })

  }


  const table = ''
  async function createRows() {
    await axios({
      url: 'НЕИЗВЕСТНО',
      method: 'GET'
    }).then(resp => {
      table = resp.data
    }).catch(e => {
      console.log(e)
    })

    // логика с циклом for по json массиву table из get запроса
    // разбираю каждую строку на поля name, nickname и age, добавляю 2 кнопки удалить изменить
    // каждый раз обращаться к setclearrow для рендера очередной строки

  }

  function SetClearRow() {
    // const ID = 0
    if (!isEdit) {
      id++
      return (<>
        <th scope="row">{id}</th>
        <td>BMW</td>
        <td>X5</td>
      </>)
    }
    else return (<>
      <th scope="row">{id}</th>
      <td>
        <input type={"text"} id="mark" onChange={e => setMark(e.target.value)} required />
      </td>
      <td>
        <input type={"text"} id="model" onChange={e => setModel(e.target.value)} required />
      </td>
      <td>
        <button type="button" className="btn btn-dark">Push Edits</button>
      </td>
    </>)
    // сделать логику на пуш изменений, оставлять в полях ввода старые значения
  }

  function SetRow() { //сделать функцию массивом, чтобы в нее добавлялись строки друг за другом
    return (
      <>
        <tr>
          <SetClearRow />
          <td>
            <button type="button" className="btn btn-dark">Delete user</button>
            <button type="button" className="btn btn-dark" onClick={e => setIsEdit(!isEdit)}>Edit user</button>
          </td>
        </tr>
      </>
    )

  }


  async function submit(e) {
    e.preventDefault()
    const json = JSON.stringify(id, mark, model)

    await axios({
      url: 'http://localhost:8080/v3/AddAuto',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: json
    }).catch(error =>
      console.log(error))
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
          </tr>
        </thead>
        <tbody>
          <SetRow />
        </tbody>
      </table>

      <form onSubmit={submit}>

        <input type={"text"} id="Mark" onChange={e => setMark(e.target.value)} required />

        <input type={"text"} id="nickname" onChange={e => setModel(e.target.value)} required />

        <button type="submit" className="btn btn-dark">Add user</button>

      </form>

    </>
  )
}
