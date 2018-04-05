import React from 'react'
import { ThirdParty } from '../../components/ThirdParty'

export const Scripts = () => {
  const SmartlookId = process.env.REACT_APP_SMARTLOOK_ID
  const FacebookId = process.env.REACT_APP_FACEBOOK_ID

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

      {FacebookId &&
        <ThirdParty name="facebook" content={`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FacebookId}');
            fbq('track', 'PageView');
        `} />
      }

    </span>
  )
}

export default Scripts
