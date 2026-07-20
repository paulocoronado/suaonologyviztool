export const RDF_VOCABULARY = {
  TYPE: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
  SUBCLASS_OF: "http://www.w3.org/2000/01/rdf-schema#subClassOf",
  LABEL: "http://www.w3.org/2000/01/rdf-schema#label",
  DOMAIN: "http://www.w3.org/2000/01/rdf-schema#domain",
  RANGE: "http://www.w3.org/2000/01/rdf-schema#range",
} as const;

export const XSD_NAMESPACE = "http://www.w3.org/2001/XMLSchema#";

export const OWL_ANNOTATION_PROPERTY =
  "http://www.w3.org/2002/07/owl#AnnotationProperty";

export const OWL_META_TYPES: ReadonlySet<string> = new Set([
  "http://www.w3.org/2002/07/owl#Class",
  "http://www.w3.org/2002/07/owl#ObjectProperty",
  "http://www.w3.org/2002/07/owl#DatatypeProperty",
  "http://www.w3.org/2002/07/owl#AnnotationProperty",
  "http://www.w3.org/2002/07/owl#FunctionalProperty",
  "http://www.w3.org/2002/07/owl#TransitiveProperty",
  "http://www.w3.org/2002/07/owl#Ontology",
  "http://www.w3.org/2002/07/owl#NamedIndividual",
  "http://www.w3.org/2002/07/owl#Restriction",
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property",
]);
