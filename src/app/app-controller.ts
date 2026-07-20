import type { IParserFactory } from "../parsing/interfaces/parser-factory.interface";
import type { IGraphModelBuilder } from "../graph-logic/interfaces/graph-model-builder.interface";
import type { IGraphData } from "../graph-logic/graph-types";
import type { IOntologyModel } from "../domain/interfaces/ontology-model.interface";
import type { IOntEntity } from "../domain/interfaces/ont-entity.interface";

export class AppController {
  private parserFactory: IParserFactory;
  private graphModelBuilder: IGraphModelBuilder;
  private currentModel: IOntologyModel | null = null;

  constructor(
    parserFactory: IParserFactory,
    graphModelBuilder: IGraphModelBuilder,
  ) {
    this.parserFactory = parserFactory;
    this.graphModelBuilder = graphModelBuilder;
  }

  async handleFile(file: File, extension: string): Promise<IGraphData> {
    const texto = await file.text();
    const parser = this.parserFactory.getParser(extension);
    const modelo = await parser.parse(texto);
    this.currentModel = modelo;
    return this.graphModelBuilder.build(modelo);
  }

  findEntityById(id: string): IOntEntity | undefined {
    return this.currentModel?.findById(id);
  }

  isAnnotationProperty(propertyId: string): boolean {
    return this.currentModel?.isAnnotationProperty(propertyId) ?? false;
  }
}
