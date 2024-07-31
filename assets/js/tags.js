

function main() {
  {
    const root = document.querySelector(".tags-cloud");
    const cloud = new TagsCloud(root);
    cloud.start();
  }
}

main();
