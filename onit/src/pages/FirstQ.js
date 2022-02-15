import React, { Fragment, useState, useEffect } from 'react'
// import FileReaderInput from 'react-file-reader-input';
import axios from 'axios'


function FirstQ() {

    const [json, setJson] = useState()
    const [ades, setAdes] = useState('')

    function setAd() {
        console.log(document.getElementById('option').value)
        if (document.getElementById('option').value === '1') {
            setAdes('des')
        }
        else {
            setAdes('aes')
        }
        console.log(ades)
    }

    async function getHash(e) {
        // e.preventDefault()
        

        console.log(ades)
        await axios({
            url: 'http://localhost:8080/v1+{ades}',
            method: "POST",
            data: json
        }).then(resp => {
            console.log(resp)
        })

        
    }



    // const [value, setValue] = useState('')
    var output = ''
    function getPath(e) {
        // e.preventDefault()
        const file = document.getElementById('txtFile')
        // setPath(file.value)
        // console.log(path)
        console.log(file.value)
        const reader = new FileReader()
        reader.onload = function (e) {
            output = document.getElementById("output")
            output.textContent = e.target.result
            setJson(output.textContent)
            console.log(output)
        }

        reader.onerror = function (e) {
            console.log(reader.error)
        }

        reader.readAsText(e.target.files[0])


    }


    return (
        <>
            <form onSubmit={getHash}>
                <p>Pick only .txt file</p>
                <input type="file" id="txtFile" accept=".txt" onChange={e => getPath(e)} required /><br /><br />
                {/* <input type='text' id="output" ></input><br/><br/> */}
                <p id="output" />
                <select id="option" onChange={e=>setAd(e)} defaultValue={'1'} required>
                    <option value='1'>DES method</option>
                    <option value='2'>AES method</option>
                </select>

                <input type='submit' />
            </form>

        </>
    )
}

export default FirstQ
