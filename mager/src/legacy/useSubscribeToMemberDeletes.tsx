import { supabase } from '../utils';

export const useSubscribeToMemberDeletes = ({
  group_id,
  fetchUpdatedMembers,
}: {
  group_id: string;
  fetchUpdatedMembers: () => Promise<void>;
}) => {
  return {
    subscribeToMemberDeletes: () =>
      supabase
        .from(`members:group_id=eq.${group_id}`)
        .on('DELETE', () => {
          fetchUpdatedMembers();
        })
        .subscribe(),
  };
};
