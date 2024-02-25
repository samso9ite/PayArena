import { FailedTag, PendingTag, SuccessTag } from "../utils";

export default function MainTable() {
    return (
        <div className="mt-4">
            <div className="table-responsive">
                <table className="table">
                    <thead className="">
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Transaction Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Product</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">2939SDF</th>
                            <td>Verification check</td>
                            <td>₦38900.00</td>
                            <td>IdentityPass</td>
                            <td>28 Nov 2022. 9:00AM</td>
                            <td><SuccessTag /></td>
                        </tr>
                        <tr>
                            <th scope="row">2939SDF</th>
                            <td>Verification check</td>
                            <td>₦38900.00</td>
                            <td>IdentityPass</td>
                            <td>28 Nov 2022. 9:00AM</td>
                            <td><FailedTag /></td>
                        </tr>
                        <tr>
                            <th scope="row">2939SDF</th>
                            <td>Verification check</td>
                            <td>₦38900.00</td>
                            <td>IdentityPass</td>
                            <td>28 Nov 2022. 9:00AM</td>
                            <td><PendingTag /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
