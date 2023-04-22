class Path {
    constructor() {
        this.landingPage = '/'
        this.signin = '/signin'
        this.signup = '/signup'
        this.forgotPass = '/forgotPassWord'
        this.system = '/system'
        this.profileSystem = '/system/profile'
        this.employees = '/system/employees'
        this.clients = '/system/clients'
        this.serviceManagers = 'system/serviceManagers'
    }
}

export const path = new Path()