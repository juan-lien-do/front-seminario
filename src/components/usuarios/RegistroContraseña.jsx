import React, { useState } from "react";
import { usuariosService } from "../../services/usuarios.services";

export default function RegistroContraseña({ usuario, onComplete }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasUpperCase: false,
    hasSpecialChar: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!passwordValidations.minLength || !passwordValidations.hasNumber || !passwordValidations.hasUpperCase || !passwordValidations.hasSpecialChar) {
      alert("La contraseña no cumple con todos los requisitos.");
      return;
    }

    try {
      await usuariosService.actualizarContrasena(usuario.nombre, password);
      onComplete(); // Notifica al componente padre, si aplica
    } catch (error) {
      alert("Error al actualizar la contraseña. Por favor, intente de nuevo.");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validaciones de la contraseña
    setPasswordValidations({
      minLength: newPassword.length >= 6,
      hasNumber: /[0-9]/.test(newPassword),
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*()\-_=+<>?]/.test(newPassword),
    });
  };

  const isPasswordValid = passwordValidations.minLength && passwordValidations.hasNumber && passwordValidations.hasUpperCase && passwordValidations.hasSpecialChar;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Registrar Nueva Contraseña</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <div className="mt-2">
                  <ul className="list-unstyled">
                    <li className={passwordValidations.minLength ? "text-success" : "text-danger"}>
                      {passwordValidations.minLength ? "✔️ Al menos 6 caracteres" : "❌ Al menos 6 caracteres"}
                    </li>
                    <li className={passwordValidations.hasNumber ? "text-success" : "text-danger"}>
                      {passwordValidations.hasNumber ? "✔️ Debe contener al menos 1 número" : "❌ Debe contener al menos 1 número"}
                    </li>
                    <li className={passwordValidations.hasUpperCase ? "text-success" : "text-danger"}>
                      {passwordValidations.hasUpperCase ? "✔️ Debe contener al menos 1 mayúscula" : "❌ Debe contener al menos 1 mayúscula"}
                    </li>
                    <li className={passwordValidations.hasSpecialChar ? "text-success" : "text-danger"}>
                      {passwordValidations.hasSpecialChar ? "✔️ Al menos un carácter especial (!@#$%^&*()-_+=<>?)" : "❌ Al menos un carácter especial (!@#$%^&*()-_+=<>?)"}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={!isPasswordValid}
              >
                Guardar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}