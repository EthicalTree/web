import './NewCollectionModal.css'

import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../../Modal'

import {
  Form,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap'

import { ImageManager } from '../../../../components/ImageManager'


import {
  makeImageCollectionCover,
  deleteImageFromCollection,
  addImageToCollection
} from '../../../../actions/collection'

import { addCollection, editCollection } from '../../../../actions/admin'

class NewCollectionModal extends React.Component {

  submit(e) {
    e.preventDefault()
    const { dispatch, modal } = this.props
    const { collection } = modal.modalData

    if (collection.id) {
      dispatch(editCollection(collection))
    }
    else {
      dispatch(addCollection(collection))
    }
  }

  performImageAction = (action, image) => {
    const { collection } = this.props.modal.modalData
    const { currentImage } = this.state
    const { slug } = collection
    let promise

    this.setState({ isImageLoading: true })

    switch (action) {
      case 'add':
        promise = addImageToCollection({ slug, imageKey: image.key })
        break
      case 'delete':
        promise = deleteImageFromCollection({ slug, imageId: currentImage.id })
        break
      case 'cover':
        promise = makeImageCollectionCover({ slug, imageId: currentImage.id })
        break
      default:
        break
    }

    promise.then(({ data }) => {
      if (data.images) {
        const newCurrentImage = action === 'add' ? data.images.reverse()[0] : data.images[0]

        this.setState({
          currentImage: newCurrentImage,
          images: data.images,
        })
      }

      this.setState({
        isImageLoading: false
      })
    })
  }

  constructor(props) {
    super(props)
    const { coverImage, images } = props.modal.modalData.collection

    this.state = {
      images,
      isImageLoading: false,
      currentImage: coverImage
    }
  }

  handleChange(obj) {
    const { dispatch, modal } = this.props
    const { collection } = modal.modalData
    dispatch({ type: 'UPDATE_MODAL_DATA', data: { collection: { ...collection, ...obj }} })
  }

  render() {
    const { modal } = this.props
    const { isImageLoading, currentImage, images } = this.state
    const { collection } = modal.modalData
    const isUpdate = !!collection.id

    return (
      <Modal
        className="new-collection-modal medium-modal"
        loading={modal.isLoading}
        contentLabel={isUpdate ? 'Edit Collection' : 'Add New Collection'}
        onSave={this.submit.bind(this)}
        modalName="new-collection"
        saveLabel={isUpdate ? 'Save' : 'Create'}
      >
        <Form onSubmit={this.submit.bind(this)}>
          <Row>
            <Col size={6}>
              <Label for="name">Name</Label>
              <Input
                autoFocus
                value={collection.name}
                onChange={e => this.handleChange({ name: e.target.value }) }
                type="text"
                name="name"
                id="name"
                placeholder="Enter a name"
              />
            </Col>
            <Col size={6}>
              <Label for="description">Hashtag</Label>
              <Input
                onChange={e => { this.handleChange({ hashtag: e.target.value }) }}
                type="text"
                name="hashtag"
                value={collection.hashtag}
                id="hashtag"
                placeholder="Enter a tag"
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Label for="description">Description</Label>
              <Input
                onChange={e => { this.handleChange({ description: e.target.value }) }}
                type="textarea"
                value={collection.description}
                name="description"
                id="description"
              />
            </Col>
          </Row>

          <Row className="collection-images mt-3">
            {isUpdate &&
              <ImageManager
                onImageUploadProgress={() => {}}
                onSetCurrentImage={image => {
                  this.setState({ currentImage: image })
                }}
                images={images}
                currentImage={currentImage}
                isLoading={isImageLoading}
                addText="Click to add a photo to the collection"
                emptyText="No cover photo has been added to this collection...yet!"
                canEdit={true}
                signingParams={{ slug: collection.slug, type: 'collection' }}
                coverAction={{
                  handleAction: () => this.performImageAction('cover'),
                  title: 'Set Cover Photo'
                }}
                deleteAction={{
                  handleAction: () => this.performImageAction('delete'),
                  title: 'Delete Photo',
                }}
                addAction={{
                  handleAction: image => this.performImageAction('add', image),
                  title: 'Add Photo'
                }}
              />
            }
          </Row>
        </Form>
      </Modal>
    )
  }

}

const select = (state) => ({
  admin: state.admin,
  modal: state.modal
})

export default connect(select)(NewCollectionModal)
