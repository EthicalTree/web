import './Paginator.css'

import React from 'react'
import ReactPaginate from 'react-paginate';

export const Paginator = (props) => {
  const {
    pageCount,
    currentPage,
    onPageChange
  } = props

  const previous = <i className="fa fa-chevron-left"></i>
  const next = <i className="fa fa-chevron-right"></i>

  return (
    <ReactPaginate
      previousLabel={previous}
      nextLabel={next}
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={onPageChange}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      breakClassName="et-paginator-break"
      containerClassName="et-paginator"
      subContainerClassName="et-paginator-pages"
      activeClassName="et-paginator-active"
    />
  )
}
