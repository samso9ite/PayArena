import React from 'react'
import { FailedTag, SuccessTag } from '../../../../utils'

export default function PassVerificationHistoryComp
() {
  return (
    <div className='my-4'>
        <div className="table-responsive">
            <table className="table">
                <thead className="">
                    <tr>
                        <th scope="col">SN</th>
                        <th scope="col">Name</th>
                        <th scope="col">Identifier</th>
                        <th scope="col">Date</th>
                        <th scope="col">Country of Origin</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Ade Badmus</td>
                        <td>NIN Verification</td>
                        <td>25 Jan 2023. 1:00AM</td>
                        <td>Nigeria</td>
                        <td><SuccessTag /></td>
                        <td>
                            <button className='btn btn-view'>
                                <i className='ri-eye-line me-3 ri-xl'/>
                                View Result
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Ade Badmus</td>
                        <td>NIN Verification</td>
                        <td>25 Jan 2023. 1:00AM</td>
                        <td>Nigeria</td>
                        <td><FailedTag /></td>
                        <td>
                            <button className='btn btn-view'>
                                <i className='ri-eye-line me-3 ri-xl'/>
                                View Result
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
