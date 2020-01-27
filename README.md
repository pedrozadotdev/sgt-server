Parse Server with Parse Dashboard for SGT/DTI-UFCG.

--------

**Functional resources**

- CRUD for Users/Vehicles/Sectors/Absences/Routes;
- Just CR for Responsible/Destinations/Vehicle Models/Vehicle Brands;
- Notify drivers when routes change.

**Non-functional resources**

- Use ParseServer to provide most CRUD/Auth/File Upload/Notification functionalities;
- Use MongoDB as Database to store user data on premise;
- Use Express to host API and Dashboard at same server;
- Use Typescript for better type check on Cloud Code;
- Use Jest to test Cloud Code;
- Use Nodemon for better DX.

**Business rules**

- Create Cloud Code to prevent unauthorised users make change on models;
- Designate route to specific driver based on specific rules.

  ***Depends on:***

  - Sectors;

  - Vehicles;

  - Absences;

  - Evidence.

**Environment Variables**

- *APP_ID*: App's Name/ID (Default: 'SGT');
- *MASTER_KEY*: Masterkey to bypass authentication/authorization (Default: 'defaultMasterKey');
- *DATABASE_URI*: MongoDB URI (Default: 'mongodb://db:27017/\[APP_ID\]');
- *DASHBOARD_USERNAME*: Username to access Parse Dashboard (Default: 'admin');
- *DASHBOARD_PASSWORD*: Password to access Parse Dashboard (Default: 'pass');
