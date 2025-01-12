const Button = ({
  testo = "Clicca qui",
  onClick,
  colore = "",
  dimensione = "md",
  disabilitato = false,
  classeAggiuntiva = "",
}) => {
  // Definizione delle classi in base alle dimensioni
  const dimensioni = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabilitato}
      className={`${colore} hover:opacity-90 text-white font-semibold rounded ${
        dimensioni[dimensione]
      } ${
        disabilitato ? "opacity-50 cursor-not-allowed" : ""
      } ${classeAggiuntiva}`}
    >
      {testo}
    </button>
  );
};

export default Button;
