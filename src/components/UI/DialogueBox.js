export default function DialogueBox({ confirm, decline }) {
  return (
    <div className='dialogue'>
        <span>
            <p>Are you sure? This action is permanent</p>
            <span>
                <p style={{background: 'green'}} onClick={confirm}>Yes</p>
                <p style={{background: 'rgb(243, 40, 40)'}} onClick={decline}>No</p>
            </span>
        </span>
    </div>
  )
}
