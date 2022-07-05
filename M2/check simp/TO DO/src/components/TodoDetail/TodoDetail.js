import React, { useEffect } from "react";
import { connect } from "react-redux";
import { removeTodo, toInProgress, toDone } from "../../actions";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './TodoDetail.module.css'

function TodoDetail(props) {
    const params = useParams()
    const toDo = props.state.filter(todo => todo.id.toString() === params.id)
    const detail = toDo[0]

    useEffect(()=>{
        
    },[props.state])

    return (
        <div>
            <h3>Title: {detail.title}</h3>
            <h4>Description: {detail.description}</h4>
            <h4>Date: {detail.date}</h4>
            <h4>Place: {detail.place}</h4>
            <h4>Status: {detail.status}</h4>
            <Link to='/'><button onClick={() => props.toDone(detail.id)}>DONE</button></Link>
            <Link to='/'><button onClick={() => props.toInProgress(detail.id)}>IN PROGRESS</button></Link>
            <Link to='/'><button onClick={() => props.removeTodo(detail.id)}>DELETE</button></Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        state
    }
}
export default connect(mapStateToProps, {removeTodo, toInProgress, toDone})(TodoDetail)