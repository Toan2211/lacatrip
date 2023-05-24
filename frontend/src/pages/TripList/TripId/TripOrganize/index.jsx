import Drawer2 from '@components/Drawer2'
import React, { forwardRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { MdOutlineCalendarMonth } from 'react-icons/md'
import TripOrganizeCard from './TripOrganizeCard'
import { getDates } from '@utils/getDates'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '@utils/dragDrop'

function TripOrganize({ isOpen, onClose }) {
    const [startDate, setStartDate] = useState(new Date('2023-5-5'))
    const [endDate, setEndDate] = useState(new Date('2023-5-8'))
    const [datatest, setDatatest] = useState([
        {
            id: 'column-1',
            boardId: 'board-1',
            title: 'To do column',
            cardOrder: [
                'card-1',
                'card-2',
                'card-3',
                'card-4',
                'card-5',
                'card-6',
                'card-7'
            ],
            cards: [
                {
                    id: 'card-1',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 1',
                    cover: 'https://taimienphi.vn/tmp/cf/aut/anh-gai-xinh-1.jpg'
                },
                {
                    id: 'card-2',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 2',
                    cover: null
                },
                {
                    id: 'card-3',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 3',
                    cover: null
                },
                {
                    id: 'card-4',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 4',
                    cover: null
                },
                {
                    id: 'card-5',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 5',
                    cover: null
                },
                {
                    id: 'card-6',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 6',
                    cover: null
                },
                {
                    id: 'card-7',
                    boardId: 'board-1',
                    columnId: 'column-1',
                    title: 'title card 7',
                    cover: null
                }
            ]
        },
        {
            id: 'column-2',
            boardId: 'board-1',
            title: 'Inprogress column',
            cardOrder: ['card-8', 'card-9', 'card-10'],
            cards: [
                {
                    id: 'card-8',
                    boardId: 'board-1',
                    columnId: 'column-2',
                    title: 'title card 8',
                    cover: null
                },
                {
                    id: 'card-9',
                    boardId: 'board-1',
                    columnId: 'column-2',
                    title: 'title card 9',
                    cover: null
                },
                {
                    id: 'card-10',
                    boardId: 'board-1',
                    columnId: 'column-2',
                    title: 'title card 10',
                    cover: null
                }
            ]
        },
        {
            id: 'column-3',
            boardId: 'board-1',
            title: 'Done column',
            cardOrder: ['card-11', 'card-12', 'card-13'],
            cards: [
                {
                    id: 'card-11',
                    boardId: 'board-1',
                    columnId: 'column-2',
                    title: 'title card 11',
                    cover: null
                },
                {
                    id: 'card-12',
                    boardId: 'board-1',
                    columnId: 'column-2',
                    title: 'title card 12',
                    cover: null
                },
                {
                    id: 'card-13',
                    boardId: 'board-1',
                    columnId: 'column-2',
                    title: 'title card 13',
                    cover: null
                }
            ]
        }
    ])
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null)
        {
            let newColumns = [...datatest]
            let currentColumn = newColumns.find(col => col.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id)
            setDatatest(newColumns)
        }
    }
    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex items-center gap-2 border-[1px] border-slate-300 rounded-lg px-4 cursor-pointer w-[160px]"
                onClick={onClick}
            >
                <span>
                    <MdOutlineCalendarMonth />
                </span>
                <div className="flex flex-col">
                    <span className="font-semibold">Start date</span>
                    <span
                        className="cursor-pointer text-sm font-semibold"
                        ref={ref}
                    >
                        {value}
                    </span>
                </div>
            </div>
        )
    )
    const ExampleCustomInputEndDate = forwardRef(
        ({ value, onClick }, ref) => (
            <div
                className="flex items-center gap-2 border-[1px] border-slate-300 rounded-lg px-4 cursor-pointer w-[160px]"
                onClick={onClick}
            >
                <span>
                    <MdOutlineCalendarMonth />
                </span>
                <div className="flex flex-col">
                    <span className="font-semibold">End date</span>
                    <span
                        className="cursor-pointer text-sm font-semibold"
                        ref={ref}
                    >
                        {value}
                    </span>
                </div>
            </div>
        )
    )
    return (
        <Drawer2 isOpen={isOpen} onClose={onClose}>
            <div className="w-full h-[300vh] pb-[500px]">
                <div className=" mt-[80px] h-[60px] bg-slate-50 flex justify-between px-3 py-3">
                    <div className="font-semibold">
                        Organize Your Trip
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-blue-500 text-white active:bg-blue-800 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className=" bg-gray-300 text-white active:bg-gray-400 text-sm font-bold uppercase px-2 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                <div>
                    <div className="flex w-full items-center px-4 justify-between border-b-[1px] border-slate-200 py-4">
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            customInput={<ExampleCustomInput />}
                        />
                        <ReactDatePicker
                            closeOnScroll={true}
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            customInput={
                                <ExampleCustomInputEndDate />
                            }
                        />
                    </div>
                </div>
                <Container
                    getChildPayload={index => datatest[index]}
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview'
                    }}
                >
                    {datatest.map((item, index) => (
                        <Draggable key={index}>
                            <TripOrganizeCard
                                dataOfDate={item}
                                onCardDrop={onCardDrop}
                            />
                        </Draggable>
                    ))}
                </Container>
            </div>
        </Drawer2>
    )
}

export default TripOrganize
