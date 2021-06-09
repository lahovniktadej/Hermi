import React from 'react';

import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';


function PaginationStrip(props) {
    const [page, setPage] = React.useState(0);

    const changePage = (page) => {
        props.onChange(page)
        setPage(page);
    }

    const getPageRange = (page) => {
        if (props.totalPages < 5) {
            return Array.from(new Array(props.totalPages).keys())
        } else if (props.totalPages > 5 && page < 5) {
            return Array.from(new Array(5).keys())
        } else if (props.totalPages > 5 && props.totalPages - page <= 2) {
            return Array.from(new Array(5), (x, i) => i + props.totalPages - 5);
        } else {
            return Array.from(new Array(5), (x, i) => i - 2 + page)
        }
    }

    return (
        <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
            <PaginationItem className={(page == 0) ? "disabled" : ""}>
                <PaginationLink onClick={() => changePage(0)} >
                    <i class="fas fa-step-backward"></i>
                </PaginationLink>
            </PaginationItem>
            <PaginationItem className={(page == 0) ? "disabled" : ""}>
                <PaginationLink onClick={() => changePage(page - 1)} >
                    <i className="fa fa-angle-left" />
                </PaginationLink>
            </PaginationItem>
            {
                getPageRange(page).map((number) => {
                    return (
                        <PaginationItem className={(page == number) ? "active" : ""}>
                            <PaginationLink onClick={() => changePage(number)}>
                                {number + 1}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })
            }
            <PaginationItem className={(page + 1 == props.totalPages) ? "disabled" : ""}>
                <PaginationLink onClick={() => changePage(page + 1)} >
                    <i className="fa fa-angle-right" />
                </PaginationLink>
            </PaginationItem>
            <PaginationItem className={(page + 1 == props.totalPages) ? "disabled" : ""}>
                <PaginationLink onClick={() => changePage(props.totalPages - 1)} >
                    <i class="fas fa-step-forward"></i>
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationStrip;