import { InputText } from "primereact/inputtext";
import "./styles/login-styles.css";
import { Button } from "primereact/button";
import { FormEventHandler } from "react";
import { Password } from "primereact/password";
import ROUTES from "../../consts/routes";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../services/auth-service";
import { LoginDto } from "../../models/auth";

const Login = () => {
  const navigate = useNavigate();

  const { mutate: mutateLogin } = useMutation(login, {
    onSuccess: async (req) => {
      console.log(req.data);
      navigate(ROUTES.HOME.ME);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    mutateLogin({
      email: formData["email"],
      password: formData["password"],
    } as LoginDto);
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Correo electrónico: </label>
        <InputText
          id="email"
          placeholder="Correo electrónico"
          name="email"
          required
        />
        <label htmlFor="password">Contraseña: </label>
        <Password
          toggleMask
          name="password"
          placeholder="contraseña"
          required
        />
        <Button label="Iniciar sesión"></Button>

        <div
          rel="noopener noreferrer"
          className="p-button font-bold"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link to={ROUTES.SIGNUP}>¿No tienes cuenta?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
