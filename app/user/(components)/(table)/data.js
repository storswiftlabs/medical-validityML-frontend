import React from 'react';
const columns = [
	// { name: "ID", uid: "id",  },
	{ name: 'Presumptive Diagnosis Operator', uid: 'name' },
	{ name: 'ML Model', uid: 'Module' },
	// { name: "Description", uid: "description", },
	{ name: 'Verification', uid: 'validation' },
	{ name: 'Status', uid: 'status' },
	{ name: 'Time', uid: 'StartTime' },
	{ name: 'Predicted Results', uid: 'Output' },
	// { name: 'Reupload', uid: 'Reupload' },
	{ name: 'Actions', uid: 'actions' },
];

const statusOptions = [
	{ name: 'Active', uid: 'active' },
	{ name: 'Paused', uid: 'paused' },
	{ name: 'Vacation', uid: 'vacation' },
];

export { columns, statusOptions };
