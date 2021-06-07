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

    return (
        <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
            <PaginationItem className={(page == 0) ? "disabled" : ""}>
                <PaginationLink aria-label="Next" onClick={() => changePage(page - 1)} >
                    <i className="fa fa-angle-left" />
                </PaginationLink>
            </PaginationItem>
            {
                Array.from(new Array(props.totalPages).keys()).map((number) => {
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
                <PaginationLink aria-label="Next" onClick={() => changePage(page + 1)} >
                    <i className="fa fa-angle-right" />
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    );
}

export default PaginationStrip;