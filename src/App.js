import React from 'react'
import './css/common.css'
import './css/style.css'
import List from '../src/layout/List'


function App() {
    return (
        <div className="wrapper">
            <div className="bar">
                <span className="floatLeft">PLAZA</span>
                하이텔
                <span className="floatRight">1/100(총 100R건)</span>
            </div>
            <div><List /></div>
        </div>
    );
}

export default App;
