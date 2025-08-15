import Text from "../../components/core/Text";

const About = () => {
    console.log("About-> render")

    return <Text className={"mt-4 p-5 text-[dodgerblue] font-medium text-sm text-center"}>
        <section
            className="items-center justify-center flex flex-col mb-4">
            <img src="/images/KoalaCare2.png" alt="Koala" className="h-24 mb-4 text-center" />
        </section>
        <p>
            En <strong>KoalaCare</strong>, trabajamos junto a centros de rescate y santuarios de toda Australia con un propósito en común:
            <strong> proteger</strong>, <strong>rehabilitar</strong> y dar una nueva <strong>oportunidad</strong> a los koalas que han sido rescatados por diversas causas, como incendios
            forestales, enfermedades o pérdida de hábitat.
        </p>
        <br />
        <p>
            Nuestra app nace con la idea de acercar estas historias al mundo. Aquí compartimos fotos y detalles de cada uno de los koalas
            que actualmente están bajo cuidado, para que cualquier persona pueda conocerlos y sumarse a su recuperación a través de una
            adopción simbólica.
        </p>
        <br />

        <p>
            Cuando adoptás a un koala desde la app, tu donación va directamente al centro que lo cuida. Esto nos permite cubrir gastos
            esenciales como alimentación, atención veterinaria, rehabilitación y mantenimiento de los espacios donde viven.
        </p>

        <p>
            Creemos que cada pequeño gesto cuenta, y con tu ayuda, podemos seguir protegiendo a esta especie única.
            <br />
            Gracias por ser parte de esta comunidad comprometida con el bienestar y la conservación de los koalas.
        </p>

        <p style={{ fontWeight: 'bold', marginTop: '2rem' }}>
            — El equipo de KoalaCare 🐨💚
        </p>
    </Text>
}

export default About
