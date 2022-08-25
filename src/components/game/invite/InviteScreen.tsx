import InviteSection from './InviteSection';
import './style.css'

const InviteScreen = () => {
  return (
    <div className='invite__screen'>
      <InviteSection text />
      <InviteSection />
    </div>
  );
}

export default InviteScreen;