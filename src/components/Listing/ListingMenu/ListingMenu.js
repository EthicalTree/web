import React from 'react'
import { ImageManager } from '../../ImageManager'

import { addImageToMenu, deleteImageFromMenu } from '../../../actions/listing'

import { setConfirm } from '../../../actions/confirm'

const ListingMenu = props => {
  const { canEdit, currentImage, dispatch, listingSlug, menu } = props

  return (
    <div className="listing-menu mt-4">
      <ImageManager
        onImageUploadProgress={progress =>
          dispatch({ type: 'SET_MENU_IMAGE_UPLOAD_PROGRESS', data: progress })
        }
        onSetCurrentImage={image =>
          dispatch({ type: 'SET_LISTING_MENU_CURRENT_IMAGE', data: image })
        }
        images={menu.images}
        currentImage={currentImage}
        isLoading={menu.isImageLoading}
        uploadProgress={menu.uploadProgress}
        addText="Click to add a photo of the menu"
        emptyText="No menu has been added to this listing...yet!"
        canEdit={canEdit}
        signingParams={{ slug: listingSlug, menuId: menu.id, type: 'menu' }}
        fullScreenAction={{
          handleAction: () => {
            dispatch({
              type: 'SET_FULLSCREEN_MODAL_IMAGES',
              data: [...menu.images],
            })
            dispatch({
              type: 'SET_FULLSCREEN_MODAL_CURRENT_IMAGE',
              data: currentImage,
            })
            dispatch({ type: 'OPEN_MODAL', data: 'fullscreen-image' })
          },
          title: 'Enlarge Photo',
        }}
        deleteAction={{
          handleAction: () =>
            dispatch(
              setConfirm({
                title: 'Delete Menu Photo',
                msg:
                  'Are you sure you want to delete this photo from the menu?',
                action: deleteImageFromMenu,
                data: {
                  listingSlug: listingSlug,
                  menuId: menu.id,
                  imageId: currentImage.id,
                },
              })
            ),
          title: 'Delete Menu Photo',
        }}
        addAction={{
          handleAction: image =>
            dispatch(
              addImageToMenu({
                listingSlug: listingSlug,
                menuId: menu.id,
                imageKey: image.key,
              })
            ),
          title: 'Add Menu Photo',
        }}
      />
    </div>
  )
}

ListingMenu.propTypes = {}

ListingMenu.defaultProps = {}

export default ListingMenu
