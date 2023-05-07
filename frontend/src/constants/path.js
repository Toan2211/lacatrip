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
        this.serviceManagers = '/system/serviceManagers'
        this.profile = '/profile'
        this.changePassword = '/changePassword'
        this.hotels = '/system/hotels'
        this.formHotel = '/system/hotels/form'
        this.formUpdateHotel = '/system/hotels/form/:id'
    }
}

export const path = new Path()