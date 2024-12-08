/* eslint-disable react/prop-types */


const SubmissionModal = ({ task, modalId }) => {
    
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Submission Details</h3>
                <p className="py-4">{task.submission_details}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default SubmissionModal;