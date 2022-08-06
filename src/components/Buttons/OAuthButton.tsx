import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Provider } from "@supabase/gotrue-js";

import { useOAuth } from "hooks";

interface Props {
  icon: any;
  provider: Provider;
}

export const OAuthButton = ({ provider, icon }: Props) => {
  const { mutate } = useOAuth(provider);

  return (
    <FontAwesomeIcon
      cursor="pointer"
      icon={icon}
      onClick={() => mutate()}
      size="3x"
      color="#DDCDBF"
    />
  );
};
