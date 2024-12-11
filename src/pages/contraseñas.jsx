import Usuarios from "./usuarios";

export const isAdmin = (usuario) => {
    return usuario?.isAdmin === 1;
  };
  