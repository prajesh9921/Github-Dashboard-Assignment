import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser, getUserRepositories, getUserFollowers } from '../services/github';
import Navbar from '../components/Navbar';
import RepositoryCard from '../components/RepositoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

import './UserProfilePage.scss';

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUser(username!),
    enabled: !!username,
  });

  const {
    data: repositories,
    isLoading: isLoadingRepos,
    isError: isErrorRepos,
  } = useQuery({
    queryKey: ['userRepositories', username],
    queryFn: () => getUserRepositories(username!),
    enabled: !!username,
  });

  const {
    data: followers,
    isLoading: isLoadingFollowers,
    isError: isErrorFollowers,
  } = useQuery({
    queryKey: ['userFollowers', username],
    queryFn: () => getUserFollowers(username!),
    enabled: !!username,
  });

  if (isLoadingUser) {
    return (
      <div className="user-page">
        <Navbar />
        <div className="content-container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isErrorUser) {
    return (
      <div className="user-page">
        <Navbar />
        <div className="content-container">
          <ErrorDisplay
            message={userError instanceof Error ? userError.message : 'Error loading user profile'}
            onRetry={() => refetchUser()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <Navbar />
      <div className="content-container">
        {user && (
          <div className="profile-wrapper">
            <div className="sidebar">
              <div className="profile-card">
                <div className="profile-info">
                  <img src={user.avatar_url} alt={user.login} className="avatar" />
                  <h1>{user.name || user.login}</h1>
                  <p className="username">@{user.login}</p>
                  {user.bio && <p className="bio">{user.bio}</p>}
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="github-btn">
                    View on GitHub
                  </a>
                </div>

                <div className="stats">
                  <div className="stat-box">
                    <p className="value">{user.followers}</p>
                    <p className="label">Followers</p>
                  </div>
                  <div className="stat-box">
                    <p className="value">{user.following}</p>
                    <p className="label">Following</p>
                  </div>
                  <div className="stat-box">
                    <p className="value">{user.public_repos}</p>
                    <p className="label">Repos</p>
                  </div>
                </div>

                <div className="details">
                  {user.company && <p><strong>Company:</strong> {user.company}</p>}
                  {user.location && <p><strong>Location:</strong> {user.location}</p>}
                  {user.blog && (
                    <p>
                      <strong>Website:</strong>{' '}
                      <a
                        href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.blog}
                      </a>
                    </p>
                  )}
                  {user.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                  )}
                </div>
              </div>

              <div className="followers-card">
                <h2>Followers</h2>
                {isLoadingFollowers ? (
                  <LoadingSpinner />
                ) : isErrorFollowers ? (
                  <p className="error-msg">Error loading followers</p>
                ) : followers && followers.length > 0 ? (
                  <>
                    {followers.slice(0, 5).map((follower) => (
                      <div key={follower.id} className="follower-item">
                        <img src={follower.avatar_url} alt={follower.login} className="follower-avatar" />
                        <Link to={`/user/${follower.login}`}>{follower.login}</Link>
                      </div>
                    ))}
                    {followers.length > 5 && (
                      <a
                        href={`${user.html_url}?tab=followers`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-all"
                      >
                        View all {user.followers} followers
                      </a>
                    )}
                  </>
                ) : (
                  <p className="no-followers">No followers yet</p>
                )}
              </div>
            </div>

            <div className="repo-section">
              <div className="repo-card">
                <h2>Repositories</h2>
                {isLoadingRepos ? (
                  <LoadingSpinner />
                ) : isErrorRepos ? (
                  <p className="error-msg">Error loading repositories</p>
                ) : repositories && repositories.length > 0 ? (
                  <>
                    {repositories.map((repo) => (
                      <RepositoryCard key={repo.id} repository={repo} />
                    ))}
                    <div className="view-all-repos">
                      <a
                        href={`${user.html_url}?tab=repositories`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View all {user.public_repos} repositories
                      </a>
                    </div>
                  </>
                ) : (
                  <p className="no-repos">No public repositories</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
