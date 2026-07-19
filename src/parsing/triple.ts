export const TermType = {
  NAMED_NODE: "NamedNode",
  LITERAL: "Literal",
  BLANK_NODE: "BlankNode",
} as const;
export type TermType = (typeof TermType)[keyof typeof TermType];

export interface Triple {
  readonly subject: string;
  readonly predicate: string;
  readonly object: string;
  readonly objectType: TermType;
}
