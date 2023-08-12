import {Image} from 'react-bootstrap';
import {useAvatarDownloader} from "../../../hooks/useAvatarDownloader";
import emptyAvatar from "../../../assets/empty-avatar.png"

export function SmallAvatar({size = "30px", user}) {
  const [avatar] = useAvatarDownloader(user?.id);

  return (
    <Image roundedCircle
           alt="photo"
           src={avatar ?? emptyAvatar}
           width={size}
           height={size}/>
  );
}
