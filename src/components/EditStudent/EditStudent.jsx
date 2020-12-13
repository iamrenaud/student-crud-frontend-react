import React, { Component } from 'react';
import './EditStudent.css';
import { axios } from '../../api/student-api';
import { withRouter } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

class EditStudent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			email: '',
			enrollnumber: '',
			response: ''
		};
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.enrollnumberRef = React.createRef();
	}

	onChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value });

	async componentDidMount() {
		try {
      let search = this.props.location.search;
      console.log(search);
			let id = search.substring(1, search.length);
      const student = await axios(`/student?id=${id}`);
      console.log(student);
			const { name, email, enrollnumber } = student.data.student;
			this.setState({ id, name, email, enrollnumber });
		} catch (err) {
			this.setState({ response: 'Student not found!' });
		}
	}

	updateStudentHandler = async (e) => {
		e.preventDefault();
		try {
			const student = await axios.put(`/students?id=${this.state.id}`, {
				name: this.nameRef.current.value,
				email: this.emailRef.current.value,
				enrollnumber: this.enrollnumberRef.current.value
			});
			toast(student.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });
		} catch (err) {
			toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
		}
	};

	render() {
		if (this.state.response === 'Student not found!') return <h1>Student not found!</h1>;
		return (
			<div className="Edit-Student-Wrapper">
				<h1>Edit page</h1>
				<form onSubmit={this.updateStudentHandler}>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						placeholder="Name..."
						value={this.state.name}
						name="name"
						onChange={this.onChangeHandler}
						ref={this.nameRef}
						required
						className="Edit-Student-Input"
						id="name"
					/>
					<label htmlFor="email">
						Email: <b>(must be a valid email)</b>
					</label>
					<input
						type="email"
						placeholder="Enter your email here"
						value={this.state.email}
						name="email"
						required
						onChange={this.onChangeHandler}
						ref={this.emailRef}
						className="Edit-Student-Input"
						id="email"
					/>
					<label htmlFor="enrollnumber">Enrollement Number: </label>
					<input
						type="number"
						placeholder="Enter the student's enrollment number"
						value={this.state.enrollnumber}
						name="enrollnumber"
						min="1"
						max="120"
						required
						onChange={this.onChangeHandler}
						ref={this.enrollnumberRef}
						className="Edit-Student-Input"
						id="enrollnumber"
					/>
					<button type="submit" className="Edit-Student-Submit fa fa-pencil" />
				</form>
				<ToastContainer />
			</div>
		);
	}
}

export default withRouter(EditStudent);
