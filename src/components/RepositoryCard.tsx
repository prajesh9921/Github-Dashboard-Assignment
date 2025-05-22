import './RepositoryCard.scss';
import { Link } from 'react-router-dom';
import { Repository } from '../types';

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="repository-card">
      <div className="repository-card__header">
        <h3 className="repository-card__title">
          <Link to={`/repository/${repository.owner.login}/${repository.name}`}>
            {repository.full_name}
          </Link>
        </h3>
        <div className="repository-card__badges">
          <span className="badge badge--primary">
            ⭐ {repository.stargazers_count}
          </span>
          <span className="badge badge--secondary">
            🍴 {repository.forks_count}
          </span>
        </div>
      </div>
      <p className="repository-card__description">
        {repository.description || 'No description available'}
      </p>
      <div className="repository-card__footer">
        {repository.language && (
          <span className="repository-card__language">
            <span className="repository-card__language-dot"></span>
            {repository.language}
          </span>
        )}
        <span className="repository-card__updated">
          Updated on {formatDate(repository.updated_at)}
        </span>
      </div>
    </div>
  );
};

export default RepositoryCard;
