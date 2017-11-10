import React from 'react'
import ImageManager from '../Global/ImageManager'

import {
  addImageToMenu,
  deleteImageFromMenu
} from '../../actions/listing'

const ListingMenu = props => {
  const {
    dispatch,
    canEdit,
    listingSlug,
    currentImage,
    menu
  } = props

  return (
    <div className="listing-menu mt-4">
      <ImageManager
        dispatch={dispatch}
        onImageUploadProgress={progress => dispatch({ type: 'SET_MENU_IMAGE_UPLOAD_PROGRESS', data: progress })}
        onSetCurrentImage={image => dispatch({ type: 'SET_LISTING_MENU_CURRENT_IMAGE', data: image})}
        images={menu.images}
        currentImage={currentImage}
        isLoading={menu.isImageLoading}
        uploadProgress={menu.uploadProgress}
        canEdit={canEdit}
        signingParams={{ slug: listingSlug }}
        styleOverrides={url => {
          return {
            background: `url('${url}')`,
            height: '500px'
          }
        }}
        deleteAction={{
          handleAction: deleteImageFromMenu,
          title: 'Delete Menu Photo',
          confirmMsg: 'Are you sure you want to delete this photo from the menu?',
          data: {
            listingSlug: listingSlug,
            menuId: menu.id
          }
        }}
        addAction={{
          handleAction: image => dispatch(addImageToMenu({
            listingSlug: listingSlug,
            menuId: menu.id,
            imageKey: image.key
          })),
          title: 'Add Menu Photo'
        }}
      />
    </div>
  )
}

ListingMenu.propTypes = {

}

ListingMenu.defaultProps = {

}

export default ListingMenu
