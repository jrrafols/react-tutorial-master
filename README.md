[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# React Tutorial

I am using this as a basis to get a feel for React and understand how I Might be able to incorporate into my work.

## Getting Started with the Tutorial

This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).

I began by downloading the react-tutorial-master zip file and extracted it into my GitHub directory.

Once extracted, the following commands were used to retrieve the packages and start the server:

```sh
npm install
node server.js
```

With the default settings this starts the server up at <http://localhost:3000/>.

The port can be changed on startup as follows:
```sh
PORT=3001 node server.js
```

## Sidetrack One - Node issues

I ran into some issues with node and it turned out that I had an old version installed on my computer.

As a result, I needed to visit <https://nodejs.org/en/> to upgrade node from v0.12.7 to v4.4.0. This was a simple download and install.

## Sidetrack Two - Working with GitHub

I was having some issues taking the extracted directory on my computer and pushing it to a remote repo on Github. 
I followed the instructions here: <https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/> to get the repo up to GitHub.

## Back to React

The tutorial is pretty straightforward to complete. From a conceptual standpoint, I found that the biggest thing to 
understand is how the `props` attributes work for passing data and funtion references between React components.

Once complete, I decided to enhance the demo app by adding a *Delete* functionality. Again, the only issue that
I ran into was understanding how the `props` attributes worked to pass the `id` of the deleted comment to 
subsequent handlers through different layers of components. While I did get to a functional solution by passing
the `id` from the `Comment` to `CommentList` to the top-level `CommentBox` object, I feel like there must be a better
approach to this.

Some changes were also required in `server.js` to accommodate the `DELETE` request generated from `CommentBox`.
This required a bit of minor investigation into Express.js which is used for the local server, notably on
how parameters are retrieved from the url, but this turned out to be pretty simple.