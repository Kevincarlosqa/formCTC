/* eslint-disable react/jsx-key */
import axios from "axios";
import { useState } from "react";
import RatingSelector from "./RatingSelector";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

// eslint-disable-next-line react/prop-types
const InputField = ({ label, name, value, onChange, placeholder, example }) => (
  <div className="mb-1 text-white">
    <label htmlFor={name} className="block mb-2 text-sm font-medium">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="shadow-sm bg-black/40 border border-gray-600 text-sm rounded-lg block w-full p-2.5"
    />
    {example && <p className="text-[11px] px-2 pt-1">{example}</p>}
  </div>
);

function Form() {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    gender: "",
    institucion_educativa: "",
    grade: "",
    correo_personal: "",
    celular: "",
    propietario_numero: "",
    pais: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/db/data/v1/crack_sheets/auxiliar_teachers_follow_up",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": import.meta.env.VITE_NOCODB_KEY,
          },
        }
      );
      console.log(response.data);
      setSuccessMessage(
        `Gracias ${formData.nombre_completo} por completar la encuesta de seguimiento quincenal.`
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos. Inténtelo de nuevo.");
    }
  };

  const checkboxOptions = [
    { label: "Default state", value: "checkbox-1" },
    { label: "Checked state", value: "checkbox-2", checked: true },
  ];
  const propietarioNumeroOptions = [
    { label: "Madre", value: "Madre" },
    { label: "Padre", value: "Padre" },
    { label: "Hermano o Hermana", value: "Hermano o Hermana" },
    { label: "Tio o Tia", value: "Tio o Tia" },
    { label: "Otro Familiar", value: "Otro Familiar" },
    { label: "Prefiero no Responder", value: "Prefiero no Responder" },
  ];
  const genderOptions = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "Otro", value: "Otro" },
    { label: "Prefiero no responder", value: "Prefiero no responder" },
  ];
  const gradeOptions = [
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
  ];

  const pages = [
    [
      <InputField
        label="¿Cuál es tu nombre completo?"
        name="nombre_completo"
        value={formData.nombre_completo}
        onChange={handleChange}
        placeholder="Ejemplo. María Camila Pérez Luján"
      />,
      <RadioGroup
        label="Indica tu género:"
        options={genderOptions}
        name="gender"
        onChange={handleChange}
      />,
      <InputField
        label="Nombre de tu Institución Educativa"
        name="institucion_educativa"
        value={formData.institucion_educativa}
        onChange={handleChange}
        placeholder="Ingrese el Nombre de su Institución Educativa"
      />,
      <RadioGroup
        label="¿Qué grado estás cursando en este momento?"
        options={gradeOptions}
        name="grade"
        onChange={handleChange}
      />,
      <InputField
        label="Correo electrónico personal"
        name="correo_personal"
        value={formData.correo_personal}
        onChange={handleChange}
        placeholder="Ingrese su Correo electrónico personal"
      />,
      <InputField
        label="Número de celular"
        name="celular"
        value={formData.celular}
        onChange={handleChange}
        placeholder="Ingrese un Número de celular"
      />,
      <RadioGroup
        label="Si el número no es tuyo, indica a quién le pertenece"
        options={propietarioNumeroOptions}
        name="propietario_numero"
        onChange={handleChange}
      />,
    ],
    [
      <InputField
        label="Nombre de tu Institución Educativa"
        name="institucion_educativa"
        value={formData.institucion_educativa}
        onChange={handleChange}
        placeholder="Ingrese el Nombre de su Institución Educativa"
      />,
      <RadioGroup
        label="¿Qué grado estás cursando en este momento?"
        options={gradeOptions}
        name="grade"
        onChange={handleChange}
      />,
    ],
    [
      <InputField
        label="Correo electrónico personal"
        name="correo_personal"
        value={formData.correo_personal}
        onChange={handleChange}
        placeholder="Ingrese su Correo electrónico personal"
      />,
      <InputField
        label="Número de celular"
        name="celular"
        value={formData.celular}
        onChange={handleChange}
        placeholder="Ingrese un Número de celular"
      />,
    ],
    [
      <RadioGroup
        label="Si el número no es tuyo, indica a quién le pertenece"
        options={propietarioNumeroOptions}
        name="propietario_numero"
        onChange={handleChange}
      />,
      <div>
        <label
          htmlFor="countries"
          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
        >
          Select an option
        </label>
        <select
          id="countries"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          className="border border-white  text-sm rounded-lg block w-full p-2.5 bg-[#1E2E3F] placeholder-blue-800 text-white"
        >
          <option value="" selected disabled hidden>
            Elige un Pais
          </option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>,
    ],
    [
      <RatingSelector count={10} label="Una pregunta Random" />,
      <CheckboxGroup label="Select your options:" options={checkboxOptions} />,
    ],
  ];

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className={`flex flex-col mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl border max-w-[650px] ${
        successMessage ? "bg-green-500/20" : "bg-white-100/5"
      } bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border-gray-100`}
    >
      {successMessage ? (
        <div className="text-white text-center flex flex-col gap-2">
          {successMessage}
          <p>Saludos, Crack The Code.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          {pages[currentPage]}
          <div className="flex gap-5 mx-auto">
            <TfiArrowCircleLeft
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === 0 ? "invisible" : "visible"
              }`}
              onClick={handlePreviousPage}
            />
            <TfiArrowCircleRight
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === pages.length - 1 ? "invisible" : "visible"
              }`}
              onClick={handleNextPage}
            />
          </div>
          {currentPage === pages.length - 1 && (
            <button
              type="submit"
              className="rounded-lg border-2 w-full sm:w-[100px] mx-auto mt-5 text-xl text-white p-2 hover:bg-black/40 transition duration-300 ease-in-out"
            >
              Enviar
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
