import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on(['pull_request.opened', 'pull_request.edited'], async (context) => {
    const { siteName } = await context.config('netlify-preview.yml');
    context.event
    const pr = await context.github.pullRequests.get(context.issue());
    const netlifyLink = `### [Preview on Netlify](https://${pr.data.base.ref}--${siteName}.netlify.com})`;
    
    if (!pr.data.body.includes(netlifyLink)) {
      context.github.pullRequests.update(context.issue({...pr,  body: pr.data.body + `

      ----
      ${netlifyLink}`}));
    }
  })
}
