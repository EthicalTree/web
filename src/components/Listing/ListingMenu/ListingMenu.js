import React from 'react'
import { ImageManager } from '../../ImageManager'

import {
  addImageToMenu,
  deleteImageFromMenu,
  updateListingImage
} from '../../../actions/listing'

import { setConfirm } from '../../../actions/confirm'

const ListingMenu = props => {
  const {
    canEdit,
    currentImage,
    dispatch,
    listingSlug,
    menu
  } = props

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
        addText="Click to add a photo"
        emptyText="No menu has been added to this listing...yet!"
        canEdit={canEdit}
        signingParams={{ slug: listingSlug, menuId: menu.id, type: 'menu' }}
        shiftPreviousAction={{
          handleAction: () => dispatch(updateListingImage({
            data: {
              shift: 'previous',
              type: 'menu'
            },
            imageId: currentImage.id,
            listingSlug,
            type: 'menu'
          })),
          title: 'Switch places with the previous photo',
        }}
        shiftNextAction={{
          handleAction: () => dispatch(updateListingImage({
            data: {
              shift: 'next',
              type: 'menu'
            },
            imageId: currentImage.id,
            listingSlug
          })),
          title: 'Switch places with the next photo',
        }}
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
          title: 'Enlarge current photo',
        }}
        deleteAction={{
          handleAction: () =>
            dispatch(
              setConfirm({
                title: 'Delete Current Photo',
                msg:
                  'Are you sure you want to delete this photo?',
                action: deleteImageFromMenu,
                data: {
                  listingSlug: listingSlug,
                  menuId: menu.id,
                  imageId: currentImage.id,
                },
              })
            ),
          title: 'Delete current photo',
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
          title: 'Add a new photo',
        }}
      />
    </div>
  )
}

ListingMenu.propTypes = {}

ListingMenu.defaultProps = {}

export default ListingMenu
