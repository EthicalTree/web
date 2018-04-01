import './Paginator.css'

import React from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
import classnames from 'classnames'
import { Icon } from '../Icon'

export const Paginator = (props) => {
  const {
    className,
    currentPage,
    pageCount,
    onPageChange
  } = props

  const previous = <Icon iconKey="chevron_left" />
  const next = <Icon iconKey="chevron_right" />

    const classNames = classnames(
      'et-paginator',
      className
    )

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
      containerClassName={classNames}
      subContainerClassName="et-paginator-pages"
      activeClassName="et-paginator-active"
    />
  )
}

Paginator.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

Paginator.defaultProps = {
  className: ''
}

export default Paginator
