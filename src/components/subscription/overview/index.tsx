
export default function SubOverview() {
    return (
        <div className="sub-overview-area">
            <div className="col-md-7">
                <div className="card p-md-3">
                    <div className="card-body">
                        <div>
                            <h5>Subscription Summary</h5>
                            <p>Overview of your subscription plan</p>
                        </div>

                        <div className="row py-3">
                            <div className="col-md-4">
                                <h5>Plan</h5>
                                <p>Enterprise Plus Plan</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Subscription Price</h5>
                                <p>$850</p>
                            </div>
                            <div className="col-md-4">
                                <h5>Next Billing Date</h5>
                                <p>20/12/2022</p>
                            </div>
                        </div>

                        <div className="mt-3">
                            <button className="btn btn-deep-green-outline me-3">
                                Cancel Plan
                            </button>
                            <button className="btn btn-deep-green">
                                Change Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-table-area mt-5">
                <div className="table-header">
                    <div className="row">
                        <div className="col-md-5">
                            <h5>Billing History</h5>
                            <p>View your billing history here</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive mt-4">
                <table className="table">
                    <thead className="">
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Date</th>
                            <th scope="col">Details</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>05/12/2022</td>
                            <td>Enterprise plus plan</td>
                            <td>$850</td>
                            <td><i className="ri-download-2-line me-3 ri-xl"/>Download Invoice</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>05/12/2022</td>
                            <td>Enterprise plus plan</td>
                            <td>$850</td>
                            <td><i className="ri-download-2-line me-3 ri-xl"/>Download Invoice</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>05/12/2022</td>
                            <td>Enterprise plus plan</td>
                            <td>$850</td>
                            <td><i className="ri-download-2-line me-3 ri-xl"/>Download Invoice</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
