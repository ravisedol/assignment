import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Api } from '../services/Api';


function User(){

    let [state,setState] = useState({
        isload: false,
        msg:"",
        data:[]
    });


    // Predefined roles
    const roles_data = ["","Author", "Editor", "Subscriber", "Administrator"];
    const roles = roles_data.map((item,index) => 
        (index == 0)? <option key={index} value="">--Fliter Role--</option> :
        <option key={index} value={item}>{item}</option>
    );

    // Onchage role
    const handleInput = (e) => {
        const {name, value} = e.target;
        // console.log(value);
        fetchData(value);
    }


    // Fetch data function
    const fetchData = (search) => {

        setState({
            isload: true
        })

        Api.getdata(search).then((res) => {

            setState({
                isload: false
            })

            let result = res.data;

            // console.log(result);

            if(result.status == 1){
                setState({
                    data: result.data,
                    msg: result.message
                })
            }

        });
    }


    useEffect(() => {

        fetchData(null);

    },[])


    // Data table
    let tableData = state.data? state.data.map((item,index) => {
        return (
            <tr key={index}>
                <td>{(index+1)}</td>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.roles}</td>
            </tr>
        )
    }) : <tr><td colSpan={4} className="text-center">Data Not Found</td></tr>
    
    

    return(
        <>
            <div className="container-fluid p-4">

                <div className="row justify-content-center">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-end py-2">
                            <Link to="/" className='btn btn-sm btn-warning'>Add User</Link>
                        </div>
                        <div className="border p-2">
                            <div className="text-center p-2">
                                <h6 className="text-uppercase text-info">User List</h6>
                                {
                                    state.isload? <span className="text-danger">Loading....</span> : <span className="text-success">{state.msg}</span> 
                                }
                            </div>
                            <div className="py-2">
                                <select name="roles" onChange={handleInput}>
                                    {roles}
                                </select>
                            </div>
                            
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Roles</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}


export default User;