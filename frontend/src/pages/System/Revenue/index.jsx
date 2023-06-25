import React, {
    forwardRef,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getServiceManagers,
    serviceManagersSelector
} from '../ServiceManagers/servicemanager.slice'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectUser } from '@pages/Auth/auth.slice'
import Select from 'react-select'
import queryString from 'query-string'
import { getDateString } from '@utils/getDateString'
import ReactDatePicker from 'react-datepicker'
import { getAllRevenue, revenuesSelector } from './revenue.slice'
import moment from 'moment'
import { Table } from 'flowbite-react'
function Revenue() {
    const serviceManagers = useSelector(serviceManagersSelector)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const profile = useSelector(selectUser)
    const [month, setMonth] = useState(null)
    const [serviceManagerInput, setServiceManagerInput] = useState({
        value: 999,
        label: 'Filter service manager...'
    })
    const revenues = useSelector(revenuesSelector)
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        if (profile.serviceManagerId)
            params.serviceManagerId = profile.serviceManagerId
        return {
            monthDate: params.monthDate || '',
            page: Number.parseInt(params.page) || 1,
            limit: Number.parseInt(params.limit) || 10,
            serviceManagerId: profile.serviceManagerId
                ? profile.serviceManagerId
                : params.serviceManagerId || ''
        }
    }, [location.search, profile])
    const ExampleCustomstartDate = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex-1 flex gap-3 items-center cursor-pointer justify-center  border border-slate-300 hover:border-blue-500 rounded-md overflow-hidden bg-white"
                onClick={onClick}
            >
                <div className="flex flex-col items-center">
                    <span className="font-medium text-md">Month</span>
                    <span className="text-gray-400 text-sm" ref={ref}>
                        {value || 'Add Date'}
                    </span>
                </div>
            </div>
        )
    )
    const handleChangeStartDate = date => {
        setMonth(date)
        const filters = {
            ...queryParams,
            monthDate: getDateString(date)
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    const handleChaneServiceManager = value => {
        setServiceManagerInput(value)
        const filters = {
            ...queryParams,
            serviceManagerId: value.value !== 999 ? value.value : ''
        }
        navigate(`?${queryString.stringify(filters)}`)
    }

    useEffect(() => {
        const params = {
            serviceManagerId: queryParams.serviceManagerId,
            startDate: queryParams.monthDate,
            endDate: queryParams.monthDate
                ? moment(queryParams.monthDate)
                    .add(1, 'months')
                    .format('YYYY-MM')
                : ''
        }
        dispatch(getAllRevenue(params))
        dispatch(
            getServiceManagers({
                limit: 100
            })
        )
    }, [queryParams, dispatch])

    useEffect(() => {
        document.title = 'Manage Revenue'
    }, [])
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white min-h-[70vh]">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                        <h3 className="font-semibold text-lg text-blue-600">
                            Manage Revenue
                        </h3>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 px-3 py-5 border border-slate-300 rounded bg-slate-50 mb-5">
                <div className="w-full lg:basis-1/4 flex justify-between items-center gap-2">
                    <ReactDatePicker
                        closeOnScroll={true}
                        selected={month}
                        onChange={handleChangeStartDate}
                        selectsStart
                        showMonthYearPicker
                        dateFormat="MMMM yyyy"
                        customInput={<ExampleCustomstartDate />}
                    />
                </div>
                {!profile.serviceManagerId && (
                    <div className="w-full lg:basis-1/4">
                        <Select
                            styles={{
                                control: baseStyles => ({
                                    ...baseStyles,
                                    height: '44px'
                                })
                            }}
                            onChange={handleChaneServiceManager}
                            value={serviceManagerInput}
                            placeholder={
                                'Filter by service manager...'
                            }
                            options={[
                                {
                                    value: 999,
                                    label: 'Filter by service manager...'
                                },
                                ...serviceManagers.map(
                                    servicemanager => ({
                                        value: servicemanager.id,
                                        label:
                                            servicemanager.user
                                                .firstname +
                                            servicemanager.user
                                                .lastname
                                    })
                                )
                            ]}
                        />
                    </div>
                )}
            </div>
            <div className="block w-full overflow-x-auto h-[66vh]">
                <Table hoverable={true}>
                    <Table.Head>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>PhoneNumber</Table.HeadCell>
                        <Table.HeadCell>
                            Total Revenue ($)
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Total Commission ($)
                        </Table.HeadCell>
                        <Table.HeadCell>
                            System Unpaid ($)
                        </Table.HeadCell>
                        {(queryParams.monthDate ||
                            queryParams.serviceManagerId) && (
                            <Table.HeadCell>Month</Table.HeadCell>
                        )}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {revenues &&
                            revenues.map(revenue => (
                                <Table.Row key={revenue.id}>
                                    <Table.Cell className="">
                                        {revenue.email}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {revenue.firstname}{' '}
                                        {revenue.lastname}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {revenue.phone}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {revenue.totalAmount}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            revenue.totalCommissionAmount
                                        }
                                    </Table.Cell>
                                    <Table.Cell className="font-bold text-blue-400">
                                        {
                                            revenue.totalCommissionAmountNotYet
                                        }
                                    </Table.Cell>
                                    {(queryParams.monthDate ||
                                        queryParams.serviceManagerId) && (
                                        <Table.Cell className="font-bold">
                                            {revenue.month}
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default Revenue
