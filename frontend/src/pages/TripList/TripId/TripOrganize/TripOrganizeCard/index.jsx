import React, { useState } from 'react'
import TripListItem from '../TripListItem'
var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
// date.toLocaleDateString('en-US', options)
function TripOrganizeCard({ dataOfDate }) {
    const [sheet, setSheet] = useState(0)
    const [listItemOpen, setListItemOpen] = useState(false)
    const onCloseListItem = () => setListItemOpen(false)
    const handleAddItem = () => {
        setListItemOpen(true)
        setSheet(sheet + 1)
    }
    return (
        <>
            <div className="my-2 w-[97%]">
                <div className="bg-slate-50 min-h-16 border-slate-300 border-[1px] p-2 cursor-pointer shadow-sm">
                    <div className="flex justify-between">
                        <header className="font-semibold mb-3">
                            {dataOfDate.date
                                ? dataOfDate.date
                                : 'Unschedule'}
                        </header>
                        <span
                            className="font-semibold text-sm hover:text-blue-500"
                            onClick={handleAddItem}
                        >
                            Add item
                        </span>
                    </div>

                    {/* {dataOfDate.cards.map((item, index) => (
                        <div key = {index} className="border-slate-300 border-[1px] p-4 rounded-md flex justify-between items-center my-1 shadow-sm bg-slate-100">
                            <span className="font-semibold text-sm">
                                {item.title}
                            </span>
                            <span>...</span>
                        </div>
                    ))} */}
                </div>
            </div>
            <TripListItem
                isOpen={listItemOpen}
                onClose={onCloseListItem}
                sheet={sheet}
            />
        </>
    )
}

export default TripOrganizeCard
