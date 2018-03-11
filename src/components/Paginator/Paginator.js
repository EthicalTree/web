import './Paginator.css'

import React from 'react'
import ReactPaginate from 'react-paginate';
import { Icon } from '../Icon'

export const Paginator = (props) => {
  const {
    pageCount,
    currentPage,
    onPageChange
  } = props

  const previous = <Icon iconKey="chevron_left" />
  const next = <Icon iconKey="chevron_right" />

  return (
    <ReactPaginate
      previousLabel={previous}
      nextLabel={next}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={data => onPageChange({ selected: data.selected + 1 })}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      breakClassName="et-paginator-break"
      containerClassName="et-paginator"
      subContainerClassName="et-paginator-pages"
      activeClassName="et-paginator-active"
    />
  )
}

export default Paginator
