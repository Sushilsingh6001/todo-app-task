import React, { useState } from "react";

const FilterData = ({ filter, setFilter, filterPri, setFilterPri }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPri, setIsOpenPri] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIsOpenPri(false)
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
        setIsOpen(false); // Close dropdown after selection
        setIsOpenPri(false)
    };
    const toggleDropdownPri = () => {
        setIsOpen(false);
        setIsOpenPri(!isOpenPri)
    };
    const handleFilterChangePriority = (val) => {
        setFilterPri(val);
        setIsOpen(false);
        setIsOpenPri(false)
    }
    return (
        <div className="relative inline-block text-left ">
            <div className="flex" >
                <div>
                    <button
                        onClick={toggleDropdown}
                        className="inline-flex justify-center w-full px-4 py-2 bg-blue-500 text-sm font-medium  rounded-md hover:bg-gray-400 focus:outline-none text-white capitalize"
                    >
                        {filter}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div
                        className="origin-top-right absolute optionList1  mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="py-1" >
                            <button
                                onClick={() => handleFilterChange("all")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilterChange("active")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Active
                            </button>
                            <button
                                onClick={() => handleFilterChange("completed")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                )}

                <div>
                    <button
                        onClick={toggleDropdownPri}
                        className="inline-flex ml-2 justify-center w-full px-4 py-2 bg-blue-500 text-sm font-medium  rounded-md hover:bg-gray-400 focus:outline-none text-white capitalize"
                    >
                        {filterPri}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {isOpenPri && (
                    <div
                        className="origin-top-right absolute optionList  mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="py-1" >
                            <button
                                onClick={() => handleFilterChangePriority("all")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilterChangePriority("high")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                High
                            </button>
                            <button
                                onClick={() => handleFilterChangePriority("medium")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Medium
                            </button>
                            <button
                                onClick={() => handleFilterChangePriority("low")}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                Low
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default FilterData;



