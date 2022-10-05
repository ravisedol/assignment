import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Api } from '../services/Api';

function Home(){

    let navigate = useNavigate();

    let initalValue = {
        full_name: "",
        email: "",
        roles:"",
    };

    let [state,setState] = useState(initalValue);
    let [formValid,setFormValid] = useState({});
    let [isSubmit,setIsSubmit] = useState(false);
    let [msg,setMsg] = useState({
        errorMsg:"",
        warnMsg:"",
        isload: false
    })

    // Set form value when change
    const handleInput = (e) => {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    // Predefined roles
    const roles_data = ["","Author", "Editor", "Subscriber", "Administrator"];
    const roles = roles_data.map((item,index) => 
        (index == 0)? <option key={index} value="">--Select Role--</option> :
        <option key={index} value={item}>{item}</option>
    );

    // Form Submit
    const formSubmit = (e) => {
        e.preventDefault();
        // Set validattion
        setFormValid(validate(state));
        // set submit true
        setIsSubmit(true);
    }

    // Validate Form
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.full_name){
            errors.full_name = "Full name is required!";
        } else if(values.full_name.length < 4) {
            errors.full_name = "Full name must be more than 4 characters!";
        }
        if(!values.email){
            errors.email = "Email is required!";
        } else if(!regex.test(values.email)){
            errors.email = "This is not a valid email format!";
        }
        if(!values.roles){
            errors.roles = "Role is required!";
        }
        return errors;
    }

    useEffect(() => {

        if(Object.keys(formValid).length === 0 && isSubmit){
            
            setMsg({
                isload: true
            })

            // Send data to api
            Api.add(state).then((res) => {
                let result = res.data;

                setMsg({
                    isload:false
                }) 

                if(result.status == 1){
                    navigate('/users');
                }
                if(result.status == 0){
                    setMsg({
                        warnMsg: result.message
                    })
                }
                if(result.status == 'error'){
                    let error = JSON.parse(result.errors);
                    // console.log(error.email[0]);
                    if(error.email[0]){
                        setMsg({
                            errorMsg: error.email[0]
                        })
                    }
                }

            })

        }
    },[formValid])



    return(
        <>
            <div className="container-fluid p-4">

                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end py-2">
                            <Link to="/users" className='btn btn-sm btn-warning'>User List</Link>
                        </div>
                        <div className="border p-2">
                            <div className="text-center p-2">
                                <h6 className="text-uppercase text-info">Add User</h6>
                            </div>
                            <form onSubmit={formSubmit} autoComplete="off">
                                <div className="form-group mb-3">
                                    <input type="text" name="full_name" onChange={handleInput} value={state.full_name} placeholder="Full Name" className="form-control" />
                                    <span className="text-danger">{formValid.full_name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="email" name="email" onChange={handleInput} value={state.email} placeholder="Email Address" className="form-control" />
                                    <span className="text-danger">{formValid.email} {msg.errorMsg}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <select name="roles" onChange={handleInput} className="form-control">
                                        {roles}
                                    </select>
                                    <span className="text-danger">{formValid.roles}</span>
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit"   disabled={msg.isload} className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}


export default Home;