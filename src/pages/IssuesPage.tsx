import './IssuesPage.scss';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getRepositoryIssues, getRepository } from '../services/github';
import { setIssues, setLoading, setError, toggleViewMode, clearIssues } from '../store/issuesSlice';
import Navbar from '../components/Navbar';
import IssueCard from '../components/IssueCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const IssuesPage = () => {
  const { owner, name } = useParams<{ owner: string, name: string }>();
  const dispatch = useAppDispatch();
  const { todoIssues, doneIssues, viewMode, isLoading, error } = useAppSelector(state => state.issues);

  const {
    data: repository,
    isLoading: isLoadingRepo,
    isError: isErrorRepo,
    error: repoError,
  } = useQuery({
    queryKey: ['repository', owner, name],
    queryFn: () => getRepository(owner!, name!),
    enabled: !!owner && !!name,
  });

  const {
    data: issues,
    isLoading: isLoadingIssues,
    isError: isErrorIssues,
    error: issuesError,
    refetch: refetchIssues,
  } = useQuery({
    queryKey: ['issues', owner, name],
    queryFn: () => getRepositoryIssues(owner!, name!),
    enabled: !!owner && !!name,
  });

  useEffect(() => {
    dispatch(setLoading(isLoadingIssues));

    if (isErrorIssues) {
      dispatch(setError(issuesError instanceof Error ? issuesError.message : 'Failed to load issues'));
    } else if (issues) {
      dispatch(setIssues(issues));
    }

    return () => {
      dispatch(clearIssues());
    };
  }, [issues, isLoadingIssues, isErrorIssues, issuesError, dispatch]);

  const handleToggleView = () => {
    dispatch(toggleViewMode());
  };

  if (isLoadingRepo || isLoadingIssues) {
    return (
      <div className="issues-page">
        <Navbar />
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isErrorRepo) {
    return (
      <div className="issues-page">
        <Navbar />
        <div className="container">
          <ErrorDisplay message={repoError instanceof Error ? repoError.message : 'Error loading repository'} />
        </div>
      </div>
    );
  }

  return (
    <div className="issues-page">
      <Navbar />
      <div className="container">
        {repository && (
          <div className="repo-header">
            <div className="repo-header-content">
              <div>
                <h1 className="repo-title">
                  <Link to={`/repository/${owner}/${name}`} className="repo-link">
                    {repository.full_name}
                  </Link>
                  <span className="divider">/</span>
                  <span>Issues</span>
                </h1>
                <p className="issue-stats">{todoIssues.length} open, {doneIssues.length} closed</p>
              </div>
              <div className="view-toggle">
                <button onClick={handleToggleView} className="view-toggle-button">
                  {viewMode === 'list' ? 'Switch to Kanban View' : 'Switch to List View'}
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <ErrorDisplay message={error} onRetry={() => refetchIssues()} />
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : viewMode === 'list' ? (
          <div className="list-view">
            <h2 className="section-title">All Issues ({todoIssues.length + doneIssues.length})</h2>
            {todoIssues.length === 0 && doneIssues.length === 0 ? (
              <p className="empty-message">No issues found for this repository.</p>
            ) : (
              <div>
                {[...todoIssues, ...doneIssues].map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="kanban-view">
            <div className="kanban-column">
              <h2 className="column-title">To Do ({todoIssues.length})</h2>
              <div className="issue-list">
                {todoIssues.length === 0 ? (
                  <p className="empty-message">No open issues.</p>
                ) : (
                  todoIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)
                )}
              </div>
            </div>
            <div className="kanban-column">
              <h2 className="column-title">Done ({doneIssues.length})</h2>
              <div className="issue-list">
                {doneIssues.length === 0 ? (
                  <p className="empty-message">No closed issues.</p>
                ) : (
                  doneIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
