import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRepository, getRepositoryContributors } from '../services/github';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import './RepositoryPage.scss'; // Import SCSS

const RepositoryPage = () => {
  const { owner, name } = useParams<{ owner: string, name: string }>();

  const {
    data: repository,
    isLoading: isLoadingRepo,
    isError: isErrorRepo,
    error: repoError,
    refetch: refetchRepo
  } = useQuery({
    queryKey: ['repository', owner, name],
    queryFn: () => getRepository(owner!, name!),
    enabled: !!owner && !!name,
  });

  const {
    data: contributors,
    isLoading: isLoadingContributors,
    isError: isErrorContributors,
  } = useQuery({
    queryKey: ['contributors', owner, name],
    queryFn: () => getRepositoryContributors(owner!, name!),
    enabled: !!owner && !!name,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoadingRepo) {
    return (
      <div className="repository-page">
        <Navbar />
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isErrorRepo) {
    return (
      <div className="repository-page">
        <Navbar />
        <div className="container">
          <ErrorDisplay
            message={repoError instanceof Error ? repoError.message : 'Error loading repository'}
            onRetry={() => refetchRepo()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="repository-page">
      <Navbar />
      <div className="container">
        {repository && (
          <>
            <div className="card repo-details">
              <div className="repo-header">
                <div>
                  <div className="repo-title">
                    <Link to={`/user/${repository.owner.login}`} className="owner-link">
                      <img src={repository.owner.avatar_url} alt={repository.owner.login} className="avatar" />
                      <span>{repository.owner.login}</span>
                    </Link>
                    <span className="separator">/</span>
                    <h1 className="repo-name">{repository.name}</h1>
                  </div>
                  <p className="description">{repository.description}</p>
                </div>
                <div className="repo-actions">
                  <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="btn github-link">
                    View on GitHub
                  </a>
                  <Link to={`/repository/${owner}/${name}/issues`} className="btn issues-link">
                    View Issues
                  </Link>
                </div>
              </div>

              <div className="badges">
                <div className="badge">⭐ {repository.stargazers_count.toLocaleString()} Stars</div>
                <div className="badge">🍴 {repository.forks_count.toLocaleString()} Forks</div>
                <div className="badge">👁️ {repository.watchers_count.toLocaleString()} Watchers</div>
                <div className="badge">⚠️ {repository.open_issues_count.toLocaleString()} Open Issues</div>
                {repository.language && (
                  <div className="badge">💻 {repository.language}</div>
                )}
              </div>
            </div>

            <div className="grid">
              <div className="card info-box">
                <h2>Repository Info</h2>
                <div className="info-list">
                  <p><span>Created:</span> {formatDate(repository.created_at)}</p>
                  <p><span>Last updated:</span> {formatDate(repository.updated_at)}</p>
                  <p>
                    <span>URL:</span>{" "}
                    <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
                      {repository.html_url}
                    </a>
                  </p>
                </div>
              </div>

              <div className="card info-box">
                <h2>Top Contributors</h2>
                {isLoadingContributors ? (
                  <LoadingSpinner />
                ) : isErrorContributors ? (
                  <p className="error-msg">Error loading contributors</p>
                ) : (
                  <div className="contributors">
                    {contributors && contributors.length > 0 ? (
                      contributors.slice(0, 5).map((contributor) => (
                        <div key={contributor.id} className="contributor">
                          <img src={contributor.avatar_url} alt={contributor.login} className="avatar-small" />
                          <Link to={`/user/${contributor.login}`} className="contributor-name">
                            {contributor.login}
                          </Link>
                          <div className="contributions">{contributor.contributions} commits</div>
                        </div>
                      ))
                    ) : (
                      <p className="no-contributors">No contributors found</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RepositoryPage;
