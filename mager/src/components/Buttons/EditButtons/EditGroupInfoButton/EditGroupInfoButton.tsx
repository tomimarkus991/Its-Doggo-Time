import { IconButton } from '@chakra-ui/react';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useColors from '../../../../hooks/useColors';
import { StringOrUndefined } from '../../../../types';

interface Props {
  user_id: StringOrUndefined;
  creator_id: StringOrUndefined;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditGroupInfoButton: React.FC<Props> = ({
  user_id,
  creator_id,
  isEditable,
  setIsEditable,
}) => {
  const { penColor } = useColors();
  return (
    <>
      {user_id === creator_id && isEditable === false ? (
        <IconButton
          onClick={() => setIsEditable(true)}
          aria-label="Edit"
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          icon={
            <FontAwesomeIcon icon={faPen} size={'lg'} color={penColor} />
          }
        />
      ) : null}
    </>
  );
};
export default EditGroupInfoButton;
