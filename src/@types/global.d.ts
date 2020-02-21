import { ClassPermission } from 'parse-server/lib/Config';

type SchemaFieldDefaultValue =
  | string
  | number
  | boolean
  | object
  | Date
  | SchemaFieldDefaultValue[];

interface SchemaField {
  type: string;
  required: boolean;
  targetClass?: string;
  defaultValue?: SchemaFieldDefaultValue;
}

declare global {
  interface ClassInfo<S> {
    name: string;
    schema?: S;
    permissions?: ClassPermission;
  }

  interface ParseConfig {
    appId: string;
    masterKey: string;
    serverURL: string;
  }

  interface Absence {
    start: SchemaField;
    end: SchemaField;
    proof: SchemaField;
    driver: SchemaField;
    type: SchemaField;
  }

  interface AbsenceType {
    name: SchemaField;
  }

  interface Destination {
    city: SchemaField;
    state: SchemaField;
    stateAcronym: SchemaField;
  }

  interface DestinationCity {
    name: SchemaField;
    state: SchemaField;
  }

  interface DestinationState {
    name: SchemaField;
    acronym: SchemaField;
  }

  interface Route {
    date: SchemaField;
    isReturnTrip: SchemaField;
    proof: SchemaField;
    reason: SchemaField;
    destination: SchemaField;
    returnTrip: SchemaField;
    Route: SchemaField;
    sector: SchemaField;
    sponsor: SchemaField;
    driver: SchemaField;
  }

  interface Sector {
    acronym: SchemaField;
    name: SchemaField;
    titularDriver: SchemaField;
    alternateDriver: SchemaField;
  }

  interface Sponsor {
    name: SchemaField;
    siape: SchemaField;
  }

  interface Vehicle {
    licensePlate: SchemaField;
    titularDriver: SchemaField;
    alternateDriver: SchemaField;
    model: SchemaField;
    brand: SchemaField;
  }

  interface VehicleBrand {
    name: SchemaField;
  }

  interface VehicleModel {
    name: SchemaField;
    brand: SchemaField;
  }
}
