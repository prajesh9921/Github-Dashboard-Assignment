
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRepositories } from '../services/github';
import { Repository } from '../types';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import RepositoryCard from '../components/RepositoryCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

import "./SearchPage.scss";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    q: '',
    sort: 'stars' as 'stars' | 'forks' | 'updated',
    order: 'desc' as 'asc' | 'desc',
    page: 1,
    per_page: 10
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['repositories', searchParams],
    queryFn: () => searchRepositories(searchParams),
    enabled: !!searchParams.q,
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({
      ...prev,
      q: query,
      page: 1
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split('-');
    setSearchParams(prev => ({
      ...prev,
      sort: sort as 'stars' | 'forks' | 'updated',
      order: order as 'asc' | 'desc',
      page: 1
    }));
  };

  const totalPages = data?.total_count
    ? Math.min(Math.ceil(data.total_count / searchParams.per_page), 100)
    : 0;

  return (
    <div className="search-page">
      <Navbar />
      <div className="container">
        <div className="content">
          <h1 className="title">Search GitHub Repositories</h1>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search repositories (e.g., react, python, tensorflow)"
          />

          {searchParams.q && (
            <div className="sort-section">
              <div className="sort-controls">
                <span className="label">Sort by:</span>
                <select
                  className="sort-select"
                  value={`${searchParams.sort}-${searchParams.order}`}
                  onChange={handleSortChange}
                >
                  <option value="stars-desc">Most Stars</option>
                  <option value="stars-asc">Fewest Stars</option>
                  <option value="forks-desc">Most Forks</option>
                  <option value="forks-asc">Fewest Forks</option>
                  <option value="updated-desc">Recently Updated</option>
                  <option value="updated-asc">Least Recently Updated</option>
                </select>
              </div>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {isError && (
            <ErrorDisplay
              message={error instanceof Error ? error.message : 'An error occurred'}
              onRetry={() => refetch()}
            />
          )}

          {data && (
            <>
              <p className="result-count">
                Found {data.total_count.toLocaleString()} repositories
              </p>
              <div>
                {data.items.map((repo: Repository) => (
                  <RepositoryCard key={repo.id} repository={repo} />
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
              <p>No repositories found matching your search criteria.</p>
            </div>
          )}

          {!searchParams.q && (
            <div className="empty-search">
              <p>Enter a search term to find GitHub repositories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
