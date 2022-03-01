import axios from 'axios'
import React, { useState } from 'react'

export default function ThirdQ() {
  const [name, setName] = useState()
  const [nickname, setNickname] = useState()
  const [age, setAge] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [clearRow, setClearRow] = useState()

  function addUser(e) {
    console.log(name, nickname, age)
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
    if (!isEdit) {
      return (<>
        <td>Andrew</td>
        <td>remixrty</td>
        <td>21</td>
      </>)
    }
    else return (<>
      <td>
        <input type={"text"} id="name" onChange={e => setName(e.target.value)} required />
      </td>
      <td>
        <input type={"text"} id="nickname" onChange={e => setName(e.target.value)} required />
      </td>
      <td>
        <input type={"text"} id="age" onChange={e => setName(e.target.value)} required />
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
          <tr> {/* первая строка */}
            <th scope="row">1</th>
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
    const json = JSON.stringify(name, nickname, age)

    await axios({
      url: 'НЕИЗВЕСТНО',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: json
    })
  }




  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Nickname</th>
            <th scope="col">Age</th>
            <th scope='col'>Buttons</th>
          </tr>
        </thead>
        <tbody>
          <SetRow />
        </tbody>
      </table>

      <form onSubmit={submit}>

        <input type={"text"} id="name" onChange={e => setName(e.target.value)} required />

        <input type={"text"} id="nickname" onChange={e => setNickname(e.target.value)} required />

        <input type={"text"} id="age" onChange={e => setAge(e.target.value)} required />

        <button type="submit" className="btn btn-dark" onClick={e => addUser(e)}>Add user</button>

      </form>

    </>
  )
}
