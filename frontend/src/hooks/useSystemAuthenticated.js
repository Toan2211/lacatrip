import ROLE from '@constants/ROLE'
import { useSelector } from 'react-redux'

export function useSystemAuthenticated() {
    const role = useSelector(state => state?.auth?.profile?.role)
    if (role && (role.name === ROLE.ADMIN || role.name === ROLE.EMPLOYEE || role.name === ROLE.SERVICEMANAGER))
        return true
    return false
}