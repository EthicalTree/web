import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Button, Input } from 'reactstrap'

import { download, upload } from '../../../actions/admin'

import { IMPORT_FIELDS, EXPORT_FIELDS } from '../../../utils/importExport'

export class ImportExport extends React.Component {
  changeExportField = (field, value) => {
    const { fields } = this.state
    const newExportFields = { ...fields }
    newExportFields[field] = value
    this.setState({ fields: newExportFields })
  }

  upload = () => {
    const { dispatch } = this.props
    let { fields, selectedDataType } = this.state

    fields = Object.keys(fields).filter(f => fields[f])
    dispatch(upload(selectedDataType, fields, this.file.files[0]))
  }

  setSelectedDataType = selectedDataType => {
    const { selectedFunction } = this.state

    const fields =
      selectedFunction === 'import'
        ? { ...IMPORT_FIELDS[selectedDataType] }
        : { ...EXPORT_FIELDS[selectedDataType] }

    Object.keys(fields).map(k => (fields[k] = true))

    this.setState({
      selectedDataType,
      fields,
    })
  }

  download = () => {
    const { dispatch } = this.props
    let { downloadFormat, fields, selectedDataType } = this.state

    fields = Object.keys(fields).filter(f => fields[f])
    dispatch(download(selectedDataType, fields, downloadFormat))
  }

  constructor(props) {
    super(props)

    this.state = {
      downloadFormat: 'csv',
      fields: {},
      selectedDataType: '',
      selectedFunction: '',
    }
  }

  render() {
    const { selectedDataType, selectedFunction } = this.state

    return (
      <div className="mb-5">
        <Helmet>
          <title>{'EthicalTree Admin · Export'}</title>
        </Helmet>

        {this.renderStep1()}

        {selectedFunction && this.renderStep2()}

        {selectedDataType && (
          <React.Fragment>
            {this.renderStep3()}
            {this.renderStep4()}
          </React.Fragment>
        )}
      </div>
    )
  }

  renderStep1() {
    const { selectedFunction } = this.state

    return (
      <div className="mt-4">
        <h5>Step 1:</h5>

        <div>
          <label>Select function</label>

          <Input
            onChange={e =>
              this.setState({
                selectedFunction: e.target.value,
                selectedDataType: '',
                fields: {},
              })
            }
            type="select"
            value={selectedFunction}
          >
            <option disabled value="">
              Choose function
            </option>

            <option value="import">Import</option>
            <option value="export">Export</option>
          </Input>
        </div>
      </div>
    )
  }

  renderStep2() {
    const { selectedDataType, selectedFunction } = this.state

    return (
      <div className="mt-4">
        <h5>Step 2:</h5>

        <div>
          <label>Choose the data source</label>

          <Input
            onChange={e => this.setSelectedDataType(e.target.value)}
            type="select"
            value={selectedDataType}
          >
            <option disabled value="">
              Choose data source
            </option>

            {selectedFunction === 'import' && (
              <React.Fragment>
                <option value="seoPaths">SEO Paths</option>
              </React.Fragment>
            )}

            {selectedFunction === 'export' && (
              <React.Fragment>
                <option value="listings">Listings</option>
              </React.Fragment>
            )}
          </Input>
        </div>
      </div>
    )
  }

  renderStep3() {
    const { fields, selectedFunction, selectedDataType } = this.state
    const FIELDS =
      selectedFunction === 'import'
        ? IMPORT_FIELDS[selectedDataType]
        : EXPORT_FIELDS[selectedDataType]

    return (
      <div className="mt-4">
        <h5>Step 3:</h5>

        <label>Select the fields you would like to include</label>

        <div>
          {FIELDS &&
            Object.keys(FIELDS).map(field => {
              const id = `export-field-${field}`

              return (
                <div className="ml-4" key={field}>
                  <Input
                    id={id}
                    checked={fields[field]}
                    name={id}
                    onChange={e =>
                      this.changeExportField(field, e.target.checked)
                    }
                    type="checkbox"
                  />
                  <label htmlFor={id}>{FIELDS[field]}</label>
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  renderStep4() {
    const { admin } = this.props
    const { downloadFormat, selectedFunction } = this.state
    let buttonText

    if (admin.isAdminLoading) {
      buttonText =
        selectedFunction === 'export' ? 'Downloading...' : 'Uploading...'
    } else {
      buttonText = selectedFunction === 'export' ? 'Download' : 'Upload'
    }

    return (
      <div className="mt-4">
        <h5>Step 4:</h5>

        {selectedFunction === 'import' && (
          <div>
            <label>Select file</label>
            <Input innerRef={file => (this.file = file)} type="file" />
          </div>
        )}

        {selectedFunction === 'export' && (
          <div>
            <label>Select download type</label>

            <div>
              <div className="ml-4">
                <Input
                  checked={downloadFormat === 'csv'}
                  onChange={e =>
                    this.setState({ downloadFormat: e.target.value })
                  }
                  type="radio"
                  value="csv"
                />
                <label>CSV</label>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <Button
            disabled={admin.isAdminLoading}
            onClick={
              selectedFunction === 'export' ? this.download : this.upload
            }
          >
            {buttonText}
          </Button>

          {selectedFunction === 'export' && (
            <p className="mt-3">
              <i>
                NOTE: Try to limit the use of this download as it's hard on the
                servers right now :)
              </i>
            </p>
          )}
        </div>
      </div>
    )
  }
}

const select = state => ({ admin: state.admin })

export default connect(select)(ImportExport)
