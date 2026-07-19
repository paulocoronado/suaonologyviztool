interface NavBarProps {
  fileName: string | null;
}

export function NavBar({ fileName }: NavBarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-indigo-950 px-6 py-3 text-white shadow">
      <div className="flex items-center gap-2">
        <span className="text-xl text-indigo-300">◈</span>
        <span className="text-base font-semibold tracking-wide">
          Visualizador de ontologías
        </span>
      </div>
      <div className="text-sm">
        {fileName ? (
          <span className="font-medium text-indigo-200">{fileName}</span>
        ) : (
          <span className="text-gray-400">Ningún archivo cargado</span>
        )}
      </div>
    </header>
  );
}
