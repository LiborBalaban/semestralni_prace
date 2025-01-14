import '../App.css';
import Button from './button';
const AlertBox = ({message, onClick}) => {
  return (
    <div className='alertPage flex'>
 <div className='alertBox flex'>
    <h2>Oznámení</h2>
    <p>{message}</p>
    <Button onClick={()=>onClick(false)} label={'Ok'}/>
   </div>
    </div>
  );
}
export default AlertBox;