import React, {useState} from 'react';
import JSONDATA from "../../foro.json";
import "./forum.css"

/*
const Forum = () => (
    <div className="container">
        <input type="text" placeholder="Buscar..."/>
        {JSONDATA.map((val,key) => {
            return(
                <div className="user" key={key}>        
                    <p>{val.first_name}</p>
                </div>

            );
        })}
    </div>
    );
*/

function Forum() {
    const [searchTerm, setSearchTerm] = useState('')

    return(
    <div className="container">
        <input type="text" 
            placeholder="Buscar..." 
            onChange={event => {setSearchTerm(event.target.value)}}
        />
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pregunta</th>
                </tr>
            </thead>
            <tbody>

            {JSONDATA.filter((val) => {
                if (searchTerm == "") {
                    return val
                } else if (val.questions.toLocaleLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
                }).map((val,key) => {
                return(
                    <tr className="user" key={key}>        
                        <td>{val.first_name}</td>
                        <td>{val.last_name}</td>
                        <td>{val.questions}</td>
                    </tr>

                );
            })}
        </tbody>
        </table>
        <br></br>
    </div>
    );
}


export default Forum;
