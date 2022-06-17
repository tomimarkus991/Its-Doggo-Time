import { useEffect } from "react";
import { useQueryClient } from "react-query";

import { supabase } from "utils";

import { InviteDataType } from "types";

import { useToast } from "..";
import { useUser } from "../queries";

export const useSubscribeToInviteInserts = () => {
  const queryClient = useQueryClient();
  const { data } = useUser();
  const { showErrorToast } = useToast();

  useEffect(() => {
    const subscribeToInviteInserts = () => {
      return (
        supabase
          // only listen to updates that have your username in it
          .from(`invites:receiver=eq.${data?.username}`)
          // when someone invites you to group
          .on("INSERT", async payload => {
            queryClient.invalidateQueries("invites");
            // take the newly inserted data
            const { sender, receiver, id, group_id } = payload.new;
            console.log("payload", payload);
            const { data, error } = await supabase
              .from("groups")
              .select(
                `
              id,
              group_name,
              avatar_url
            `
              )
              .eq("id", group_id)
              .single();

            if (error) {
              showErrorToast({
                title: "Get Group Data Error",
                description: error.message,
              });

              throw new Error(error.message);
            }

            const newInvite: InviteDataType = {
              id,
              group_id,
              sender,
              receiver,
              groups: data,
            };

            queryClient.setQueryData("invites", (oldData: any) => {
              console.log("sub oldData", oldData);

              if (oldData === undefined) {
                return [newInvite];
              }
              return [...oldData, newInvite];
            });
          })
          .subscribe()
      );
    };

    subscribeToInviteInserts();

    return () => {
      // supabase.removeSubscription(subscribeToInviteInserts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.username]);
};
