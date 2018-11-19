import React from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'

import { Icon } from '../../Icon'
import { trackEvent } from '../../../utils/ga'

export const Bio = props => {
  const { bio, canEdit, phone, title, website } = props

  let formattedPhone
  try {
    formattedPhone = phone ? parsePhoneNumber(phone, 'CA').formatNational() : ''
  } catch (e) {
    formattedPhone = phone
  }

  return (
    <div className="bio mb-5">
      <div className="listing-title">
        <h3>
          {title}

          {canEdit &&
            bio && (
              <a
                className="btn btn-sm btn-default ml-3"
                href=""
                onClick={props.onClickDescriptionEdit}
              >
                Edit
              </a>
            )}
        </h3>

        <div className="listing-contact">
          {phone && (
            <React.Fragment>
              <div className="d-none d-md-flex">
                {formattedPhone}
                <Icon iconKey="phone" />
              </div>
              <div className="d-md-none">
                <a
                  href={`tel:${phone}`}
                  className="external-link"
                  onClick={() => {
                    trackEvent({
                      action: 'Clicked Listing Phone Number',
                      category: 'Listing',
                    })
                  }}
                >
                  {formattedPhone}
                  <Icon iconKey="phone" />
                </a>
              </div>
            </React.Fragment>
          )}

          {website && (
            <a
              href={website}
              rel="noopener noreferrer"
              target="_blank"
              className="external-link"
              onClick={() => {
                trackEvent({
                  action: 'Clicked Listing Website',
                  category: 'Listing',
                })
              }}
            >
              Website
              <Icon iconKey="extract" />
            </a>
          )}
        </div>
      </div>

      {bio && <p>{bio}</p>}

      {!bio && (
        <div className="no-content">
          {canEdit && (
            <a
              href=""
              onClick={props.onClickDescriptionEdit}
              className="btn btn-default"
            >
              Add a description
            </a>
          )}
          {!canEdit && <p>This listing has no description!</p>}
        </div>
      )}
    </div>
  )
}

export default Bio
