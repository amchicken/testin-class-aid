import React,{useRef,useState} from 'react';
import axios from 'axios';
import {addCourseURL} from '../api';
import {Redirect} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {loadCourse} from '../actions/courseAction'

function AddCoursePage(){
    const dispatch = useDispatch();
    const [success,setSuccess] = useState(false);
    const login = useSelector((state) => state.login);
    const name = useRef("");
    const code = useRef("");

    function addCourseHandle(e){
        e.preventDefault();
        console.log(`${name.current.value}:${code.current.value}`);
        axios.post(addCourseURL(),{
            name: name.current.value,
            course: code.current.value,
          },
          {
            headers: {
              "auth-token": `${login.token}`,
            },
          }).then(res=>{
              dispatch(loadCourse());
              setSuccess(true);
              console.log(res);
          }).catch(err=>{
              console.log(err.response);
          })
    }

    return <div className="addCourse">
        {success ? <Redirect to="/" /> : ""}
        <h1>Add New Course</h1>
        <form onSubmit={addCourseHandle}>
            <div className="groupInput">
                <label htmlFor="CourseName">CourseName</label>
            <input type="text" required ref={name}/>
            </div>
            <div className="groupInput">
                <label htmlFor="CourseCode">CourseCode</label>
            <input type="text" required ref={code}/>
            </div>
            <button type="submit">Add Course</button>
        </form>
    </div>
}

export default AddCoursePage;