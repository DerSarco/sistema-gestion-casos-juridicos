import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">§</div>
        <p className="eyebrow">Estudio Jurídico</p>
        <h1 id="login-title">Gestión de Casos</h1>
        <p className="muted">Acceso interno al entorno de demostración</p>
        <LoginForm />
        <p className="environment-note">Solo datos ficticios · No apto para uso productivo</p>
      </section>
    </main>
  );
}
