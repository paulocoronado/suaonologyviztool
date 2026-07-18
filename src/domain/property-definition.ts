import type { IPropertyDefinition } from "./interfaces/property-definition.interface";

export abstract class PropertyDefinition implements IPropertyDefinition {
  readonly id: string;
  readonly label: string;
  readonly domain: string;
  readonly range: string;

  constructor(id: string, label: string, domain: string, range: string) {
    this.id = id;
    this.label = label;
    this.domain = domain;
    this.range = range;
  }
}
