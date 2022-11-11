import React, { useState } from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userID) => {
        setUsers(prevState => prevState.filter(item => item._id !== userID))
    }

    const renderPhrase = (number) => {
        let text = '';
        let numberUsers = String(number);
        (numberUsers.endsWith('2')|| numberUsers.endsWith('3') || numberUsers.endsWith('4')) && !numberUsers.endsWith('12')  ? 
        text = users.length + " человека тусанут с тобой сегодня" :
        text = users.length + " человек тусанет с тобой сегодня"
        return text;
    };
    
    const classesPhrase = () => {
        return users.length > 0 ? "badge bg-primary m-2" : "badge bg-danger m-2";

    };

    
    return users.length > 0 ? (
        <>
        <h3>
            <span className={classesPhrase()}>
                {renderPhrase(users.length)}
            </span>
        </h3>
        <table className = "table table-striped table-bordered">
            <thead>
             <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                return (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((item) => {
                                    return (
                                        <span key={item._id} className={"badge m-1 bg-" + item.color}>{item.name}</span>
                                    )                      
                                })}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}/5</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>                  
                    )
                })}
                
            </tbody>
    </table>
    </>
    ) :  
    (<h3>
        <span className={classesPhrase()}>
            Никто с тобой не тусанет
        </span>
    </h3>)
};

export default Users;