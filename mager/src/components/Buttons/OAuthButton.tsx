import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Provider } from "@supabase/gotrue-js";

import { useOAuth } from "hooks/mutations";

interface Props {
  icon: IconDefinition;
  provider: Provider;
}

const OAuthButton: React.FC<Props> = ({ provider, icon }) => {
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

export default OAuthButton;
