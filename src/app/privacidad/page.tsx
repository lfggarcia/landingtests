export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-sm leading-relaxed">
      <h1 className="mb-6 text-2xl font-bold">Política de privacidad</h1>
      <p className="mb-4">
        Esta política explica qué datos recoge acme a través de este sitio web y cómo se utilizan.
      </p>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Datos que recogemos</h2>
      <p className="mb-4">
        Los datos que envíes voluntariamente a través de los formularios de contacto o reserva
        (nombre, email, teléfono y mensaje), así como datos de uso anónimos si el sitio tiene
        analítica activada (páginas visitadas, origen del tráfico, dispositivo).
      </p>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Uso de los datos</h2>
      <p className="mb-4">
        Usamos estos datos únicamente para responder a tus solicitudes y para entender cómo se
        utiliza el sitio. No vendemos ni compartimos tus datos con terceros con fines publicitarios.
      </p>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Cookies</h2>
      <p className="mb-4">
        Este sitio puede usar cookies de analítica para medir visitas de forma agregada. Puedes
        rechazar su uso desde el banner de cookies o la configuración de tu navegador.
      </p>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Contacto</h2>
      <p>
        Para cualquier consulta sobre tus datos, escríbenos a{' '}
        <a href="mailto:ventas@nativapress.co" className="underline">ventas@nativapress.co</a>.
      </p>
    </main>
  )
}
