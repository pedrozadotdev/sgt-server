import { Schema } from 'parse-server/lib/Config';
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

export async function createClass<T>(
  serverSchema: Schema,
  { name, schema, permissions }: ClassInfo<T>,
): Promise<void> {
  try {
    if (schema) {
      await serverSchema.addClassIfNotExists<T>(name, schema, permissions);
    } else if (permissions) {
      await serverSchema.setPermissions(name, permissions);
    }
  } catch (err) {
    if (err.code !== 103) {
      throw err;
    }
  }
}

export async function createRole(name: string): Promise<void> {
  const ParseRole = Parse.Object.extend('_Role');
  // Check if the role already exists.
  const existingRole = await new Parse.Query(ParseRole)
    .equalTo('name', name)
    .first({ useMasterKey: true });
  // If the role not exists we have to create it.
  if (!existingRole) {
    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    const role = new ParseRole();
    role.set('name', name);
    role.setACL(acl);
    await role.save({}, { useMasterKey: true });
  }
}

export const classes: ClassInfo<object | undefined>[] = [
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
  Sponsor,
];
