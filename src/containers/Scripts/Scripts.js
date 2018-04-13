import React from 'react'
import { ThirdParty } from '../../components/ThirdParty'

export const Scripts = () => {
  const SmartlookId = process.env.REACT_APP_SMARTLOOK_ID

  return (
    <span>
      {SmartlookId &&
        <ThirdParty name="smartlook" content={`
          window.smartlook||(function(d) {
          var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
          var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
          c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
          })(document);
          smartlook('init', '${SmartlookId}');
        `} />
      }
    </span>
  )
}

export default Scripts
