import { ClassPermission, Schema } from 'parse-server/lib/Config';
import Parse from 'parse/node';

import Absence from './Absence';
import AbsenceType from './AbsenceType';
import Destination from './Destination';
import DestinationCity from './DestinationCity';
import DestinationState from './DestinationState';
import Role from './Role';
import Route from './Route';
import Sector from './Sector';
import Sponsor from './Sponsor';
import User from './User';
import Vehicle from './Vehicle';
import VehicleBrand from './VehicleBrand';
import VehicleModel from './VehicleModel';

export interface ClassInfo<S> {
  name: string;
  schema?: S;
  permissions?: ClassPermission;
}

export interface SchemaField {
  type: string;
  required: boolean;
  targetClass?: string;
  defaultValue?: any;
}

export async function createClass<T>(serverSchema: Schema, { name, schema, permissions }: ClassInfo<T>) {

  try {
    if (schema) { await serverSchema.addClassIfNotExists<T>(name, schema); }
    if (permissions) { await serverSchema.setPermissions(name, permissions); }
  } catch (err) {
    if (err.code === 103) {
      console.log(`Class ${name} already exists.`)
    } else {
      throw err
    }
  }
}

export async function createRole(name: string) {
  const Role = Parse.Object.extend('_Role');
  // Check if the role already exists.
  const existingAdminRole = await new Parse.Query(Role)
    .equalTo('name', name)
    .first();
  // If the role already exists we have nothing to do here.
  if (existingAdminRole) {
    console.log(`Role "${name}" already exists.`);
  // If the role does not exist create it and set the ACLs.
  } else {
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    const role = new Role();
    role.set('name', name)
    role.setACL(acl)
    await role.save({}, { useMasterKey: true })
  }
}

export const classes: ClassInfo<object>[] = [
  User,
  Role,
  VehicleBrand,
  VehicleModel,
  Vehicle,
  Sector,
  Absence,
  AbsenceType,
  Destination,
  DestinationState,
  DestinationCity,
  Route,
  Sponsor
];
