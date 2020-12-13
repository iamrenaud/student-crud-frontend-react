import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';


const Student = ({ id, name, email, enrollnumber, removeStudent }) => {

  return(
    <tr>
      <td>{ name }</td>
      <td>{ email }</td>
      <td>{ enrollnumber }</td>
      <td>
        <button onClick={ () => removeStudent(id) } className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: id }}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>

    </tr>
  );
};

export default Student;
