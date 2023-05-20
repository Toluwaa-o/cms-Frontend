export default function Row({ firstName, lastName, email, number, address }) {
    return (
      <tr>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{email}</td>
          <td>{number}</td>
          <td>{address}</td>
      </tr>
    )
  }
  