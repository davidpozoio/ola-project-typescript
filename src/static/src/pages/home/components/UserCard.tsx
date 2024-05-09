import { Panel } from "primereact/panel";
import { ToggleButton } from "primereact/togglebutton";
import { UserGetDto } from "../../../models/user";
import useToggle from "../../../hooks/useToggle";
import { toggleAccessUser } from "../../../services/user-service";

interface UserCardProps {
  user: UserGetDto;
}

const UserCard = ({ user }: UserCardProps) => {
  const { value, toggle } = useToggle(user.has_access);

  return (
    <Panel header={user.fullname} toggleable collapsed>
      <div>{user.email}</div>
      <div>{user.area}</div>
      <div>{user.role}</div>
      <ToggleButton
        disabled={user.has_access}
        checked={value}
        onChange={async () => {
          if (!value) {
            await toggleAccessUser(true, user.id as number);
          }
          toggle();
        }}
      />
    </Panel>
  );
};

export default UserCard;
