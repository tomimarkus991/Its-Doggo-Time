import { useQuery } from 'react-query';

const useFetchExcrementLog = () => {
  const fetchExcrementLog = async () => {};
  return useQuery('excrement_log' + 'id', () => fetchExcrementLog());
};
export default useFetchExcrementLog;
