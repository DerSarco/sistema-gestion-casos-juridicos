import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">§</div>
        <p className="eyebrow">Estudio Jurídico</p>
        <h1 id="login-title">Gestión de Casos</h1>
        <p className="muted">Acceso interno al entorno de demostración</p>
        <form className="stack-lg">
          <label className="field"><span>Correo electrónico</span><input type="email" defaultValue="abogado@estudio.cl" autoComplete="email" /></label>
          <label className="field"><span>Contraseña</span><input type="password" defaultValue="demostracion" autoComplete="current-password" /></label>
          <Link className="button button-primary button-block" href="/casos">Ingresar</Link>
        </form>
        <p className="environment-note">Solo datos ficticios · No apto para uso productivo</p>
      </section>
    </main>
  );
}
