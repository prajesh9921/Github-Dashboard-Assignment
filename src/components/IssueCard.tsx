import './IssueCard.scss';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="issue-card">
      <h3 className="issue-title">
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="issue-link">
          #{issue.number} {issue.title}
        </a>
      </h3>
      <div className="issue-labels">
        {issue.labels.map(label => (
          <span 
            key={label.id}
            className="issue-badge"
            style={{ 
              backgroundColor: `#${label.color}30`,
              color: `#${label.color}`,
              border: `1px solid #${label.color}`
            }}
          >
            {label.name}
          </span>
        ))}
      </div>
      <div className="issue-meta">
        <div className="issue-user">
          <img 
            src={issue.user.avatar_url} 
            alt={issue.user.login} 
            className="issue-avatar"
          />
          <span>{issue.user.login}</span>
        </div>
        <span className="issue-date">
          {issue.state === 'open' ? 'Opened' : 'Closed'} on {formatDate(issue.created_at)}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
