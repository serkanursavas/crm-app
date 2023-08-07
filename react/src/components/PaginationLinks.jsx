// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const PaginationLinks = ({ meta, onPageClick }) => {
    const onClick = (e, link) => {
        e.preventDefault();

        if (!link.url) return;

        onPageClick(link);
    };

    return (
        <div className="flex items-center justify-center px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">{meta?.from}</span> to{" "}
                        <span className="font-medium">{meta?.to}</span> of{" "}
                        <span className="font-medium">{meta?.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                        aria-label="Pagination"
                    >
                        {meta &&
                            meta.links.map((link, ind) => (
                                <a
                                    key={ind}
                                    onClick={(e) => onClick(e, link)}
                                    className={
                                        "relative z-10 inline-flex items-center select-none cursor-pointer border shadow-md px-4 py-2 text-sm font-medium  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-indigo-50 hover:scale-95 " +
                                        (ind === 0 ? "rounded-l-md  " : "") +
                                        (ind === meta.links.length - 1
                                            ? "rounded-r-md translate-x-[1px]  "
                                            : " ") +
                                        (link.active
                                            ? "border-indigo-500 bg-indigo-50  pointer-events-none cursor-default text-indigo-600 border hover:scale-100 "
                                            : " border-l-0 ") +
                                        (link.url === null
                                            ? "bg-gray-200 text-gray-500  cursor-default border-gray-300 hover:scale-100 hover:bg-gray-200"
                                            : " ")
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></a>
                            ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default PaginationLinks;
