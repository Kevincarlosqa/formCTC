import Form from "./components/Form";
import logoCTC from "./images/logo_ctc.png";
import background from "./images/ctc.png";

function App() {
  return (
    <div className="relative bg-black min-h-screen">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover object-left z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-0 backdrop-filter"></div>
      <div className="relative z-10 p-4 sm:p-8 md:p-10 lg:p-12">
        <img
          src={logoCTC}
          alt="Logo"
          className="mx-auto mb-4 sm:mb-6 md:mb-10 z-50 sm:w-[120px] md:w-[150px] xl:w-[200px]"
        />
        <div className="mx-auto ">
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-10">
            Ingreso de Estudiates
          </p>
          <p className="text-white text-lg sm:text-xl md:text-2xl text-center mb-4 sm:mb-6 md:mb-10">
            Encuesta de Ingreso de Estudiates
          </p>
          <Form />
          <img
            src={logoCTC}
            alt="Logo"
            className="mx-auto my-4 sm:my-6 md:my-10 z-50 w-[100px] sm:w-[120px] md:w-[150px]"
          />
          <p className="text-white text-xs sm:text-sm md:text-base text-center italic">
            Made with 🤍 by DATA Team
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
