import profile from '../../asset/profile.png';

function Avatar({ src = profile, alt = 'profile' }) {
  return <img src={src} alt={alt} />;
}

export default Avatar;
