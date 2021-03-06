import { Api } from './api/api';
import { TripsProvider } from './trips/trips';
import { AuthServiceProvider } from './auth-service/auth-service';
// import { TripsProvider } from '../mocks/providers/trips';
import { Settings } from './settings/settings';
import { UsersProvider } from './users/users';

import { PlanFormGeneratorProvider } from './plan-form-generator/plan-form-generator';
import { AirportsProvider } from './airports/airports';
import { FirestoreProvider } from './firestore/firestore';
import { PhotoProvider } from './photo/photo';
import { StorageProvider } from './storage/storage';

export {
    Api,
    TripsProvider,
    Settings,
    UsersProvider,
    PlanFormGeneratorProvider,
    AirportsProvider,
    FirestoreProvider,
    AuthServiceProvider,
    PhotoProvider,
    StorageProvider
};
