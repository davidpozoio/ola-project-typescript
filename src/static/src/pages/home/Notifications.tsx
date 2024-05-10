import { useQuery } from "react-query";
import { getAllNotifications } from "../../services/user-service";
import UserCard from "./components/UserCard";
import { saveForm } from "../../services/form-service";

const Notifications = () => {
  const { data } = useQuery({
    queryFn: getAllNotifications,
    queryKey: ["notifications"],
  });

  const createForm = async () => {
    saveForm({ label: "formulario uno" });
  };

  return (
    <div>
      <button onClick={createForm}>create form</button>
      {data?.data.users.map((user) => {
        console.log(user);
        return (
          <div key={user.id}>
            <UserCard user={user} notificationMode={true} />
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
