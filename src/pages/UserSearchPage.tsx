import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../services/github';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

import './UserSearchPage.scss';

const UserSearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    q: '',
    page: 1,
    per_page: 10,
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', searchParams],
    queryFn: () => searchUsers(searchParams),
    enabled: !!searchParams.q,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = (query: string) => {
    setSearchParams((prev) => ({
      ...prev,
      q: query,
      page: 1, // Reset to first page on new search
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  const totalPages = data?.total_count
    ? Math.min(Math.ceil(data.total_count / searchParams.per_page), 100) // GitHub API limits to 1000 results (100 pages of 10)
    : 0;

  return (
    <div className="user-search-page">
      <Navbar />
      <div className="container">
        <div className="content">
          <h1 className="title">Search GitHub Users</h1>
          <SearchBar onSearch={handleSearch} placeholder="Enter a GitHub username" />

          {isLoading && <LoadingSpinner />}

          {isError && (
            <ErrorDisplay
              message={error instanceof Error ? error.message : 'An error occurred'}
              onRetry={() => refetch()}
            />
          )}

          {data && (
            <>
              <p className="results-count">
                Found {data.total_count.toLocaleString()} users
              </p>
              <div className="user-list">
                {data.items.map((user: any) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={searchParams.page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {!isLoading && searchParams.q && !data?.items?.length && (
            <div className="no-results">
              <p>No users found matching your search criteria.</p>
            </div>
          )}

          {!searchParams.q && (
            <div className="empty-search">
              <p>Enter a username to find GitHub users.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearchPage;
