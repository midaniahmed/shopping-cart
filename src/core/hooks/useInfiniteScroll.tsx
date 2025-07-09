import { useEffect, useCallback } from 'react';

export interface InfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  threshold?: number;
  loadMore: () => void;
}

export const useInfiniteScroll = ({ loading, hasMore, loadMore, threshold = 300 }: InfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loadMore();
    }
  }, [loading, hasMore, loadMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};
