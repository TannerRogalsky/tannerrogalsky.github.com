const regex = /(\d+)\-(\d+)\-(\d+)\-/;

const blogFileToRoute = function(blogFilename) {
  return `/blog/${blogFilename.replace(regex, '$1/$2/$3/')}/`;
}

export default blogFileToRoute;
