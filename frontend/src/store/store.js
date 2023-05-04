import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@pages/Auth/auth.slice'
import employeesReducer from '@pages/System/Employees/employee.slice.js'
import clientsReducer from '@pages/System/Clients/client.slice.js'
import serviceManagersReducer from '@pages/System/ServiceManagers/servicemanager.slice.js'
import baseProperty from './baseproperty'
const rootReducer = {
    propertys: baseProperty,
    auth: authReducer,
    // system manage
    employees: employeesReducer,
    clients: clientsReducer,
    serviceManagers: serviceManagersReducer
}
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
export default store
