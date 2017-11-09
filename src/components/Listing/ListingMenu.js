import React from 'react'
import ETSlider from '../Global/Slider'

const ListingMenu = props => {
  const { dispatch, menu } = props


  if (menu && menu.images && menu.images.length > 0) {
    const images = menu.images

    return (
      <div className="mt-4">
        <ETSlider
          afterChange={() => {}}
          slides={
            images.map(image => {
              const url = `${process.env.REACT_APP_S3_URL}/${image.key}`

              let style = {
                background: `url('${url}')`,
                backgroundSize: 'cover',
                height: '500px'
              }

              return (
                <div
                  className="menu-image"
                  key={image.key}>
                  <div style={style} />
                </div>
              )
            })
          }
        />
      </div>
    )
  }

  return (
    <div></div>
  )
}

export default ListingMenu
