import type { IOntologyModel } from "../domain/interfaces/ontology-model.interface";
import { OntologyModel } from "../domain/ontology-model";
import { OntClass } from "../domain/ont-class";
import { Individual } from "../domain/individual";
import { Relation } from "../domain/relation";
import { RelationKind } from "../domain/interfaces/relation.interface";
import { TermType, type Triple } from "./triple";
import { RDF_VOCABULARY } from "./rdf-vocabulary";

export class TripleToModelMapper {
  private classes = new Map<string, OntClass>();
  private individuals = new Map<string, Individual>();

  mapTriplesToModel(triples: Triple[]): IOntologyModel {
    this.classes = new Map();
    this.individuals = new Map();

    for (const triple of triples) {
      if (triple.predicate === RDF_VOCABULARY.TYPE) this.handleType(triple);
      else if (triple.predicate === RDF_VOCABULARY.SUBCLASS_OF)
        this.handleSubclassOf(triple);
    }

    for (const triple of triples) {
      if (
        triple.predicate !== RDF_VOCABULARY.TYPE &&
        triple.predicate !== RDF_VOCABULARY.SUBCLASS_OF
      ) {
        this.handleOtherTriple(triple);
      }
    }

    return new OntologyModel(this.classes, this.individuals);
  }

  private handleType(triple: Triple): void {
    const clase = this.getOrCreateClass(triple.object);
    const individuo = this.getOrCreateIndividual(triple.subject);
    individuo.addType(clase);
    clase.addIndividual(individuo);
    individuo.addRelation(
      new Relation(individuo, clase, RDF_VOCABULARY.TYPE, RelationKind.TYPE_OF),
    );
  }

  private handleSubclassOf(triple: Triple): void {
    const hijo = this.getOrCreateClass(triple.subject);
    const padre = this.getOrCreateClass(triple.object);
    padre.addSubclass(hijo);
  }

  private handleOtherTriple(triple: Triple): void {
    if (triple.objectType === TermType.LITERAL) this.handleDataProperty(triple);
    else this.handleObjectProperty(triple);
  }

  private handleDataProperty(triple: Triple): void {
    const origen = this.findEntity(triple.subject);
    if (origen instanceof Individual)
      origen.setDataValue(triple.predicate, triple.object);
  }

  private handleObjectProperty(triple: Triple): void {
    const origen = this.findEntity(triple.subject);
    const destino = this.findEntity(triple.object);
    if (!origen || !destino) return;
    if (origen instanceof Individual) {
      origen.addRelation(
        new Relation(
          origen,
          destino,
          triple.predicate,
          RelationKind.OBJECT_PROPERTY,
        ),
      );
    }
  }

  private findEntity(id: string): OntClass | Individual | undefined {
    return this.classes.get(id) ?? this.individuals.get(id);
  }

  private getOrCreateClass(id: string): OntClass {
    let clase = this.classes.get(id);
    if (!clase) {
      clase = new OntClass(id, id);
      this.classes.set(id, clase);
    }
    return clase;
  }

  private getOrCreateIndividual(id: string): Individual {
    let individuo = this.individuals.get(id);
    if (!individuo) {
      individuo = new Individual(id, id);
      this.individuals.set(id, individuo);
    }
    return individuo;
  }
}
