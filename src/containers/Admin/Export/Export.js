import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Button, Input } from 'reactstrap'

import { download } from '../../../actions/admin'

const EXPORT_FIELDS = {
  listings: {
    id: 'ID',
    slug: 'Slug',
    title: 'Title',
    plan_info: 'Plan Information',
    claim_id: 'Claim ID',
    claim_url: 'Claim URL',
    visibility: 'Visibilty',
  }
}

export class Export extends React.Component {

  changeExportField = (field, value) => {
    const { exportFields } = this.state
    const newExportFields = {...exportFields}
    newExportFields[field] = value
    this.setState({ exportFields: newExportFields })
  }

  setSelectedExport = selectedExport => {
    const exportFields = {...EXPORT_FIELDS[selectedExport]}
    Object.keys(exportFields).map(k => exportFields[k] = true)

    this.setState({
      selectedExport,
      exportFields
    })
  }

  download = () => {
    const { dispatch } = this.props
    const { downloadFormat, exportFields, selectedExport } = this.state
    const fields = Object.keys(exportFields).filter(f => exportFields[f])

    dispatch(download(selectedExport, fields, downloadFormat))
  }

  constructor(props) {
    super(props)

    this.state = {
      downloadFormat: 'csv',
      exportFields: {},
      selectedExport: ''
    }
  }

  render() {
    const { selectedExport } = this.state

    return (
      <div className="mb-5">
        <Helmet>
          <title>{'EthicalTree Admin · Export'}</title>
        </Helmet>

        {this.renderStep1()}

        {selectedExport &&
          <React.Fragment>
            {this.renderStep2()}
            {this.renderStep3()}
          </React.Fragment>
        }
      </div>
    )
  }

  renderStep1() {
    const { selectedExport } = this.state

    return (
      <div className="mt-4">
        <h5>
          Step 1:
        </h5>

        <div>
          <label>
            Choose the object you would like to export
          </label>

          <Input
            onChange={e => this.setSelectedExport(e.target.value)}
            type="select"
            defaultValue={selectedExport}
          >
            <option
              disabled
              hidden
              value=""
            >
              Choose object
            </option>
            <option value="listings">
              Listings
            </option>
          </Input>
        </div>
      </div>
    )
  }

  renderStep2() {
    const { exportFields, selectedExport } = this.state
    const FIELDS = EXPORT_FIELDS[selectedExport]

    return (
      <div className="mt-4">
        <h5>Step 2:</h5>

        <label>
          Select the fields you would like to include in the export
        </label>

        <div>
          {FIELDS && Object.keys(FIELDS).map(field => {
            const id = `export-field-${field}`

            return (
              <div
                className="ml-4"
                key={field}
              >
                <Input
                  id={id}
                  checked={exportFields[field]}
                  name={id}
                  onChange={e => this.changeExportField(field, e.target.checked)}
                  type="checkbox"
                />
                <label htmlFor={id}>
                  {FIELDS[field]}
                </label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderStep3() {
    const { admin } = this.props
    const { downloadFormat } = this.state

    return (
      <div className="mt-4">
        <h5>Step 3:</h5>

        <label>
          Select download type
        </label>

        <div>
          <div className="ml-4">
            <Input
              checked={downloadFormat === 'csv'}
              onChange={e => this.setState({ downloadFormat: e.target.value })}
              type="radio"
              value="csv"
            />
            <label>CSV</label>
          </div>
        </div>

        <div className="mt-3">
          <Button
            disabled={admin.isAdminLoading}
            onClick={this.download}
          >
            {admin.isAdminLoading ? 'Downloading...' : 'Download'}
          </Button>
        </div>
      </div>
    )
  }
}

const select = state => ({ admin: state.admin })

export default connect(select)(Export)
