# moneyandotherthings.com

A blog about money, and some other things.  Currently only live in a staging environment [here](https://next-blog-site-red.vercel.app/).  Feel free to check out [moneyandotherthings.com](https://www.moneyandotherthings.com) as well, however until we go live (by end of Jan. 2023), You will only see a simple landing page.

---

## Built With
##### Client
 - NextJS/React
 - Chakra UI


##### Server
 - Strapi Headless CMS
 - Postgres
 - CKEditor (for writing new blog posts)
 - Sendgrid (For creating and sending emails to subscribers)

 ---

### Todo before production
 - Improve styles of 404 page / configure 500 error page
 - Add tests for 'email on subscribe' functions
 - Confirm all unsubscribe functionality complies with the law
 - On Sendgrid, finish 'welcome' email template and configure 'send' function to use the template on subscribe events
 - split custom css for article/[slug] so it loads on page mount, rather than in _app component