/* eslint-disable react/jsx-key */
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import RatingSelector from "./RatingSelector";
import CheckboxGroup from "./CheckboxGroup";
import Lottie from "lottie-react";
import RadioGroup from "./RadioGroup";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import check from "../images/check.json";
import DateInput from "./DateInput";
import Select from "./Select";
import InputField from "./InputField";

// eslint-disable-next-line react/prop-types
function Form({ handleFormSubmit }) {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    genero: "",
    institucion_educativa: "",
    grado_actual: "",
    seccion: "",
    correo_personal: "",
    celular: "",
    propietario_numero: "",
    documento_identidad: "",
    numero_documento: "",
    fecha_nacimiento: "",
    identidad_cultural: "",
    dificultades: "",
    nivel_educativo_hogar: "",
    celular_inteligente: "",
    linea_celular: "",
    computador_hogar: "",
    conexion_internet: "",
    tecnologia_vida_diaria: "",
    importancia_habilidades_digitales: "",
    tecnologia_aprendizaje: "",
    confianza_ia_academico: "",
    confianza_ia_personal: "",
    trabajo_casa: "",
    cuidado_personas_casa: "",
    ocupacion_responsable_hogar: "",
    liderazgo_comunidad: "",
    motivacion_proyectos_tecnologicos: "",
    funcion_ia: "",
    uso_correcto_ia: "",
    herramientas_ia_usadas: "",
    detalle_herramientas_ia: "",
    proyecto_con_ia: "",
    funcion_excel: "",
    uso_excel: "",
    suma_45_136: "",
    frecuencia_uso_excel: "",
    funciones_tareas_excel: "",
    otras_funciones_excel: "",
    buscar_programas_educativos: "",
    reconocimiento_entidades_educativas: "",
    aspectos_para_elegir_programa: "",
    informacion_programas_superiores: "",
    conocimiento_gustos_intereses: "",
    como_hacer_hoja_de_vida: "",
    reconocimiento_empresas_para_trabajar: "",
    conocimiento_condiciones_laborales: "",
    conocimiento_salarios_promedio: "",
    sitios_busqueda_trabajo: "",
    detalle_bolsas_trabajo: "",
    buscar_ofertas_laborales: "",
    informacion_oportunidades_laborales: "",
    habilidades_necesarias_trabajo: "",
    temas_de_interes: "",
    fuentes_informacion_educativa_laboral: "",
    detalle_fuentes_informacion: "",
    analisis_de_opciones: "",
    solicitud_de_apoyo: "",
    estrategia_de_aprendizaje: "",
    organizacion_de_tareas: "",
    disposicion_para_aprender: "",
    manejo_de_emociones: "",
    asegurar_comprension_equipo: "",
    manejo_de_incumplimiento: "",
    educacion_superior_vida_exitosa: "",
    interes_estudios_post_bachillerato: "",
    probabilidad_abandonar_estudios: "",
    motivo_abandonar_estudios: "",
    maximo_nivel_educativo_sonado: "",
    maximo_nivel_educativo_esperado: "",
    miembros_familia_que_apoyan: "",
    apoyo_familiar_continuar_estudios: "",
    apoyo_economico_familiar: "",
    influencia_familiar_estudios: "",
    apoyo_financiero_becas: "",
    ayuda_profesores_reconocimiento_habilidades: "",
    actividades_profesores_decisiones_futuras: "",
    interes_oportunidades_laborales: "",
    capacidad_afrontar_desafios_laborales: "",
    actividades_realizadas_ultimo_ano: "",
    planes_post_graduacion: "",
    detalle_planes_futuros: "",
    apoyo_familiar_metas_profesionales: "",
    ayuda_familiar_busqueda_trabajo: "",
    motivacion_familiar_metas_vida: "",
    motivacion_familiar_conseguir_trabajo: "",
    motivacion_familiar_emprender: "",
    influencia_familiar_trabajo: "",
    motivacion_profesores_metas_vida: "",
    motivacion_profesores_emprender: "",
    tipo_grupo: "Grupo Control",

    projectId: 19,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Elimina el error cuando el usuario comienza a llenar el campo
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: "",
    // }));
  };

  const optionalFields = [
    "propietario_numero",
    "detalle_herramientas_ia",
    "otras_funciones_excel",
    "detalle_bolsas_trabajo",
    "detalle_fuentes_informacion",
    "detalle_planes_futuros",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPageValid = validatePage();

    if (!isPageValid) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        //DESCOMENTAR SOLO EL PRIMERO PARA PRODUCCION
        "api/v1/db/data/v1/crack_sheets/test_ingreso",
        // "http://localhost:8010/proxy",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": import.meta.env.VITE_NOCODB_KEY,
          },
          withCredentials: false,
          crossdomain: true,
        }
      );
      console.log(response.data);
      handleFormSubmit();
      setSuccessMessage(
        `¡Gracias ${formData.nombre_completo} por tus respuestas, nos ayudarán a entender cómo podemos ser de mejor ayuda en este proceso de aprendizaje!`
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos. Inténtelo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const propietarioNumeroOptions = [
    { label: "Madre", value: "Madre" },
    { label: "Padre", value: "Padre" },
    { label: "Hermano o Hermana", value: "Hermano o Hermana" },
    { label: "Tio o Tia", value: "Tio o Tia" },
    { label: "Otro Familiar", value: "Otro Familiar" },
    { label: "Prefiero no Responder", value: "Prefiero no Responder" },
  ];
  const institucionOptions = [
    { label: "Villas de San Pablo", value: "Villas de San Pablo" },
    {
      label: "Escuela Normal Superior del Distrito",
      value: "Escuela Normal Superior del Distrito",
    },
    { label: "Juan José Rondón", value: "Juan José Rondón" },
    {
      label: "Escuela Normal Superior La Hacienda",
      value: "Escuela Normal Superior La Hacienda",
    },
    { label: "Marie Poussepin", value: "Marie Poussepin" },
    { label: "Fundación Pies Descalzos", value: "Fundación Pies Descalzos" },
    { label: "Comunitaria Metropolitana", value: "Comunitaria Metropolitana" },
  ];
  const genderOptions = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "Otro", value: "Otro" },
    { label: "Prefiero no responder", value: "Prefiero no responder" },
  ];
  const seccionOptions = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" },
    { label: "G", value: "G" },
    { label: "H", value: "H" },
    { label: "I", value: "I" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
  ];
  const gradeOptions = [
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
  ];
  const documentoIdentidadOptions = [
    { value: "Registro Civil", label: "Registro Civil" },
    { value: "Tarjeta de Identidad", label: "Tarjeta de Identidad" },
    { value: "Cédula de Ciudadanía", label: "Cédula de Ciudadanía" },
    { value: "Cédula de extranjería", label: "Cédula de extranjería" },
    { value: "Pasaporte", label: "Pasaporte" },
    { value: "PEP", label: "PEP" },
    { value: "Otro", label: "Otro" },
  ];

  const identidadCulturalOptions = [
    { value: "1. Indigena", label: "1. Indigena" },
    {
      value: "2. Negro, mulato, afrodecendiente, afrocolombiano, palenquero",
      label: "2. Negro, mulato, afrodecendiente, afrocolombiano, palenquero",
    },
    { value: "3. Gitano o ROM", label: "3. Gitano o ROM" },
    { value: "4. Mestizo", label: "4. Mestizo" },
    { value: "5. Raizal", label: "5. Raizal" },
    { value: "6. Blanco", label: "6. Blanco" },
    { value: "7. Otro", label: "7. Otro" },
  ];
  const dificultadesOptions = [
    {
      value: "1. Para ver incluso cuando uso gafas",
      label: "1. Para ver, incluso cuando uso gafas",
    },
    {
      value: "2. Para oír incluso cuando uso prótesis auditiva",
      label: "2. Para oír, incluso cuando uso prótesis auditiva",
    },
    {
      value: "3. Para caminar o subir escaleras",
      label: "3. Para caminar o subir escaleras",
    },
    {
      value: "4. Para recordar o concentrarme",
      label: "4. Para recordar o concentrarme",
    },
    {
      value: "5. Para valerme por sí mismo como lavarme el cuerpo o vestirme",
      label: "5. Para valerme por sí mismo, como lavarme el cuerpo o vestirme",
    },
    {
      value:
        "6. Para comunicarme por ejemplo para entender a los demás o para que ellos me entiendan",
      label:
        "6. Para comunicarme, por ejemplo para entender a los demás o para que ellos me entiendan",
    },
    {
      value: "7. No presento ninguna dificultad",
      label: "7. No presento ninguna dificultad",
    },
    {
      value:
        "8. Presento otras dificultades físicas cognitivas no mencionadas aquí",
      label:
        "8. Presento otras dificultades físicas, cognitivas no mencionadas aquí",
    },
  ];
  const nivelEducativoOptions = [
    { value: "1. No fueron a la escuela", label: "1. No fueron a la escuela" },
    {
      value: "2. Preescolar (3 a 5 años)",
      label: "2. Preescolar (3 a 5 años)",
    },
    {
      value: "3. Primaria básica (1°, 2°, 3°, 4°, 5°)",
      label: "3. Primaria básica (1°, 2°, 3°, 4°, 5°)",
    },
    {
      value: "4. Secundaria (6°, 7°, 8°, 9°)",
      label: "4. Secundaria (6°, 7°, 8°, 9°)",
    },
    { value: "5. Media (10°, 11°)", label: "5. Media (10°, 11°)" },
    {
      value: "6. Técnico laboral / profesional o tecnológico",
      label: "6. Técnico laboral / profesional o tecnológico",
    },
    { value: "7. Universitario", label: "7. Universitario" },
    { value: "8. Posgrado", label: "8. Posgrado" },
    { value: "9. No sé", label: "9. No sé" },
  ];

  const motivacion_profesores_emprenderOptions = [
    {
      value: "1. Totalmente en desacuerdo",
      label: "1. Totalmente en desacuerdo",
    },
    { value: "2. En desacuerdo", label: "2. En desacuerdo" },
    { value: "3. De acuerdo", label: "3. De acuerdo" },
    { value: "4. Totalmente de acuerdo", label: "4. Totalmente de acuerdo" },
  ];

  const celular_inteligenteOptions = [
    { value: "Si", label: "Si" },
    { value: "No", label: "No" },
  ];
  const linea_celularOptions = [
    { value: "Prepago", label: "Prepago" },
    { value: "Postpago", label: "Postpago" },
    { value: "Ninguna", label: "Ninguna" },
  ];
  const computador_hogarOptions = [
    {
      value: "1. Computador de Escritorio",
      label: "1. Computador de Escritorio",
    },
    { value: "2. Laptop", label: "2. Laptop" },
    { value: "3. No hay", label: "3. No hay" },
  ];
  const conexion_internetOptions = [
    { value: "1. Wifi", label: "1. Wifi" },
    { value: "2. Cable de red", label: "2. Cable de red" },
    { value: "3. Datos Móviles", label: "3. Datos Móviles" },
    { value: "4. No tengo Internet", label: "4. No tengo Internet" },
  ];
  const tecnologia_vida_diariaOptions = [
    { value: "1. Nada", label: "1. Nada" },
    { value: "2. Algo", label: "2. Algo" },
    { value: "3. Mucho", label: "3. Mucho" },
    { value: "4. Demasiado", label: "4. Demasiado" },
  ];
  const importancia_habilidades_digitalesOptions = [
    { value: "1. Nada importantes", label: "1. Nada importantes" },
    { value: "2. Poco importantes", label: "2. Poco importantes" },
    { value: "3. Muy importantes", label: "3. Muy importantes" },
    { value: "4. Totalmente importantes", label: "4. Totalmente importantes" },
  ];
  const confianzaOptions = [
    { value: "1. Nada de confianza", label: "1. Nada de confianza" },
    { value: "2. Poca confianza", label: "2. Poca confianza" },
    { value: "3. Algo de confianza", label: "3. Algo de confianza" },
    { value: "4. Demasiada confianza", label: "4. Demasiada confianza" },
  ];
  const suma_8_8Options = [
    { value: "9", label: "9" },
    { value: "24", label: "24" },
    { value: "16", label: "16" },
    { value: "64", label: "64" },
    { value: "20", label: "20" },
  ];
  const responsabilidadOptions = [
    { value: "1. Si", label: "1. Si" },
    { value: "2. No", label: "2. No" },
    { value: "3. Algunas veces", label: "3. Algunas veces" },
    { value: "4. Prefiero no responder", label: "4. Prefiero no responder" },
  ];
  const ocupacion_responsable_hogarOptions = [
    { value: "1. Trabajar", label: "1. Trabajar" },
    { value: "2. Buscar trabajo", label: "2. Buscar trabajo" },
    { value: "3. Estudiar", label: "3. Estudiar" },
    { value: "4. Oficios del Hogar", label: "4. Oficios del Hogar" },
    { value: "5. Sin actividad", label: "5. Sin actividad" },
    { value: "6. No sé", label: "6. No sé" },
  ];
  const uso_correcto_iaOptions = [
    {
      value: "1. Para traducir un texto de otro idioma",
      label: "1. Para traducir un texto de otro idioma",
    },
    {
      value:
        "2. Pedirle que me diga exactamente qué me tomará un profesor en un examen",
      label:
        "2. Pedirle que me diga exactamente qué me tomará un profesor en un examen",
    },
    {
      value:
        "3. Pedirle que me dé recomendaciones sobre cómo mejorar una tarea o proyecto",
      label:
        "3. Pedirle que me dé recomendaciones sobre cómo mejorar una tarea o proyecto",
    },
    {
      value: "4. Pedirle que cree una nueva teoría científica",
      label: "4. Pedirle que cree una nueva teoría científica",
    },
    {
      value: "5. Pedirle que me ayude a planificar mis tareas o gastos en casa",
      label: "5. Pedirle que me ayude a planificar mis tareas o gastos en casa",
    },
  ];
  const herramientas_ia_usadasOptions = [
    { value: "1. ChatGPT", label: "1. ChatGPT" },
    { value: "2. DALL-E", label: "2. DALL-E" },
    { value: "3. Bing Creator", label: "3. Bing Creator" },
    {
      value: "4. No uso herramientas de IA",
      label: "4. No uso herramientas de IA",
    },
    { value: "5. Otras", label: "5. Otras" },
  ];
  const uso_excelOptions = [
    { value: "1. Análisis financiero", label: "1. Análisis financiero" },
    {
      value: "2. Diseño gráfico profesional",
      label: "2. Diseño gráfico profesional",
    },
    {
      value: "3. Gestión de bases de datos",
      label: "3. Gestión de bases de datos",
    },
    {
      value: "4. Desarrollo de aplicaciones web",
      label: "4. Desarrollo de aplicaciones web",
    },
    {
      value: "5. Creación de informes y visualización de datos",
      label: "5. Creación de informes y visualización de datos",
    },
  ];
  const frecuencia_uso_excelOptions = [
    { value: "1. Nunca", label: "1. Nunca" },
    { value: "2. Raramente", label: "2. Raramente" },
    { value: "3. Ocasionalmente", label: "3. Ocasionalmente" },
    { value: "4. Frecuentemente", label: "4. Frecuentemente" },
    { value: "5. Todo el tiempo", label: "5. Todo el tiempo" },
  ];
  const funciones_tareas_excelOptions = [
    { value: "1. Crear gráficos", label: "1. Crear gráficos" },
    { value: "2. Usar tablas dinámicas", label: "2. Usar tablas dinámicas" },
    { value: "3. Formatear celdas", label: "3. Formatear celdas" },
    {
      value:
        "4. Utilizado funciones para análisis de datos (por ejemplo: SUMA. PROMEDIO. BUSCARV)",
      label:
        "4. Utilizado funciones para análisis de datos (por ejemplo: SUMA. PROMEDIO. BUSCARV)",
    },
    {
      value: "5. Ninguna de las anteriores",
      label: "5. Ninguna de las anteriores",
    },
    { value: "6. Otras", label: "6. Otras" },
  ];
  const aspectos_para_elegir_programaOptions = [
    {
      value: "1. Que esté disponible en una institución privada",
      label: "1. Que esté disponible en una institución privada",
    },
    {
      value: "2. Que esté disponible en una institución pública",
      label: "2. Que esté disponible en una institución pública",
    },
    {
      value: "3. Que se ajuste a mi plan de pago o financiación",
      label: "3. Que se ajuste a mi plan de pago o financiación",
    },
    {
      value: "4. Que me permita trabajar y estudiar",
      label: "4. Que me permita trabajar y estudiar",
    },
    {
      value: "5. Que tenga los costos de matricula más económicos",
      label: "5. Que tenga los costos de matricula más económicos",
    },
    {
      value: "6. Que sea reconocido por su calidad",
      label: "6. Que sea reconocido por su calidad",
    },
    {
      value: "7. Que tenga altas opciones de conseguir trabajo al terminarlo",
      label: "7. Que tenga altas opciones de conseguir trabajo al terminarlo",
    },
    {
      value: "8. Que tenga opciones de salarios altos",
      label: "8. Que tenga opciones de salarios altos",
    },
    {
      value: "9. Que aporte a mi idea de emprendimiento",
      label: "9. Que aporte a mi idea de emprendimiento",
    },
  ];
  const informacion_programas_superioresOptions = [
    {
      value:
        "1. No he buscado ni recolectado información sobre programas de educación superior ni las instituciones que los ofrecen",
      label:
        "1. No he buscado ni recolectado información sobre programas de educación superior ni las instituciones que los ofrecen.",
    },
    {
      value:
        "2. He buscado algo de información, pero aún me falta mucho por recolectar sobre los programas y las instituciones",
      label:
        "2. He buscado algo de información, pero aún me falta mucho por recolectar sobre los programas y las instituciones.",
    },
    {
      value:
        "3. He recolectado una cantidad considerable de información sobre varios programas y las instituciones que los ofrecen, pero aún me falta recolectar algunos detalles específicos",
      label:
        "3. He recolectado una cantidad considerable de información sobre varios programas y las instituciones que los ofrecen, pero aún me falta recolectar algunos detalles específicos.",
    },
    {
      value:
        "4. He recolectado una gran cantidad de información detallada sobre una amplia variedad de programas de educación superior y las instituciones que los ofrecen",
      label:
        "4. He recolectado una gran cantidad de información detallada sobre una amplia variedad de programas de educación superior y las instituciones que los ofrecen.",
    },
  ];
  const sitios_busqueda_trabajoOptions = [
    {
      value:
        "1. No tengo conocimiento de sitios que puedan ayudarme en la búsqueda de trabajo.",
      label:
        "1. No tengo conocimiento de sitios que puedan ayudarme en la búsqueda de trabajo.",
    },
    {
      value:
        "2. He oído hablar de algunos sitios que pueden ayudar en la búsqueda de trabajo, pero no los he explorado.",
      label:
        "2. He oído hablar de algunos sitios que pueden ayudar en la búsqueda de trabajo, pero no los he explorado.",
    },
    {
      value:
        "3. He identificado varios sitios que pueden ayudarme en la búsqueda de trabajo y he explorado algunos de ellos.",
      label:
        "3. He identificado varios sitios que pueden ayudarme en la búsqueda de trabajo y he explorado algunos de ellos.",
    },
    {
      value:
        "4. He identificado una variedad de sitios que pueden ayudarme en la búsqueda de trabajo y estoy familiarizado/a con ellos.",
      label:
        "4. He identificado una variedad de sitios que pueden ayudarme en la búsqueda de trabajo y estoy familiarizado/a con ellos.",
    },
  ];
  const informacion_oportunidades_laboralesOptions = [
    {
      value:
        "1. No he buscado ni recolectado información sobre las oportunidades laborales relacionadas con diferentes programas de educación superior.",
      label:
        "1. No he buscado ni recolectado información sobre las oportunidades laborales relacionadas con diferentes programas de educación superior.",
    },
    {
      value:
        "2. He buscado algo de información, pero aún me falta mucho por recolectar sobre las oportunidades laborales asociadas a los programas de educación superior.",
      label:
        "2. He buscado algo de información, pero aún me falta mucho por recolectar sobre las oportunidades laborales asociadas a los programas de educación superior.",
    },
    {
      value:
        "3. He recolectado una cantidad considerable de información sobre varias oportunidades laborales que podrían surgir al estudiar diferentes programas de educación superior, pero aún me falta recolectar algunos detalles específicos.",
      label:
        "3. He recolectado una cantidad considerable de información sobre varias oportunidades laborales que podrían surgir al estudiar diferentes programas de educación superior, pero aún me falta recolectar algunos detalles específicos.",
    },
    {
      value:
        "4. He recolectado una gran cantidad de información detallada sobre una amplia variedad de oportunidades laborales asociadas con diversos programas de educación superior.",
      label:
        "4. He recolectado una gran cantidad de información detallada sobre una amplia variedad de oportunidades laborales asociadas con diversos programas de educación superior.",
    },
  ];
  const temas_de_interesOptions = [
    {
      value: "1. Ciencias Naturales (biología, química, física)",
      label: "1. Ciencias Naturales (biología, química, física)",
    },
    {
      value:
        "2. Tecnología (ingeniería, informática, programación, análisis de datos)",
      label:
        "2. Tecnología (ingeniería, informática, programación, análisis de datos)",
    },
    {
      value: "3. Humanidades (historia, literatura, filosofía)",
      label: "3. Humanidades (historia, literatura, filosofía)",
    },
    {
      value: "4. Artes (música, arte visual, artes plásticas, teatro)",
      label: "4. Artes (música, arte visual, artes plásticas, teatro)",
    },
    {
      value: "5. Ciencias Sociales (derecho, sociología, psicología)",
      label: "5. Ciencias Sociales (derecho, sociología, psicología)",
    },
    {
      value:
        "6. Salud (medicina, enfermería, odontología, nutrición y dietética, terapias)",
      label:
        "6. Salud (medicina, enfermería, odontología, nutrición y dietética, terapias)",
    },
    {
      value: "7. Negocios (administración, contabilidad, marketing)",
      label: "7. Negocios (administración, contabilidad, marketing)",
    },
    {
      value: "8. Educación (docencia, pedagogía, educación especial)",
      label: "8. Educación (docencia, pedagogía, educación especial)",
    },
    {
      value: "9. Arquitectura y urbanismo (otras ingenierías)",
      label: "9. Arquitectura y urbanismo (otras ingenierías)",
    },
    {
      value:
        "10. Ciencias de la comunicación (audiovisuales, publicidad, fotografía)",
      label:
        "10. Ciencias de la comunicación (audiovisuales, publicidad, fotografía)",
    },
    {
      value: "11. Agricultura y Medio Ambiente (agronomía, veterinaria)",
      label: "11. Agricultura y Medio Ambiente (agronomía, veterinaria)",
    },
    { value: "12. Otros no listados", label: "12. Otros no listados" },
    { value: "13. Aún no lo sé", label: "13. Aún no lo sé" },
  ];
  const fuentes_informacion_educativa_laboralOptions = [
    {
      value: "1. Profesores y/o docentes",
      label: "1. Profesores y/o docentes",
    },
    {
      value: "2. Orientadores u trabajadores sociales y/o psicólogos",
      label: "2. Orientadores, trabajadores sociales y/o psicólogos",
    },
    { value: "3. Internet", label: "3. Internet" },
    { value: "4. Redes sociales", label: "4. Redes sociales" },
    { value: "5. Amistades", label: "5. Amistades" },
    { value: "6. Familiares", label: "6. Familiares" },
    { value: "7. Televisión", label: "7. Televisión" },
    { value: "8. Radio", label: "8. Radio" },
    {
      value: "9. Periódicos o revistas impresas",
      label: "9. Periódicos o revistas impresas",
    },
    { value: "10. Otros", label: "10. Otros" },
  ];
  const estrategia_de_aprendizajeOptions = [
    {
      value: "1. Busco videos o recursos en línea para una mejor explicación.",
      label: "1. Busco videos o recursos en línea para una mejor explicación.",
    },
    { value: "2. Pido ayuda a amigo.", label: "2. Pido ayuda a amigo." },
    {
      value: "3. Continúo leyendo el texto hasta que lo entiendo.",
      label: "3. Continúo leyendo el texto hasta que lo entiendo.",
    },
    {
      value: "4. Espero que mi profesor lo explique en otra clase.",
      label: "4. Espero que mi profesor lo explique en otra clase.",
    },
    {
      value: "5. Dejo el tema y paso a otra tarea.",
      label: "5. Dejo el tema y paso a otra tarea.",
    },
  ];
  const organizacion_de_tareasOptions = [
    {
      value: "1. Hago una lista de tareas",
      label: "1. Hago una lista de tareas",
    },
    {
      value: "2. Priorizo tareas basándome en la fecha de entrega.",
      label: "2. Priorizo tareas basándome en la fecha de entrega.",
    },
    {
      value: "3. Trabajo en las tareas cuando tengo tiempo libre.",
      label: "3. Trabajo en las tareas cuando tengo tiempo libre.",
    },
    {
      value: "4. No tengo un método específico para organizar mis tareas.",
      label: "4. No tengo un método específico para organizar mis tareas.",
    },
  ];
  const asegurar_comprension_equipoOptions = [
    {
      value: "1. Hablo fuerte y uso muchas palabras.",
      label: "1. Hablo fuerte y uso muchas palabras.",
    },
    {
      value: "2. Uso ejemplos y repito mis puntos importantes.",
      label: "2. Uso ejemplos y repito mis puntos importantes.",
    },
    {
      value: "3. Escribo mis ideas y las comparto con mi equipo.",
      label: "3. Escribo mis ideas y las comparto con mi equipo.",
    },
    {
      value: "4. Solo espero que me entiendan sin necesidad de explicar mucho.",
      label: "4. Solo espero que me entiendan sin necesidad de explicar mucho.",
    },
  ];
  const manejo_de_incumplimientoOptions = [
    {
      value:
        "1. Converso sobre el problema con el equipo para encontrar una solución.",
      label:
        "1. Converso sobre el problema con el equipo para encontrar una solución.",
    },
    {
      value: "2. Informo al profesor sobre la situación.",
      label: "2. Informo al profesor sobre la situación.",
    },
    {
      value:
        "3. Trato de hacer las tareas de ese miembro para evitar retrasos.",
      label:
        "3. Trato de hacer las tareas de ese miembro para evitar retrasos.",
    },
    {
      value: "4. Hablo con la persona directamente para ofrecer ayuda.",
      label: "4. Hablo con la persona directamente para ofrecer ayuda.",
    },
  ];
  const suma_45_136Options = [
    { value: "190", label: "190" },
    { value: "181", label: "181" },
    { value: "191", label: "191" },
    { value: "232", label: "232" },
  ];
  const motivo_abandonar_estudiosOptions = [
    { value: "1. Salud", label: "1. Salud" },
    { value: "2. Desinterés", label: "2. Desinterés" },
    { value: "3. Problemas económicos", label: "3. Problemas económicos" },
    {
      value: "4. Deseo trabajar lo antes posible",
      label: "4. Deseo trabajar lo antes posible",
    },
    {
      value: "5. Debo cuidar a un familiar",
      label: "5. Debo cuidar a un familiar",
    },
    {
      value: "6. Mi familia me insiste que haga otra cosa",
      label: "6. Mi familia me insiste que haga otra cosa",
    },
    { value: "7. Otra razón", label: "7. Otra razón" },
    {
      value: "8. Ninguno, no los considero abandonar",
      label: "8. Ninguno, no los considero abandonar",
    },
  ];
  const maximo_nivel_educativo_Options = [
    { value: "1. Secundaria (9°)", label: "1. Secundaria (9°)" },
    { value: "2. Media (10-11°)", label: "2. Media (10-11°)" },
    {
      value: "3. Técnico laboral (Educación para el Trabajo)",
      label: "3. Técnico laboral (Educación para el Trabajo)",
    },
    { value: "4. Técnico profesional", label: "4. Técnico profesional" },
    { value: "5. Tecnológico", label: "5. Tecnológico" },
    { value: "6. Universitario", label: "6. Universitario" },
    { value: "7. Posgrado", label: "7. Posgrado" },
    { value: "8. No sé", label: "8. No sé" },
  ];
  const miembros_familia_que_apoyanOptions = [
    { value: "Madre", label: "Madre" },
    { value: "Padre", label: "Padre" },
    { value: "Hermanos o hermanas", label: "Hermanos o hermanas" },
    { value: "Tías o tíos", label: "Tías o tíos" },
    { value: "Primos o primas", label: "Primos o primas" },
    { value: "Abuelos o abuelas", label: "Abuelos o abuelas" },
    { value: "Otro(s) familiar(es)", label: "Otro(s) familiar(es)" },
    { value: "Prefiero no responder", label: "Prefiero no responder" },
  ];
  const actividades_realizadas_ultimo_anoOptions = [
    {
      value:
        "1. Hablar o escuchar a personas que estudian o estudiaron el programa educativo de mi interés",
      label:
        "1. Hablar o escuchar a personas que estudian o estudiaron el programa educativo de mi interés",
    },
    {
      value:
        "2. Hablar o escuchar a personas que realizaron o realizan el trabajo de mi interés",
      label:
        "2. Hablar o escuchar a personas que realizaron o realizan el trabajo de mi interés",
    },
    {
      value:
        "3. Responder una prueba de intereses (profesionales o vocacionales u ocupacionales)",
      label:
        "3. Responder una prueba de intereses (profesionales, vocacionales u ocupacionales)",
    },
    {
      value:
        "4. Hacer cursos o actividades que aportan a mi proyecto de vida al graduarme",
      label:
        "4. Hacer cursos o actividades que aportan a mi proyecto de vida al graduarme",
    },
    {
      value:
        "5. Buscar información sobre programas educativos y/o trabajos de mi interés",
      label:
        "5. Buscar información sobre programas educativos y/o trabajos de mi interés",
    },
    {
      value:
        "6. Otra actividad que me permitió identificar mis intereses a futuro y no está listada",
      label:
        "6. Otra actividad que me permitió identificar mis intereses a futuro y no está listada",
    },
    {
      value: "7. No realicé ninguna actividad con este enfoque",
      label: "7. No realicé ninguna actividad con este enfoque",
    },
  ];
  const planes_post_graduacionOptions = [
    {
      value: "1. Planeo empezar a trabajar",
      label: "1. Planeo empezar a trabajar",
    },
    {
      value: "2. Planeo empezar a estudiar",
      label: "2. Planeo empezar a estudiar",
    },
    {
      value: "3. Planeo empezar a trabajar y estudiar al mismo tiempo",
      label: "3. Planeo empezar a trabajar y estudiar al mismo tiempo",
    },
    { value: "4. Planeo emprender", label: "4. Planeo emprender" },
    {
      value: "5. Planeo estudiar y/o trabajar fuera del país",
      label: "5. Planeo estudiar y/o trabajar fuera del país",
    },
    {
      value: "6. Planeo tomar un año de no trabajar ni estudiar",
      label: "6. Planeo tomar un año de no trabajar, ni estudiar",
    },
    {
      value: "7. Puede que deje los estudios antes de graduarme",
      label: "7. Puede que deje los estudios antes de graduarme",
    },
    { value: "8. No lo sé todavía", label: "8. No lo sé todavía" },
  ];

  const pages = [
    [
      <InputField
        key="nombre_completo"
        label="¿Cuál es tu nombre completo?"
        name="nombre_completo"
        value={formData.nombre_completo}
        onChange={handleChange}
        placeholder="Ejemplo. María Camila Pérez Luján"
        isOptional={false}
        error={errors.nombre_completo}
      />,
      <RadioGroup
        key="genero"
        label="Indica tu género:"
        options={genderOptions}
        name="genero"
        selectedValue={formData.genero}
        onChange={handleChange}
        error={errors.genero}
      />,
      <Select
        key="institucion_educativa"
        label="Seleccione el Nombre de su Institución Educativa"
        name="institucion_educativa"
        options={institucionOptions}
        value={formData.institucion_educativa}
        onChange={handleChange}
        placeholder="Seleccione el Nombre de su Institución Educativa"
        error={errors.institucion_educativa}
        isOptional={false}
      />,
      <RadioGroup
        key="grade"
        label="¿Qué grado estás cursando en este momento?"
        options={gradeOptions}
        name="grado_actual"
        selectedValue={formData.grado_actual}
        onChange={handleChange}
        error={errors.grado_actual}
      />,
      <Select
        key="seccion"
        label="Sección a la que perteneces"
        name="seccion"
        options={seccionOptions}
        value={formData.seccion}
        onChange={handleChange}
        placeholder="Escoge una opcion"
        error={errors.seccion}
        isOptional={false}
      />,
      <InputField
        key="correo_personal"
        label="Correo electrónico personal"
        name="correo_personal"
        value={formData.correo_personal}
        onChange={handleChange}
        placeholder="ejemplo@gmail.com"
        isOptional={false}
        error={errors.correo_personal}
        type="email"
      />,
      <InputField
        key="celular"
        label="Número de celular"
        name="celular"
        value={formData.celular}
        onChange={handleChange}
        placeholder="Ingrese un Número de celular"
        isOptional={false}
        error={errors.celular}
        type="number"
      />,
      <RadioGroup
        key="propietario_numero"
        label="Si el número no es tuyo, indica a quién le pertenece"
        options={propietarioNumeroOptions}
        name="propietario_numero"
        selectedValue={formData.propietario_numero}
        onChange={handleChange}
        error={errors.propietario_numero}
        isOptional={true}
      />,
    ],
    [
      <Select
        key="documento_identidad"
        label="Selecciona tu documento de identidad"
        name="documento_identidad"
        options={documentoIdentidadOptions}
        value={formData.documento_identidad}
        onChange={handleChange}
        placeholder="Escoge una opcion"
        error={errors.documento_identidad}
        isOptional={false}
      />,
      <InputField
        label="Número de documento de identidad"
        name="numero_documento"
        value={formData.numero_documento}
        onChange={handleChange}
        placeholder="Ingrese su Número de documento de identidad"
        error={errors.numero_documento}
      />,
      <DateInput
        key="fecha_nacimiento"
        label="¿Cuál es tu fecha de nacimiento?"
        name="fecha_nacimiento"
        value={formData.fecha_nacimiento}
        onChange={handleChange}
        placeholder="Selecciona una fecha"
        isOptional={false}
        error={errors.fecha_nacimiento}
      />,
      <RadioGroup
        label="¿Cómo te reconoces de acuerdo con tu cultura, pueblo o rasgos físicos?"
        options={identidadCulturalOptions}
        name="identidad_cultural"
        selectedValue={formData.identidad_cultural}
        onChange={handleChange}
        error={errors.identidad_cultural}
      />,
      <CheckboxGroup
        label="Indica si presentas alguna de las siguientes dificultades:"
        options={dificultadesOptions}
        name="dificultades"
        selectedValues={
          formData.dificultades ? formData.dificultades.split(",") : []
        }
        selectedValue={formData.dificultades}
        onChange={handleChange}
        error={errors.dificultades}
        isOptional={false}
        maxSelections={8}
      />,
      <RadioGroup
        label="¿Sabes cuál es el nivel educativo más alto entre las personas que viven contigo?"
        options={nivelEducativoOptions}
        name="nivel_educativo_hogar"
        selectedValue={formData.nivel_educativo_hogar}
        onChange={handleChange}
        error={errors.nivel_educativo_hogar}
      />,
    ],
    [
      <RadioGroup
        label="¿Tienes un celular inteligente o smartphone?"
        options={celular_inteligenteOptions}
        name="celular_inteligente"
        selectedValue={formData.celular_inteligente}
        onChange={handleChange}
        error={errors.celular_inteligente}
      />,
      <RadioGroup
        label="La línea telefónica de este celular es..."
        options={linea_celularOptions}
        name="linea_celular"
        selectedValue={formData.linea_celular}
        onChange={handleChange}
        error={errors.linea_celular}
      />,
      <RadioGroup
        label="¿En tu hogar hay un computador para tu uso?"
        options={computador_hogarOptions}
        name="computador_hogar"
        selectedValue={formData.computador_hogar}
        onChange={handleChange}
        error={errors.computador_hogar}
      />,
      <RadioGroup
        label="¿De qué forma te conectas a internet desde tu hogar?"
        options={conexion_internetOptions}
        name="conexion_internet"
        selectedValue={formData.conexion_internet}
        onChange={handleChange}
        error={errors.conexion_internet}
      />,
      <RadioGroup
        label="¿Qué tanto consideras que la tecnología facilita las actividades de tu vida diaria?"
        options={tecnologia_vida_diariaOptions}
        name="tecnologia_vida_diaria"
        selectedValue={formData.tecnologia_vida_diaria}
        onChange={handleChange}
        error={errors.tecnologia_vida_diaria}
      />,
      <RadioGroup
        label="¿Qué tan importante es aprender habilidades digitales para tu desarrollo personal?"
        options={importancia_habilidades_digitalesOptions}
        name="importancia_habilidades_digitales"
        selectedValue={formData.importancia_habilidades_digitales}
        onChange={handleChange}
        error={errors.importancia_habilidades_digitales}
      />,
      <RadioGroup
        label=" ¿Crees que la tecnología es una herramienta importante para tu aprendizaje?"
        options={tecnologia_vida_diariaOptions}
        name="tecnologia_aprendizaje"
        selectedValue={formData.tecnologia_aprendizaje}
        onChange={handleChange}
        error={errors.tecnologia_aprendizaje}
      />,
    ],
    [
      <RadioGroup
        label="¿Cuánta confianza tienes en tus habilidades para utilizar inteligencia artificial o análisis de datos y resolver actividades en tu vida académica?"
        options={confianzaOptions}
        name="confianza_ia_academico"
        selectedValue={formData.confianza_ia_academico}
        onChange={handleChange}
        error={errors.confianza_ia_academico}
      />,
      <RadioGroup
        label="¿Cuánta confianza tienes en tus habilidades para utilizar inteligencia artificial o análisis de datos y resolver actividades en tu vida personal?"
        options={confianzaOptions}
        name="confianza_ia_personal"
        selectedValue={formData.confianza_ia_personal}
        onChange={handleChange}
        error={errors.confianza_ia_personal}
      />,
      <RadioGroup
        label="Cuánto es 8+8"
        options={suma_8_8Options}
        name="suma_8_8"
        selectedValue={formData.suma_8_8}
        onChange={handleChange}
      />,
      <RadioGroup
        label="¿Tienes la responsabilidad de trabajar para ayudar con los ingresos de tu casa?"
        options={responsabilidadOptions}
        name="trabajo_casa"
        selectedValue={formData.trabajo_casa}
        onChange={handleChange}
        error={errors.trabajo_casa}
      />,
      <RadioGroup
        label="¿Tienes la responsabilidad de cuidar o supervisar a otras personas en tu casa? (Por ejemplo: ayudándolas con actividades como alimentación y vestimenta)"
        options={responsabilidadOptions}
        name="cuidado_personas_casa"
        selectedValue={formData.cuidado_personas_casa}
        onChange={handleChange}
        error={errors.cuidado_personas_casa}
      />,
      <Select
        key="ocupacion_responsable_hogar"
        label="Durante el último mes, ¿a qué se dedicó principalmente la persona a cargo de tu hogar?"
        name="ocupacion_responsable_hogar"
        options={ocupacion_responsable_hogarOptions}
        value={formData.ocupacion_responsable_hogar}
        onChange={handleChange}
        placeholder="Escoge una opcion"
        error={errors.ocupacion_responsable_hogar}
        isOptional={false}
      />,
    ],
    [
      <RadioGroup
        label="¿Te interesaría tomar la iniciativa para guiar a las personas en tu comunidad (familiares, amistades, docentes, directivos, entorno cercano fuera de la escuela, otros) en diferentes actividades y proyectos?"
        options={tecnologia_vida_diariaOptions}
        name="liderazgo_comunidad"
        selectedValue={formData.liderazgo_comunidad}
        onChange={handleChange}
        error={errors.liderazgo_comunidad}
      />,
      <RadioGroup
        label="¿Qué tan motivado te sientes para desarrollar proyectos relacionados con la tecnología con miembros de tu comunidad? (padres, madres, familiares, docentes, directivos, compañeros de otros grados, personas fuera de la escuela, otros)."
        options={tecnologia_vida_diariaOptions}
        name="motivacion_proyectos_tecnologicos"
        selectedValue={formData.motivacion_proyectos_tecnologicos}
        onChange={handleChange}
        error={errors.motivacion_proyectos_tecnologicos}
      />,
      <InputField
        label="¿Para qué sirve la Inteligencia artificial? Explica todo lo que sabes"
        name="funcion_ia"
        value={formData.funcion_ia}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        error={errors.funcion_ia}
      />,
      <CheckboxGroup
        label="Selecciona las opciones correctas relacionadas con el uso de la Inteligencia Artificial (IA):"
        name="uso_correcto_ia"
        options={uso_correcto_iaOptions}
        selectedValues={
          formData.uso_correcto_ia ? formData.uso_correcto_ia.split(",") : []
        }
        onChange={handleChange}
        maxSelections={5}
        error={errors.uso_correcto_ia}
        isOptional={false}
      />,
      <CheckboxGroup
        label="¿Qué herramientas de inteligencia artificial (IA) has utilizado? Selecciona todas las que apliquen:"
        name="herramientas_ia_usadas"
        options={herramientas_ia_usadasOptions}
        selectedValues={
          formData.herramientas_ia_usadas
            ? formData.herramientas_ia_usadas.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={10}
        error={errors.herramientas_ia_usadas}
      />,
      <InputField
        label="Si marcaste otras, detalla qué herramientas has utilizado:"
        name="detalle_herramientas_ia"
        value={formData.detalle_herramientas_ia}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        isOptional={true}
      />,
      <InputField
        label="Describe un proyecto o tarea donde hayas utilizado Inteligencia Artificial."
        name="proyecto_con_ia"
        value={formData.proyecto_con_ia}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
      />,
      <InputField
        label="¿Para qué sirve Excel? Explica todo lo que sabes"
        name="funcion_excel"
        value={formData.funcion_excel}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
      />,
    ],
    [
      <CheckboxGroup
        label="¿Para qué se puede usar Excel? Selecciona las respuestas correctas."
        name="uso_excel"
        options={uso_excelOptions}
        selectedValues={formData.uso_excel ? formData.uso_excel.split(",") : []}
        onChange={handleChange}
        maxSelections={5}
        error={errors.uso_excel}
        isOptional={false}
      />,
      <RadioGroup
        label="¿Con qué frecuencia utilizas Microsoft Excel en tus actividades?"
        options={frecuencia_uso_excelOptions}
        name="frecuencia_uso_excel"
        selectedValue={formData.frecuencia_uso_excel}
        onChange={handleChange}
        error={errors.frecuencia_uso_excel}
      />,
      <CheckboxGroup
        label="En Excel, ¿qué funciones has utilizado y qué tareas has realizado? Selecciona todas las opciones que apliquen:"
        name="funciones_tareas_excel"
        options={funciones_tareas_excelOptions}
        selectedValues={
          formData.funciones_tareas_excel
            ? formData.funciones_tareas_excel.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={6}
        error={errors.funciones_tareas_excel}
      />,
      <InputField
        label="Si marcaste otras, por favor, especifíca:"
        name="otras_funciones_excel"
        value={formData.otras_funciones_excel}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        isOptional={true}
      />,
      <RadioGroup
        label="Me siento capaz de buscar información sobre programas educativos de mi interés."
        options={motivacion_profesores_emprenderOptions}
        name="buscar_programas_educativos"
        selectedValue={formData.buscar_programas_educativos}
        onChange={handleChange}
        error={errors.buscar_programas_educativos}
      />,
      // <RadioGroup
      //   label="Reconozco las entidades en las que podría realizar los estudios de mi interés."
      //   options={motivacion_profesores_emprenderOptions}
      //   name="reconocimiento_entidades_educativas"
      //   selectedValue={formData.reconocimiento_entidades_educativas}
      //   onChange={handleChange}
      //   error={errors.reconocimiento_entidades_educativas}
      // />,
    ],
    [
      <CheckboxGroup
        label="Selecciona 4 aspectos que tendrías en cuenta al escoger un programa educativo de tu interés."
        name="aspectos_para_elegir_programa"
        options={aspectos_para_elegir_programaOptions}
        selectedValues={
          formData.aspectos_para_elegir_programa
            ? formData.aspectos_para_elegir_programa.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={4}
        error={errors.aspectos_para_elegir_programa}
        isOptional={false} // Ajustar según sea necesario
      />,
      <RadioGroup
        label="He recolectado información sobre distintos programas de educación superior y las instituciones que ofrecen estos programas."
        options={informacion_programas_superioresOptions}
        name="informacion_programas_superiores"
        selectedValue={formData.informacion_programas_superiores}
        onChange={handleChange}
        error={errors.informacion_programas_superiores}
      />,
      <RadioGroup
        label="Tengo interés en buscar información sobre apoyo ﬁnanciero (becas) para seguir estudiando después de graduarme."
        options={motivacion_profesores_emprenderOptions}
        name="apoyo_financiero_becas"
        selectedValue={formData.apoyo_financiero_becas}
        onChange={handleChange}
        error={errors.apoyo_financiero_becas}
      />,
      <InputField
        label="Cuánto es 3X7"
        name="multiplicacion_3x7"
        value={formData.multiplicacion_3x7}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        type="number"
        isOptional={true}
      />,
      <RadioGroup
        label="Me conozco y tengo claro cuáles son mis gustos e intereses."
        options={motivacion_profesores_emprenderOptions}
        name="conocimiento_gustos_intereses"
        selectedValue={formData.conocimiento_gustos_intereses}
        onChange={handleChange}
        error={errors.conocimiento_gustos_intereses}
      />,
      <RadioGroup
        label="Tengo claro cómo hacer una hoja de vida."
        options={motivacion_profesores_emprenderOptions}
        name="como_hacer_hoja_de_vida"
        selectedValue={formData.como_hacer_hoja_de_vida}
        onChange={handleChange}
        error={errors.como_hacer_hoja_de_vida}
      />,
      <RadioGroup
        label="Reconozco las empresas, organizaciones o entidades en las que podría trabajar según mi interés."
        options={motivacion_profesores_emprenderOptions}
        name="reconocimiento_empresas_para_trabajar"
        selectedValue={formData.reconocimiento_empresas_para_trabajar}
        onChange={handleChange}
        error={errors.reconocimiento_empresas_para_trabajar}
      />,
    ],
    [
      <RadioGroup
        label="Conozco las condiciones de contratación y/o vinculación laboral."
        options={motivacion_profesores_emprenderOptions}
        name="conocimiento_condiciones_laborales"
        selectedValue={formData.conocimiento_condiciones_laborales}
        onChange={handleChange}
        error={errors.conocimiento_condiciones_laborales}
      />,
      <RadioGroup
        label="Conozco el salario promedio de las diferentes profesiones o trabajos de mi interés."
        options={motivacion_profesores_emprenderOptions}
        name="conocimiento_salarios_promedio"
        selectedValue={formData.conocimiento_salarios_promedio}
        onChange={handleChange}
        error={errors.conocimiento_salarios_promedio}
      />,
      <RadioGroup
        label="He identificado sitios existentes que me pueden ayudar en la búsqueda de trabajo (Bolsas de empleos, paginas para encontrar empleos, etc.)"
        options={sitios_busqueda_trabajoOptions}
        name="sitios_busqueda_trabajo"
        selectedValue={formData.sitios_busqueda_trabajo}
        onChange={handleChange}
        error={errors.sitios_busqueda_trabajo}
      />,
      <InputField
        label="Si conoces bolsas de trabajo o páginas para encontrar empleos, menciona cuáles:"
        name="detalle_bolsas_trabajo"
        value={formData.detalle_bolsas_trabajo}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        isOptional={true}
      />,
      <RadioGroup
        label="Me siento capaz de buscar información sobre ofertas laborales de mi interés."
        options={motivacion_profesores_emprenderOptions}
        name="buscar_ofertas_laborales"
        selectedValue={formData.buscar_ofertas_laborales}
        onChange={handleChange}
        error={errors.buscar_ofertas_laborales}
      />,
      <RadioGroup
        label="He recolectado información sobre las oportunidades laborales que pueden darse si continuo mis estudios."
        options={informacion_oportunidades_laboralesOptions}
        name="informacion_oportunidades_laborales"
        selectedValue={formData.informacion_oportunidades_laborales}
        onChange={handleChange}
        error={errors.informacion_oportunidades_laborales}
      />,
    ],
    [
      <RadioGroup
        label="Tengo claras las habilidades y conocimientos que necesito para ingresar al trabajo de mi interés."
        options={motivacion_profesores_emprenderOptions}
        name="habilidades_necesarias_trabajo"
        selectedValue={formData.habilidades_necesarias_trabajo}
        onChange={handleChange}
        error={errors.habilidades_necesarias_trabajo}
      />,
      <RadioGroup
        label="De los siguientes grupos temáticos, ¿en cuál clasiﬁcarías tus principales intereses para seguir estudiando y/o trabajando al graduarte?"
        options={temas_de_interesOptions}
        name="temas_de_interes"
        selectedValue={formData.temas_de_interes}
        onChange={handleChange}
        error={errors.temas_de_interes}
      />,
      <CheckboxGroup
        label="Selecciona tus 3 principales fuentes de información para conocer sobre programas educativos, trabajo y/o proyecto de vida:"
        name="fuentes_informacion_educativa_laboral"
        options={fuentes_informacion_educativa_laboralOptions}
        selectedValues={
          formData.fuentes_informacion_educativa_laboral
            ? formData.fuentes_informacion_educativa_laboral.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={3}
        error={errors.fuentes_informacion_educativa_laboral}
        isOptional={false} // Ajustar según sea necesario
      />,
      <InputField
        label="Si marcaste otros, detalla cuál es tu fuente de información:"
        name="detalle_fuentes_informacion"
        value={formData.detalle_fuentes_informacion}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        isOptional={true}
      />,
    ],
    [
      <RadioGroup
        label="Analizo las diferentes opciones de una situación antes de tomar una decisión."
        options={motivacion_profesores_emprenderOptions}
        name="analisis_de_opciones"
        selectedValue={formData.analisis_de_opciones}
        onChange={handleChange}
        error={errors.analisis_de_opciones}
      />,
      <RadioGroup
        label="Pido apoyo ante decisiones que me son difíciles."
        options={motivacion_profesores_emprenderOptions}
        name="solicitud_de_apoyo"
        selectedValue={formData.solicitud_de_apoyo}
        onChange={handleChange}
        error={errors.solicitud_de_apoyo}
      />,
      <RadioGroup
        label="Cuando te enfrentas a un tema difícil de entender, ¿qué estrategia utilizas para aprenderlo?"
        options={estrategia_de_aprendizajeOptions}
        name="estrategia_de_aprendizaje"
        selectedValue={formData.estrategia_de_aprendizaje}
        onChange={handleChange}
        error={errors.estrategia_de_aprendizaje}
      />,
      <RadioGroup
        label="Cómo organizas usualmente tus tareas y proyectos escolares?"
        options={organizacion_de_tareasOptions}
        name="organizacion_de_tareas"
        selectedValue={formData.organizacion_de_tareas}
        onChange={handleChange}
        error={errors.organizacion_de_tareas}
      />,
      <RadioGroup
        label="Tengo disposición por aprender nuevas habilidades y conocimientos que sean relevantes para mi futura carrera."
        options={motivacion_profesores_emprenderOptions}
        name="disposicion_para_aprender"
        selectedValue={formData.disposicion_para_aprender}
        onChange={handleChange}
        error={errors.disposicion_para_aprender}
      />,
      <RadioGroup
        label="Sé cómo manejar las emociones que me genera tomar decisiones nuevas."
        options={motivacion_profesores_emprenderOptions}
        name="manejo_de_emociones"
        selectedValue={formData.manejo_de_emociones}
        onChange={handleChange}
        error={errors.manejo_de_emociones}
      />,
    ],
    [
      <RadioGroup
        label="¿Qué haces para asegurarte de que tu equipo entiende tus ideas durante un trabajo en grupo?"
        options={asegurar_comprension_equipoOptions}
        name="asegurar_comprension_equipo"
        selectedValue={formData.asegurar_comprension_equipo}
        onChange={handleChange}
        error={errors.asegurar_comprension_equipo}
      />,
      <RadioGroup
        label="Si un miembro del equipo no está cumpliendo con sus tareas, ¿cómo actúas?"
        options={manejo_de_incumplimientoOptions}
        name="manejo_de_incumplimiento"
        selectedValue={formData.manejo_de_incumplimiento}
        onChange={handleChange}
        error={errors.manejo_de_incumplimiento}
      />,
      <RadioGroup
        label="Cuánto es 45+136"
        options={suma_45_136Options}
        name="suma_45_136"
        selectedValue={formData.suma_45_136}
        onChange={handleChange}
      />,
      <RadioGroup
        label="Tener una buena educación superior es la mejor vía para tener una vida exitosa."
        options={motivacion_profesores_emprenderOptions}
        name="educacion_superior_vida_exitosa"
        selectedValue={formData.educacion_superior_vida_exitosa}
        onChange={handleChange}
        error={errors.educacion_superior_vida_exitosa}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="Del 0 a 10, siendo 0 nada de interés y 10 demasiado interés, ¿cuánto interés tienes para continuar estudiando inmediatamente después de graduarte del bachillerato?"
        colorType="default"
        selectedValue={String(formData.interes_estudios_post_bachillerato || 0)}
        onChange={handleChange}
        error={errors.interes_estudios_post_bachillerato}
        isOptional={true}
        name="interes_estudios_post_bachillerato"
        type="default"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="Del 0 a 10, donde 0 es nada probable y 10 totalmente probable, ¿qué tan probable es que consideres abandonar tus estudios antes de graduarte?"
        colorType="default"
        selectedValue={String(formData.probabilidad_abandonar_estudios || 0)}
        onChange={handleChange}
        error={errors.probabilidad_abandonar_estudios}
        isOptional={true}
        name="probabilidad_abandonar_estudios"
      />,

      <RadioGroup
        label="¿Cuál sería el motivo que te llevaría a abandonar tus estudios?"
        options={motivo_abandonar_estudiosOptions}
        name="motivo_abandonar_estudios"
        selectedValue={formData.motivo_abandonar_estudios}
        onChange={handleChange}
        error={errors.motivo_abandonar_estudios}
      />,
    ],
    [
      <Select
        key="maximo_nivel_educativo_sonado"
        label="Teniendo en cuenta tus objetivos y expectativas de vida, ¿cuál es el máximo nivel educativo que sueñas alcanzar en tu vida?"
        name="maximo_nivel_educativo_sonado"
        options={maximo_nivel_educativo_Options}
        value={formData.maximo_nivel_educativo_sonado}
        onChange={handleChange}
        placeholder="Escoge una opcion"
        error={errors.maximo_nivel_educativo_sonado}
        isOptional={false}
      />,
      <Select
        key="maximo_nivel_educativo_esperado"
        label="Teniendo en cuenta tus habilidades e intereses, ¿cuál es el máximo nivel educativo que crees poder alcanzar en tu vida?"
        name="maximo_nivel_educativo_esperado"
        options={maximo_nivel_educativo_Options}
        value={formData.maximo_nivel_educativo_esperado}
        onChange={handleChange}
        placeholder="Escoge una opcion"
        error={errors.maximo_nivel_educativo_esperado}
        isOptional={false}
      />,
      <RadioGroup
        label="Mi familia me motiva a seguir estudiando al graduarme."
        options={motivacion_profesores_emprenderOptions}
        name="apoyo_familiar_continuar_estudios"
        selectedValue={formData.apoyo_familiar_continuar_estudios}
        onChange={handleChange}
        error={errors.apoyo_familiar_continuar_estudios}
      />,
      <CheckboxGroup
        label="Marca quiénes son los miembros de tu familia que más te apoyan y motivan en tu educación. Máximo 3 personas."
        name="miembros_familia_que_apoyan"
        options={miembros_familia_que_apoyanOptions}
        selectedValues={
          formData.miembros_familia_que_apoyan
            ? formData.miembros_familia_que_apoyan.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={3}
        error={errors.miembros_familia_que_apoyan}
        isOptional={false}
      />,

      <RadioGroup
        label="Mi familia me apoyaría económicamente para continuar estudiando al graduarme."
        options={motivacion_profesores_emprenderOptions}
        name="apoyo_economico_familiar"
        selectedValue={formData.apoyo_economico_familiar}
        onChange={handleChange}
        error={errors.apoyo_economico_familiar}
      />,
      <RadioGroup
        label="Mi familia me dice que programa educativo debo estudiar al graduarme."
        options={motivacion_profesores_emprenderOptions}
        name="influencia_familiar_estudios"
        selectedValue={formData.influencia_familiar_estudios}
        onChange={handleChange}
        error={errors.influencia_familiar_estudios}
      />,
      <RadioGroup
        label="Mis profesores me ayudan a reconocer para qué tengo habilidad."
        options={motivacion_profesores_emprenderOptions}
        name="ayuda_profesores_reconocimiento_habilidades"
        selectedValue={formData.ayuda_profesores_reconocimiento_habilidades}
        onChange={handleChange}
        error={errors.ayuda_profesores_reconocimiento_habilidades}
      />,
    ],
    [
      <RadioGroup
        label="Mis profesores desarrollan actividades que me ayudan a tomar decisiones sobre mi futuro."
        options={motivacion_profesores_emprenderOptions}
        name="actividades_profesores_decisiones_futuras"
        selectedValue={formData.actividades_profesores_decisiones_futuras}
        onChange={handleChange}
        error={errors.actividades_profesores_decisiones_futuras}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="Del 0 a 10, siendo 0 nada de interés y 10 demasiado interés, ¿cuánto interés tienes para buscar oportunidades laborales inmediatamente después de graduarte del bachillerato?"
        colorType="default"
        selectedValue={String(formData.interes_oportunidades_laborales || 0)}
        onChange={handleChange}
        error={errors.interes_oportunidades_laborales}
        isOptional={false}
        name="interes_oportunidades_laborales"
      />,
      <RadioGroup
        label="Me siento en capacidad para responder a los retos y desafíos que enfrentaré al ingresar al mercado laboral."
        options={motivacion_profesores_emprenderOptions}
        name="capacidad_afrontar_desafios_laborales"
        selectedValue={formData.capacidad_afrontar_desafios_laborales}
        onChange={handleChange}
        error={errors.capacidad_afrontar_desafios_laborales}
      />,
      <CheckboxGroup
        label="Marca las actividades que hayas realizado en el último año:"
        name="actividades_realizadas_ultimo_ano"
        options={actividades_realizadas_ultimo_anoOptions}
        selectedValues={
          formData.actividades_realizadas_ultimo_ano
            ? formData.actividades_realizadas_ultimo_ano.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={7}
        error={errors.actividades_realizadas_ultimo_ano}
      />,
      <CheckboxGroup
        label="¿Cuál de las siguientes opciones representa mejor lo que planeas hacer al graduarte? Selecciona máximo 3 respuestas"
        name="planes_post_graduacion"
        options={planes_post_graduacionOptions}
        selectedValues={
          formData.planes_post_graduacion
            ? formData.planes_post_graduacion.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={3}
        error={errors.planes_post_graduacion}
      />,
      <InputField
        label="Si deseas, cuéntanos un poco más de tus planes futuros."
        name="detalle_planes_futuros"
        value={formData.detalle_planes_futuros}
        onChange={handleChange}
        placeholder="Ingrese una respuesta"
        isOptional={true}
      />,
    ],
    [
      <RadioGroup
        label="Considero que mi familia me brinda el apoyo necesario para alcanzar mis metas profesionales."
        options={motivacion_profesores_emprenderOptions}
        name="apoyo_familiar_metas_profesionales"
        selectedValue={formData.apoyo_familiar_metas_profesionales}
        onChange={handleChange}
        error={errors.apoyo_familiar_metas_profesionales}
      />,
      <RadioGroup
        label="Mi familia me ayuda a buscar información de trabajos que me gustaría realizar."
        options={motivacion_profesores_emprenderOptions}
        name="ayuda_familiar_busqueda_trabajo"
        selectedValue={formData.ayuda_familiar_busqueda_trabajo}
        onChange={handleChange}
        error={errors.ayuda_familiar_busqueda_trabajo}
      />,
      <RadioGroup
        label="Mi familia me motiva y ayuda a pensar en mi futuro y plantear metas de vida."
        options={motivacion_profesores_emprenderOptions}
        name="motivacion_familiar_metas_vida"
        selectedValue={formData.motivacion_familiar_metas_vida}
        onChange={handleChange}
        error={errors.motivacion_familiar_metas_vida}
      />,
      <RadioGroup
        label="Mi familia me motiva a conseguir trabajo al graduarme."
        options={motivacion_profesores_emprenderOptions}
        name="motivacion_familiar_conseguir_trabajo"
        selectedValue={formData.motivacion_familiar_conseguir_trabajo}
        onChange={handleChange}
        error={errors.motivacion_familiar_conseguir_trabajo}
      />,
      <RadioGroup
        label="Mi familia me motiva a emprender."
        options={motivacion_profesores_emprenderOptions}
        name="motivacion_familiar_emprender"
        selectedValue={formData.motivacion_familiar_emprender}
        onChange={handleChange}
        error={errors.motivacion_familiar_emprender}
      />,
      <RadioGroup
        label="Mi familia me dice cuál trabajo debo realizar."
        options={motivacion_profesores_emprenderOptions}
        name="influencia_familiar_trabajo"
        selectedValue={formData.influencia_familiar_trabajo}
        onChange={handleChange}
        error={errors.influencia_familiar_trabajo}
      />,
      <RadioGroup
        label="Mis profesores me motivan a pensar en mi futuro y plantear metas de vida."
        options={motivacion_profesores_emprenderOptions}
        name="motivacion_profesores_metas_vida"
        selectedValue={formData.motivacion_profesores_metas_vida}
        onChange={handleChange}
        error={errors.motivacion_profesores_metas_vida}
      />,
      <RadioGroup
        label="Mis profesores me motivan a emprender."
        options={motivacion_profesores_emprenderOptions}
        name="motivacion_profesores_emprender"
        selectedValue={formData.motivacion_profesores_emprender}
        onChange={handleChange}
        error={errors.motivacion_profesores_emprender}
      />,
    ],
  ];

  const handleNextPage = () => {
    if (validatePage()) {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
    console.log(formData);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const validatePage = () => {
    const newErrors = {};

    // Obtener los nombres de los campos de la página actual
    const currentPageFields = pages[currentPage].map(
      (element) => element.props.name
    );

    currentPageFields.forEach((field) => {
      if (!optionalFields.includes(field) && !formData[field]) {
        newErrors[field] = "Este campo es requerido";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.classList.add("scroll-adjust"); // Añadir clase para ajuste de scroll
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    // Scroll al inicio del formulario cuando cambia la página
    scrollToTop();
  }, [currentPage]); // Se ejecuta cada vez que currentPage cambia

  return (
    <div
      className={`flex flex-col mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl border max-w-[650px] ${
        successMessage ? "bg-black/20" : "bg-white-100/5"
      } bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border-gray-100`}
    >
      {successMessage ? (
        <div className="text-white text-center flex flex-col gap-2">
          <Lottie animationData={check} loop={false} className="h-20" />
          {successMessage}
          <p className="font-semibold">Saludos, Crack The Code.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-7"
        >
          {pages[currentPage]}
          <div className="flex gap-5 mx-auto">
            <TfiArrowCircleLeft
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === 0 ? "invisible" : "visible"
              }`}
              onClick={() => {
                handlePreviousPage();
                scrollToTop();
              }}
            />
            <TfiArrowCircleRight
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === pages.length - 1 ? "invisible" : "visible"
              }`}
              onClick={() => {
                handleNextPage();
                scrollToTop();
              }}
            />
          </div>
          {currentPage === pages.length - 1 && (
            <button
              type="submit"
              className="rounded-lg border-2 w-full sm:w-[100px] mx-auto mt-5 text-xl text-white p-2 hover:bg-black/40 transition duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          )}
          {errorMessage && (
            <div className="mt-5 text-red-500 text-center">{errorMessage}</div>
          )}
        </form>
      )}
    </div>
  );
}

export default Form;

{
  /* <InputField
            label="Nombre y Apellido"
            name="auxiliar_teacher_name"
            value={formData.auxiliar_teacher_name}
            onChange={handleChange}
            placeholder="Auxiliar Teacher Name"
            example="Ejemplo: Romina Patani"
          />
          <InputField
            label="Nombre del Colegio"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="Institution"
            example="Ejemplo: I.E. Normal Superior De La Presentacion"
          />
          <InputField
            label="Grado y Seccion"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder="Grade"
            example="Ejemplo: 9-A"
          />
          <InputField
            label="Nombre del/la profesor(a) CTC"
            name="ctc_teacher_name"
            value={formData.ctc_teacher_name}
            onChange={handleChange}
            placeholder="CTC Teacher Name"
          />
          <InputField
            label="¿Qué tan claras y comprensibles son las instrucciones proporcionadas por el/la profesor(a) CTC?"
            name="instrucciones_ctc"
            value={formData.instrucciones_ctc}
            onChange={handleChange}
            placeholder="Instrucciones CTC"
          />
          <InputField
            label="¿Qué tan cómodos se sienten los estudiantes al hacer preguntas al/la profesor(a) CTC?"
            name="comodidad_estudiantes"
            value={formData.comodidad_estudiantes}
            onChange={handleChange}
            placeholder="Comodidad Estudiantes"
          />
          <InputField
            label="¿Qué tan creativo(a) es el/la profesor(a) CTC para mantener a los estudiantes motivados e interesados?"
            name="creatividad_ctc"
            value={formData.creatividad_ctc}
            onChange={handleChange}
            placeholder="Creatividad CTC"
          />
          <InputField
            label="¿Qué tan buena es la colaboración entre usted y el/la profesor(a) CTC?"
            name="colaboracion"
            value={formData.colaboracion}
            onChange={handleChange}
            placeholder="Colaboracion"
          />
          <InputField
            label="En las últimas 2 semanas, ¿Qué problemas técnicos surgieron durante las clases? Marque todas las que apliquen."
            name="problemas_tecnicos"
            value={formData.problemas_tecnicos}
            onChange={handleChange}
            placeholder="Problemas Tecnicos"
          />
          <InputField
            label="Si selecciona 'Otro', especifique:"
            name="problemas_tecnicos_otro"
            value={formData.problemas_tecnicos_otro}
            onChange={handleChange}
            placeholder="Problemas Tecnicos Otro"
          />
          <InputField
            label="¿Qué tan rápido y eficiente se solucionaron los problemas técnicos durante las clases?"
            name="solucion_problemas_tecnicos"
            value={formData.solucion_problemas_tecnicos}
            onChange={handleChange}
            placeholder="Solucion Problemas Tecnicos"
          />
          <InputField
            label="¿Qué es lo que más le gustó de nuestras clases en las últimas dos semanas?"
            name="mayor_gusto_ultimas_dos_semanas"
            value={formData.mayor_gusto_ultimas_dos_semanas}
            onChange={handleChange}
            placeholder="Mayor Gusto Ultimas Dos Semanas"
          />
          <InputField
            label="¿Qué aspectos cree que podríamos mejorar en nuestras clases?"
            name="aspectos_mejora"
            value={formData.aspectos_mejora}
            onChange={handleChange}
            placeholder="Aspectos Mejora"
          />
          <InputField
            label="En una escala del 1 al 10, ¿Qué tan satisfecho(a) se encuentra trabajando con CTC?"
            name="csat"
            value={formData.csat}
            onChange={handleChange}
            placeholder="CSAT"
          />
          <InputField
            label="En una escala del 1 al 10, ¿Qué tanto recomendaría trabajar con CTC?"
            name="nps"
            value={formData.nps}
            onChange={handleChange}
            placeholder="NPS"
          /> */
}
