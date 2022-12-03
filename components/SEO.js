import Head from 'next/head'
import { Fragment } from 'react'

const SEO = ({
    title,
    description,
    image,
    url,
    siteName
}) => {
    return <Head>
    
    <title>{`${title ? `${title} | ` : ''}The Alexia Fall Workshop | Newhouse School at Syracuse University`}</title>
    <meta property="og:title" content={`${title ? `${title} | ` : ''}The Alexia Fall Workshop | Newhouse School at Syracuse University`} key="title" />
    <meta name="twitter:title" content={`${title ? `${title} | ` : ''}The Alexia Fall Workshop | Newhouse School at Syracuse University`} />
     
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charSet="UTF-8" />
    <meta property="og:country_name" content="USA" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta name='og:locality' content='Syracuse' />
    <meta name='og:region' content='NY' />
    <meta name='og:postal-code' content='13244' />
    <meta name='og:country-name' content='USA' />
    <meta name='robots' content='index,follow' />
    <meta name="language" content="EN" />
    <meta name="subject" content="Photography Workshop" />
	<meta name="copyright" content="Newhouse School at Syracuse University" />
    {siteName && 
        <meta property="og:site_name" content={siteName} />
    }
    {description &&
        <Fragment>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
        </Fragment>
    }
    <meta name="keywords" content="photojournalism, photography, multimedia storytelling, multimedia, visual advocacy, storytelling" />
    {image &&
        <Fragment>
             <meta
                property="og:image"
                content={image.src}
            />
            <meta property="og:image:width" content={image.width} />
            <meta property="og:image:height" content={image.height} />
            <meta name="twitter:image:alt" content={image.alt} />
        </Fragment>
    }
    {url &&
        <Fragment>
            <meta name="url" content={url} />
            <meta name="og:url" content={url} />
            <meta name="twitter:url" content={url} />
        </Fragment>
    }
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@thefallworkshop" />	
</Head>
}
export default SEO; 