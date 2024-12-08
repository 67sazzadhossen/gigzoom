/* eslint-disable react/prop-types */


const PaymentRow = ({ data, idx }) => {
    const date = new Date(data.time);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format if needed
    hours = hours % 12 || 12;

    const timeString = `${hours}:${minutes} ${amOrPm}`;
    return (
        <tr >
            <th>{idx + 1}</th>
            <td>{data.transactionId}</td>
            <td>{data.coins}</td>
            <td>{data.dollars}</td>
            <td>{timeString}</td>
            <td>{new Date(data?.date).toLocaleDateString()}</td>
        </tr>
    );
};

export default PaymentRow;