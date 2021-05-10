import React from 'react'
import NavBar from './components/NavBar'
import Searcher from './Searcher'
import UploadFile from './UploadFile/UploadFile'

function Home() {
    return (
        <div>
            <NavBar/>
            <UploadFile/>
        </div>
    )
}

export default Home
