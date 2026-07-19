import { useRef, useState } from "react";
import { AppController } from "./app-controller";
import { ParserFactory } from "../parsing/parser-factory";
import { GraphModelBuilder } from "../graph-logic/graph-model-builder";
import type { IGraphData } from "../graph-logic/graph-types";
import type { IOntEntity } from "../domain/interfaces/ont-entity.interface";

export function useAppController() {
  const controllerRef = useRef(
    new AppController(new ParserFactory(), new GraphModelBuilder()),
  );
  const [graphData, setGraphData] = useState<IGraphData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadFile = async (file: File): Promise<void> => {
    const extension = file.name.split(".").pop() ?? "";
    try {
      setError(null);
      const data = await controllerRef.current.handleFile(file, extension);
      setGraphData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el archivo",
      );
    }
  };

  const findEntity = (id: string): IOntEntity | undefined =>
    controllerRef.current.findEntityById(id);

  return { graphData, error, loadFile, findEntity };
}
