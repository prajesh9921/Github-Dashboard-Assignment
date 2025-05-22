import { Link } from 'react-router-dom';
import { User } from '../types';
import './UserCard.scss';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-card__avatar"
      />
      <div className="user-card__info">
        <h3 className="user-card__name">
          <Link to={`/user/${user.login}`} className="user-card__link">
            {user.name || user.login}
          </Link>
        </h3>
        {user.bio && <p className="user-card__bio">{user.bio}</p>}
      </div>
    </div>
  );
};

export default UserCard;
