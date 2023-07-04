import { Modal, Table, Tooltip } from 'flowbite-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { currentTripSelector } from '@pages/TripList/trip.slice'
import { selectUser } from '@pages/Auth/auth.slice'
import { deleteMember } from '@pages/TripList/trip.slice'
function ListMember({ showModal, onClose }) {
    const currentTrip = useSelector(currentTripSelector)
    const profile = useSelector(selectUser)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const handleDeleteMember = async (tripId, userId) => {
        try {
            await dispatch(
                deleteMember({
                    tripId: tripId,
                    userId: userId
                })
            )
            toast.success(t('deleteUserSuccessful'), {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
            onClose()
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 1000,
                hideProgressBar: true
            })
        }
    }
    return (
        <Modal
            dismissible={true}
            show={showModal}
            onClose={onClose}
            size="xl"
            popup={true}
        >
            <Modal.Header className=" bg-slate-100 flex justify-center">
                <div className="text-center w-full ml-[35%]">
                    {t('tripMember').toUpperCase()}
                </div>
            </Modal.Header>
            <Modal.Body>
                <Table hoverable={true} className="text-center">
                    <Table.Head>
                        <Table.HeadCell>Avatar</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>
                            {t('fullname')}
                        </Table.HeadCell>
                        {profile.id === currentTrip.createdby && (
                            <Table.HeadCell></Table.HeadCell>
                        )}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {currentTrip.members.map(member => (
                            <Table.Row key={member.id}>
                                <Table.Cell>
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={member.avatar}
                                    />
                                </Table.Cell>
                                <Table.Cell className="">
                                    {member.email}
                                </Table.Cell>
                                <Table.Cell className="">
                                    {member.firstname +
                                        ' ' +
                                        member.lastname}
                                </Table.Cell>
                                {profile.id ===
                                    currentTrip.createdby && (
                                    <Table.Cell>
                                        {member.id !==
                                            currentTrip.createdby && (
                                            <Tooltip
                                                style="light"
                                                content={t(
                                                    'deleteMember'
                                                )}
                                                className="w-[130px]"
                                            >
                                                <div
                                                    onClick={() =>
                                                        handleDeleteMember(
                                                            currentTrip.id,
                                                            member.id
                                                        )
                                                    }
                                                    className="overflow-hidden font-bold rounded-full border border-black w-4 h-4 text-sm flex justify-center items-center hover:bg-red-600 hover:text-white hover:border-red-600 cursor-pointer"
                                                >
                                                    <span>X</span>
                                                </div>
                                            </Tooltip>
                                        )}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Modal.Body>
        </Modal>
    )
}

export default ListMember
