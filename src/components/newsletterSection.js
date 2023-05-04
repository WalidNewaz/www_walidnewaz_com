import * as React from "react"

const NewsletterSection = () => {
    return (
        <section id="newsletter-subscribe">
            <div>
                <div>
                    <p>Never Miss a New Post.</p>
                </div>
                <div>
                    <iframe 
                        data-w-token="bfcc24aa21ef34249119" 
                        data-w-type="pop-in" 
                        frameBorder="0" 
                        scrolling="yes" 
                        marginHeight="0" 
                        marginWidth="0" 
                        src="https://07w6k.mjt.lu/wgt/07w6k/z9g/form?c=e9ed7cf1" 
                        width="100%" 
                        style={{ height: 0 }}></iframe>
                    <iframe 
                        data-w-token="bfcc24aa21ef34249119"
                        data-w-type="trigger"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://07w6k.mjt.lu/wgt/07w6k/z9g/trigger?c=590ebb63"
                        width="100%"
                        style={{ height: '55px' }}></iframe>
                </div>
            </div>
        </section>
    )
}

export default NewsletterSection